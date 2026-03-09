from rest_framework.exceptions import APIException
from ..models.order import Order
from ..models.address import Address
from django.db import transaction
from ..models import Cart, CartItems, Order, OrderItems
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from decimal import Decimal
from ..tasks.tasks import order_update_task,send_stock_update_task
from django.conf import settings


def fetch_purchase_history(data):
    try:
        orders = Order.objects.filter(user_id=data.get('user_id')).order_by('-created_at')

        if not orders.exists():
            return {"message": "No purchase history found"}

        order_history = []

        for order in orders:
            items = OrderItems.objects.filter(order=order)
            item_list = []

            for item in items:
                item_list.append({
                    "product_name": item.product.name,
                    "image":  (f'{settings.SITE_URL}{settings.MEDIA_URL}{item.product.product_img}') if item.product.product_img else None,
                    "quantity": item.quantity,
                    "weight": item.weight,
                    "unit_price": item.unit_price,
                    "total_price": item.total_price
                })

            order_history.append({
                "order_id": order.id,
                "grand_total": order.total_amount,
                "status": order.status,
                "order_date": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "items": item_list
            })

        return {"orders": order_history}

    except Exception as e:
        raise APIException(str(e))
    


def create_order(**data):
    try:
        with transaction.atomic():
            #  User-oda Cart-ah fetch pandrom
            cart = Cart.objects.filter(user=data.get('user_id')).first()

            if not cart:
                return "Your Cart is Empty."

            cart_items = CartItems.objects.filter(cart=cart).select_related('product')

            #product stock check
            for item in cart_items:
                if item.product.stock < item.quantity:
                    return f"{item.product.name} is out of stock."

            #  Address check
            check_address=Address.objects.filter(id=data.get('address_id'),user=data.get('user_id')).exists()

            if not check_address:
                return "No Address Found. Please select a Valid Address"

            #  Order Table-la record create pandrom
            last_order=Order.objects.select_for_update().order_by('id').last()

            if last_order:
                order_num=last_order.order_number.replace("sm","")
                new_num=int(order_num)+1
            else:
                new_num=10000001

            order = Order.objects.create(
                user_id=data.get('user_id'),
                address_id=data.get('address_id'),
                total_amount=data.get('total_amount'),
                order_number=f"sm{new_num}",
                status="Pending"
            )

            #  Cart Items-ah Order Items-ku move pandrom & Stock update pandrom
            for item in cart_items:
                OrderItems.objects.create(
                    order_id=order.id,
                    product_id=item.product.id,
                    quantity=item.quantity,
                    weight=item.weight,
                    unit_price=item.unit_price,
                    total_price=item.total_price
                )

                # Stock minus pandrom
                product = item.product
                product.stock -= item.quantity
                product.save()

                # Product stock updation task
                transaction.on_commit(lambda p_id=product.id, p_stock=product.stock:send_stock_update_task(p_id, p_stock))

            #  Cart-ah empty pandrom
            cart.delete()
            final_order_id=order.id

        if final_order_id:
            #product status tracking task
            order_update_task(final_order_id) 
            return {"order_id": order.id}

    except Exception as e:
        raise APIException(e)
    

def cancel_order(data):
    try:
        with transaction.atomic():
            order_rec=Order.objects.filter(id=data.get('order_id')).first()
            items = OrderItems.objects.filter(order=order_rec)
            for item in items:
                product = item.product
                # product.weight =Decimal(str(product.weight))+Decimal(item.weight)
                product.stock += int(item.quantity) 
                product.save()

                # Product stock updation task
                transaction.on_commit(lambda p_id=product.id, p_stock=product.stock:send_stock_update_task(p_id, p_stock))
            order_rec.status="Cancelled"
            order_rec.save()
            #product status tracking task
            transaction.on_commit(lambda order_rec_id=order_rec.id :order_update_task(order_rec_id))
        return {"order_id":order_rec.id,
                "result":"Your Order is Cancelled."}
    except Exception as e:
        raise APIException(e) 
    

def change_status(**data):
    try:
        order=Order.objects.filter(id=data.get('order_id')).first()
        order.status=data.get('status')
        order.save()
        order_update_task(order.id)
        return f"Your order status Changed for {data.get('status')} state."
    except Exception as e:
        raise APIException(e)

    
