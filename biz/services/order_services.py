from rest_framework.exceptions import APIException
from ..models.order import Order
from django.db import transaction
from ..models import Cart, CartItems, Order, OrderItems
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from adm.tasks.trendtask import *



def fetch_purchase_history(data):
    try:
        orders = Order.objects.filter(user_id=data.get('user_id')).order_by('-created_at')

        if not orders.exists():
            return {"message": "No purchase history found"}

        order_history = []

        for order in orders:
            items = order.items.all()
            item_list = []

            for item in items:
                item_list.append({
                    "product_name": item.product.name,
                    "image": item.product.image.url if item.product.image else None,
                    "quantity": item.quantity,
                    "weight": item.weight,
                    "unit_price": item.unit_price,
                    "total_price": item.total_price
                })

            order_history.append({
                "order_id": order.id,
                "grand_total": order.total_price,
                "status": order.status,
                "order_date": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "items": item_list
            })

        return {"orders": order_history}

    except Exception as e:
        raise APIException(str(e))
    


def create_order(**data):
    try:
        print(4)
        with transaction.atomic():
            # 1. User-oda Cart-ah fetch pandrom
            cart = Cart.objects.get(user=data.get('user_id'))
            cart_items = CartItems.objects.filter(cart=cart)
            print(5)
            # 2. Order Table-la record create pandrom
            order = Order.objects.create(
                user_id=data.get('user_id'),
                address_id=data.get('address_id'),
                total_amount=data.get('total_amount'),
                status="Waiting"
            )

            channel_layer = get_channel_layer()
            print(6)
            # 3. Cart Items-ah Order Items-ku move pandrom & Stock update pandrom
            for item in cart_items:
                print('item',item)
                OrderItems.objects.create(
                    order=order,
                    product=item.product,
                    weight=item.weight,
                    unit_price=item.unit_price,
                    quantity=item.quantity,
                    total_price=item.total_price
                )

                # Stock minus pandrom
               
                product = item.product
                product.stock -= item.quantity
            
                product.save()

                # WebSocket Broadcast (Ovvoru item-kum stock update anuprom)
                async_to_sync(channel_layer.group_send)(
                    "stock_updates",
                    {
                        "type": "send_stock_update",
                        "product_id": product.id,
                        "new_stock": product.stock,
                    }
                )
                
            new_order_assign_admin()       
            print(7)
            # 4. Cart-ah empty pandrom
            cart_items.delete()
            
            return {"order_id": order.id}

    except Exception as e:
        raise APIException(e)
    

def cancel_order(data):
    try:
        order_rec=Order.objects.filter(id=data.get('order_id')).first()
        order_rec.status="Cancelled"
        order_rec.save()
        return f"Your order {order_rec} item is Cancelled."
    except Exception as e:
        raise APIException(e)
    
def fetch_order_details(data):
    try:
        order_items=OrderItems.objects.filter(order_id=data.get('order_id'))

        if not order_items:
            return "No Products found"

        final_data=[]
        for item in order_items:
            final_data.append({
                "id":item.id,
                "product":item.product.product_name,
                "weight":item.weight,
                "quantity":item.quantity,
                "unit_price":item.unit_price,
                "total_price":item.total_price
            })
        return final_data
    except Exception as e:
        raise APIException(e)

