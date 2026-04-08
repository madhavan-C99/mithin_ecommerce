import json
import hmac
import hashlib
import datetime
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db import transaction
from django.conf import settings
from ..services.transaction_service import *
from ..tasks.api_log_task import api_history_log
from ..services.user_service import *
from rest_framework.decorators import authentication_classes, permission_classes
from django.db import transaction as db_transaction
from ..models.payment_transaction import RazorpayOrder, Transaction
from biz.tasks.tasks import send_stock_update_task,order_update_task
from ..tasks.trendtask import notification_task
from biz.models.order_items import OrderItems
from decimal import Decimal
from biz.models import Cart




class CreateOrderPayment(APIView):
    class InputSerializers(serializers.Serializer):
        amount=serializers.FloatField()
        currency=serializers.CharField()
        order_id = serializers.IntegerField()
        
    def post(self,request):
        authorize_request('api_perm_create_order_payment', request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        print('view1')
        order=create_gateway_order(request.user.id,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        print('view2',order)
        return Response({
            "order_id": order["id"],
            "amount": order['amount'],
            "key": settings.RAZORPAY_KEY_ID            
        },status=status.HTTP_201_CREATED)
        
     
        

class OrderPaymentVerify(APIView):
    class InputSerializers(serializers.Serializer):
        payment_id=serializers.CharField()
        razorpay_order_id=serializers.CharField()
        order_id=serializers.IntegerField()
        signature=serializers.CharField()
        amount=serializers.FloatField()
        
    def post(self,request):
        authorize_request('api_perm_order_payment_verify', request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        pay_verify=order_payment_verify(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        
        return Response({"data":pay_verify},status=status.HTTP_202_ACCEPTED)


# new updated code 
class RazorpayWebhookAPI(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            payload = request.body
            received_signature = request.headers.get('X-Razorpay-Signature')

            webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET

            # 🔒 Signature verify
            expected_signature = hmac.new(
                key=webhook_secret.encode(),
                msg=payload,
                digestmod=hashlib.sha256
            ).hexdigest()

            if not hmac.compare_digest(received_signature, expected_signature):
                return Response(
                    {"error": "Invalid signature"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            data = json.loads(payload)
            event = data.get('event')

            logger.info(f"Webhook event: {event}")

            # ✅ SAFE PARSING (FIX)
            payload_data = data.get('payload', {})
            payment_data = payload_data.get('payment', {}).get('entity', {})
            order_data = payload_data.get('order', {}).get('entity', {})

            payment_id = payment_data.get('id')
            gateway_order_id = payment_data.get('order_id') or order_data.get('id')
            amount = (payment_data.get('amount') or order_data.get('amount') or 0) / 100

            # =========================
            # 💳 SUCCESS FLOW
            # =========================
            if event in ["payment.captured", "order.paid"]:

                # 🔁 Duplicate protection
                if Transaction.objects.filter(payment_id=payment_id).exists():
                    return Response({"status": "duplicate"}, status=200)

                with db_transaction.atomic():

                    razor_order = RazorpayOrder.objects.filter(
                        gateway_order_id=gateway_order_id
                    ).first()

                    if not razor_order:
                        return Response({"error": "Order not found"}, status=404)

                    # 🟢 Update RazorpayOrder
                    if razor_order.status != "Success":
                        razor_order.status = "Success"
                        razor_order.updated_by = "WebHook"
                        razor_order.updated_at = timezone.now()
                        razor_order.save()

                    # 🧾 Update business order
                    biz_order = Order.objects.filter(id=razor_order.order_id).first()

                    if biz_order and biz_order.payment_status != True:   # ✅ FIX
                        biz_order.payment_status = True   # ✅ FIX
                        biz_order.status = "Pending"
                        biz_order.save()

                        biz_order_items=OrderItems.objects.filter(order_id=biz_order.id).all()

                        for item in biz_order_items:
                            # Stock minus pandrom
                            product = item.product
                            reduce_weight=Decimal(str(item.weight)) * Decimal(str(item.quantity))
                            product.stock -= reduce_weight
                            product.save()

                            if product.stock < 10:
                                notificate=Notification.objects.create(
                                        title="Low Stock",
                                        message=f"{product.name} is low stock ",
                                        product=product,
                                        created_by="system"
                                        
                                    )

                            # Product stock updation task
                            transaction.on_commit(lambda p_id=product.id, p_stock=product.stock:send_stock_update_task(p_id, p_stock))
                        
                        final_order_id=razor_order.order_id
                        if final_order_id:
                            #product status tracking task
                            order_update_task(final_order_id) 
                            notificate=Notification.objects.create(
                                            title="New Order",
                                            message=f"Order # {biz_order.order_number} placed by {biz_order.user.name}",
                                            order_id=biz_order.id,
                                            created_by="system",
                                        )
                            notification_task()
                        cart = Cart.objects.filter(user_id=biz_order.user_id).first()
                        cart.save_delete(user_id=biz_order.user_id)

                    # 💾 Save transaction
                    Transaction.objects.create(
                        payment_id=payment_id,
                        razorpay_order=razor_order,
                        order=biz_order,
                        signature=received_signature,
                        amount=amount,
                        payment_status="Success",
                        updated_at=timezone.now()
                    )

            # =========================
            # ❌ FAILURE FLOW
            # =========================
            elif event == "payment.failed":
                # 🔁 Duplicate protection
                if Transaction.objects.filter(payment_id=payment_id).exists():
                    return Response({"status": "duplicate"}, status=200)

                with db_transaction.atomic():

                    razor_order = RazorpayOrder.objects.filter(
                        gateway_order_id=gateway_order_id
                    ).first()

                    if not razor_order:
                        return Response({"error": "Order not found"}, status=404)

                    razor_order.status = "Failed"
                    razor_order.updated_by = "webhook"
                    razor_order.updated_at = timezone.now()
                    razor_order.save()

                    biz_order = Order.objects.filter(id=razor_order.order_id).first()

                    if biz_order:
                        biz_order.payment_status = False   # ✅ FIX
                        biz_order.save()

                    Transaction.objects.create(
                        payment_id=payment_id,
                        razorpay_order=razor_order,
                        order=biz_order,
                        amount=amount,
                        payment_status="Failed",
                        failure_reason=payment_data.get('error_description'),
                        updated_at=timezone.now()
                    )

            else:
                logger.warning(f"Unhandled webhook event: {event}")

            return Response({"status": "received"}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Webhook Error: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# class RazorpayWebhookAPI(APIView):

#     def post(self, request):
#         payload = request.body
#         received_signature = request.headers.get('X-Razorpay-Signature')
        
#         # .env-la irundhu webhook secret-ah edukkalaam
#         webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET 

#         # 1. Signature Verification (Security Check)
#         expected_signature = hmac.new(
#             key=webhook_secret.encode(),
#             msg=payload,
#             digestmod=hashlib.sha256
#         ).hexdigest()

#         if not hmac.compare_digest(received_signature, expected_signature):
#             return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)

#         # 2. Data Parsing
#         data = json.loads(payload)
#         event = data.get('event')

#         # 3. Handle Events
#         if event in ["payment.captured", "order.paid"]:
#             order_details = data['payload']['order']['entity']
#             gateway_order_id = order_details['id']

#             # RazorpayOrder fetch
#             razor_order = RazorpayOrder.objects.filter(
#                 gateway_order_id=gateway_order_id
#             ).first()

#             if not razor_order:
#                 return Response({"error": "RazorpayOrder not found"}, status=404)

#             # RazorpayOrder status update
#             if razor_order.status != "success":
#                 razor_order.status = "success"
#                 razor_order.save()

#             transaction = Transaction.objects.filter(
#                 razorpay_order=razor_order
#             ).first()

#             if transaction:
#                 biz_order = transaction.order
#                 if not biz_order.payment_status:
#                     biz_order.payment_status = "Paid"
#                     biz_order.save()
#             if not Transaction.objects.filter(razorpay_order=razor_order).exists():
#                 Transaction.objects.create(
#                     payment_id=data['payload']['payment']['entity']['id'],
#                     razorpay_order=razor_order,
#                     signature=received_signature, 
#                     amount=order_details['amount'], 
#                     payment_status="success",
#                     updated_at=datetime.now())
#         elif event == "payment.failed":
#             payment_details = data['payload']['payment']['entity']
#             gateway_order_id = payment_details.get('order_id')

#             razor_order = RazorpayOrder.objects.filter(
#                 gateway_order_id=gateway_order_id
#             ).first()

#             if not razor_order:
#                 return Response({"error": "RazorpayOrder not found"}, status=404)

#             # RazorpayOrder → Failed update
#             razor_order.status = "Failed"
#             razor_order.save()

#             # Biz Order → Failed update
#             transaction = Transaction.objects.filter(
#                 razorpay_order=razor_order
#             ).first()

#             if transaction:
#                 biz_order = transaction.order
#                 biz_order.payment_status = "Failed"
#                 biz_order.save()

#             # Transaction create
#             if not Transaction.objects.filter(razorpay_order=razor_order, payment_status="Failed").exists():
#                 Transaction.objects.create(
#                     payment_id=payment_details.get('id'),
#                     razorpay_order=razor_order,
#                     order=razor_order.order,          
#                     amount=payment_details.get('amount'),
#                     payment_status="Failed",
#                     failure_reason=payment_details.get('error_description'),  
#                     updated_at=datetime.now()
#                 )

#         return Response({"status": "received"}, status=status.HTTP_200_OK)
        
# @authentication_classes([])
# @permission_classes([]) 
# class RazorpayWebhookAPI(APIView):

#     def post(self, request):
#         payload = request.body
#         received_signature = request.headers.get('X-Razorpay-Signature')
        
#         # .env-la irundhu webhook secret-ah edukkalaam
#         webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET 

#         # 1. Signature Verification (Security Check)
#         expected_signature = hmac.new(
#             key=webhook_secret.encode(),
#             msg=payload,
#             digestmod=hashlib.sha256
#         ).hexdigest()

#         if not hmac.compare_digest(received_signature, expected_signature):
#             return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)

#         # 2. Data Parsing
#         data = json.loads(payload)
#         event = data.get('event')

#         # 3. Handle Events
#         if event == "payment.captured" or event == "order.paid":
#             order_details = data['payload']['order']['entity']
#             gateway_order_id = order_details['id']
            
#             # DB-la order status 'Pending'-ah irundha 'success'-nu mathuvom
#             order = RazorpayOrder.objects.filter(gateway_order_id=gateway_order_id).first()
            
#             if order and order.status != "success":
#                 order.status = "success"
#                 order.save()
#             if not Transaction.objects.filter(order=order).exists():
#                 Transaction.objects.create(
#                     payment_id=data['payload']['payment']['entity']['id'],
#                     order=order,
#                     signature=received_signature, # Webhook signature
#                     amount=order_details['amount'], # Paisa to Rupee
#                     payment_status="success",
#                     updated_at=datetime.now())

#         return Response({"status": "received"}, status=status.HTTP_200_OK)