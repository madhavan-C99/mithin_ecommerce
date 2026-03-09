from django.apps import apps
from huey.contrib.djhuey import task,periodic_task
from huey import crontab
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.core.cache import cache
from django.conf import settings
from ..models import *
from ..services.collection_query_service import *
from datetime import datetime, timedelta

@task()
def trending_product():
    try:
        trend_product=exec_raw_sql('D_FETCH_ALL_TRENDING_PRODUCTS',{"status":True})
        product_data=[]
        for p in trend_product:
            # print(p["product_img"])
            product_data.append({
                "s_no":p["s_no"],
                "id":p["id"],
                "trending_id":p["trending_id"],
                "name":p["name"],
                "tamil_name":p["tamil_name"],
                # "product_image":p["product_image"],
                "product_img":(
                    f"{settings.SITE_URL}{settings.MEDIA_URL}{p['product_img']}" if p["product_img"] else None
                    ),
                "price":p["price"],
                "weight":p["weight"],
                "unit":p["unit"],
                "stock":p["stock"],
                "subcategory_name":p["subcategory_name"],
                "stock_status":p['stock_status']
                
                
            })
            
        
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "trending_product_group", 
            {
                "type": "send_trending_data", 
                "data": product_data
            }
        )
    except Exception as e:
        raise APIException(e)
    
    

    
@task()
def fetch_all_product_task():
    try:
        fetch_all_product=exec_raw_sql('D_FETCH_ALL_PRODUCTS',{})
        print(fetch_all_product)
        product_data=[]
        for p in fetch_all_product:
            # print(p["product_img"])
            product_data.append({
                "s_no":p["s_no"],
                "id":p["id"],
                "name":p["name"],
                "tamil_name":p["tamil_name"],
                "description":p["description"],
                # "product_image":p["product_image"],
                "product_img":(
                    f"{settings.SITE_URL}{settings.MEDIA_URL}{p['product_img']}" if p["product_img"] else None
                    ),
                "price":p["price"],
                "weight":p["weight"],
                "unit":p["unit"],
                "expiry_date":p["expiry_date"].isoformat(),
                "stock":p["stock"],
                "status":p["status"],
                "subcategory":p["subname"],
                "current_trending_status":p["current_trending_status"]
            
                
            })
            
    
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "fetch_all_product_group", 
            {
                "type": "send_all_product_data", 
                "data": product_data
            }
        )
        
    except Exception as e:
        raise APIException(e)

    
@task()
def new_order_assign_admin():
    try:

        new_order=exec_raw_sql('D_FETCH_NEW_ORDER_DATA',{})
        print(new_order)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "new_order_send_group", 
            {
                "type": "send_new_order_data", 
                "data": new_order
            }
        )
        
    except Exception as e:
        raise APIException(e)        
    
# @periodic_task(crontab(minute='*/60'))
@task()
def stock_alert_product():
    try:
        stock_product=exec_raw_sql('D_FETCH_STOCK_ALERT_PRODUCT',{})
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "stock_alter_product_group", 
            {
                "type": "send_stock_alert_data", 
                "data": stock_product
            }
        )
        
    except Exception as e:
        raise APIException(e)
    
    
@task()
def stock_category_piechart():
    try:
        category_chart=exec_raw_sql('D_FETCH_STOCK_CATEGORY_PIECHART',{})
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "stock_category_chart_group", 
            {
                "type": "send_stock_category_data", 
                "data": category_chart
            }
        )
    except Exception as e:
        raise APIException(e)
    
    
@task()
def fetch_order_top_tile_task():
    try:
        filter_type = "year"
        from_date = "2026-01-01" 
        to_date = datetime.now().date()
        
        
        params = {
            "from_date": str(from_date),
            "to_date": str(to_date),
            "filter_type": str(filter_type)
            }
        order_tile=exec_raw_sql('D_FETCH_ORDER_TOP_TILES',params)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "order_top_tile_group", 
            {
                "type": "send_order_tile_data", 
                "data": order_tile
            }
        )
    except Exception as e:
        raise APIException(e)
    
    
@task()
def fetch_all_order_data_task():
    try:
        order_data=exec_raw_sql('D_FETCH_ALL_ORDER_DATA',{})
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "fetch_all_order_group", 
            {
                "type": "send_all_order_data", 
                "data": order_data
            }
        )
    except Exception as e:
        raise APIException(e)