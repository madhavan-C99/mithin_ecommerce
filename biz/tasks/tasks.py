import json
from asgiref.sync import sync_to_async
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from adm.models.products import Product 
from ..models.order import Order
from ..models.order_items import OrderItems
from huey.contrib.djhuey import task,db_task
import logging 
import time
from django.db import close_old_connections
from django.conf import settings


logger=logging.getLogger("task")

@task()
def get_filtered_products_task(cat_id, sub_cat_id):
    close_old_connections()
    queryset = Product.objects.filter(product_img__isnull=False).exclude(product_img='')
    
    if sub_cat_id:
        queryset = queryset.filter(subcategory_id=sub_cat_id)
    elif cat_id:
        queryset = queryset.filter(subcategory__category_id=cat_id)

    products= [serialize_product_helper(p) for p in queryset]

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "stock_updates", 
        {
            "type": "broadcast_message",
            "message_data": {
                "type": "filtered_products_list",
                "products": products}
        }
    )

def serialize_product_helper(p):
    """Helper function to convert model object to dictionary"""
    return {
        "id": p.id,
        "name": p.name,
        "tamil_name":p.tamil_name,
        "price": str(p.price),
        "stock": p.stock,
        "unit":p.unit,
        "status": "Out of Stock" if p.stock <= 0 else "Available",
        "subcategory_id":p.subcategory_id,
        "image": f"{settings.SITE_URL}{settings.MEDIA_URL}{p.product_img}" if p.product_img else None
    }

@task()
def send_stock_update_task(product_id, new_stock):
    channel_layer = get_channel_layer()
    
    status = "Out of Stock" if new_stock <= 0 else "Available"
    
    message_data = {
        'type': 'stock_update',
        'product_id': product_id,
        'new_stock': new_stock,
        'status': status
    }

    async_to_sync(channel_layer.group_send)(
        "stock_updates",
        {
            "type": "broadcast_message",
            "message_data": message_data
        }
    )

@task()
def fetch_user_active_orders_task(user_id):
    time.sleep(1)
    channel_layer = get_channel_layer()
    
    active_statuses = ['Pending','Confirmed','Packed','Shipped']
    orders = Order.objects.filter(user_id=user_id, status__in=active_statuses).order_by('id')
    all_orders=[]
    for order in orders:
        order_items=OrderItems.objects.filter(order=order)
        item_list = []
        for item in order_items:
            item_list.append({
                "name": item.product.name,
                "image":f"{settings.SITE_URL}{settings.MEDIA_URL}{item.product.product_img}" if item.product.product_img else None,
                "weight":item.weight,
                "qty": int(item.quantity),
                "price": str(item.unit_price)
            })

        all_orders.append({
            "order_id": order.id,
            "status": order.status,
            "grand_total": str(order.total_amount),
            "items": item_list
        })

    data={"orders":all_orders}
    async_to_sync(channel_layer.group_send)(
        f"order_user_{user_id}",
        {
            "type": "send_status_update",
            "data": data
        }
    )



@task()
def order_update_task(order_id):  
    try:  
        order = Order.objects.get(id=order_id)
        user_id = order.user_id

        fetch_user_active_orders_task(user_id)
    except Order.DoesNotExist:
        logger.error("order doesn't found")
    except Exception as e:
        logger.exception(e)


