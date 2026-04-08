from rest_framework.exceptions import APIException
# from ..models.payments import *
from ..models.payment_transaction import *
from ..services.razorpay_services import RazorpayClient

from django.utils import timezone

rz_client=RazorpayClient()


    
from rest_framework.exceptions import APIException
from django.utils import timezone

from rest_framework.exceptions import APIException
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

def create_gateway_order(user, **data):
    try:
        # 🔐 Validate amount
        amount = int(data.get('amount', 0))
        if amount <= 0:
            raise APIException("Invalid amount")

        amount_in_paisa = amount * 100

        # 💱 Currency
        currency = data.get("currency", "INR")

        # 🧾 Receipt (unique reference)
        receipt = f"order_{user}_{int(timezone.now().timestamp())}"

        # 🚀 Create Razorpay Order
        order_response = rz_client.create_order(
            amount=amount_in_paisa,
            currency=currency,
            receipt=receipt
        )

        # 💾 Save in DB
        RazorpayOrder.objects.create(
            user_id=user,
            gateway_order_id=order_response['id'],
            amount=amount,
            status='Pending',
            order_id = data.get("order_id"),
            receipt=receipt,
            created_by='Razorpay',
            created_at=timezone.now()
        )

        return order_response

    except Exception as e:
        logger.error(f"Create Order Error: {str(e)}")
        raise APIException(str(e))
    


def order_payment_verify(**data):
    try:
        # 🔐 Signature verify
        rz_client.verify_payment(
            razorpay_order_id=data.get('razorpay_order_id'),
            razorpay_payment_id=data.get('payment_id'),
            razorpay_signature=data.get('signature'),
        )

        # 🔍 Get order
        order = RazorpayOrder.objects.filter(
            gateway_order_id=data.get('razorpay_order_id')
        ).first()

        if not order:
            raise APIException("RazorpayOrder not found")

        # 🟡 Minimal update only
        if order.status == "Pending":
            order.updated_by = "verify_api"
            order.updated_at = timezone.now()
            order.save()

        return {
            "message": "Payment verification successful",
            "payment_id": data.get('payment_id')
        }

    except Exception as e:
        logger.error(f"Verify API Error: {str(e)}")
        raise APIException(str(e))