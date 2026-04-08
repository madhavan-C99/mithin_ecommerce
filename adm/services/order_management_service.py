from ..models import *
from biz.models import *
from rest_framework.exceptions import APIException
from ..services.collection_query_service import *
from ..tasks.trendtask import *
from datetime import datetime, timedelta
from biz.tasks.tasks import order_update_task





def order_top_tile(**data):
    try:
        filter_type = data.get("filter_type", "year")
        from_date = data.get("from_date")
        to_date = data.get("to_date")
        
        today = datetime.now().date()

        # Logic for Daily, Weekly, Monthly, Yesterday
        if filter_type == "today":
            from_date = today
            to_date = today
        elif filter_type == "yesterday":
            from_date = today - timedelta(days=1)
            to_date = from_date
        elif filter_type == "weekly":
            from_date = today - timedelta(days=7)
            to_date = today
        elif filter_type == "monthly":
            from_date = today.replace(day=1)
            to_date = today
        elif filter_type == "year":
            from_date = "2026-01-01" 
            to_date = today

   
        params = {
            "from_date": str(from_date),
            "to_date": str(to_date),
            "filter_type": str(filter_type)
        }
        

        data=exec_raw_sql("D_FETCH_ORDER_TOP_TILES",params)
       
      
        return data
    except Exception as e:
        raise APIException(e)
    
    
    
def fetch_one_order(**data):
    try:
        cus=exec_raw_sql('D_FETCH_ORDER_CUSTOMER_DETAILS',{"order_no":data.get('order_number'),"id":data.get('id')})
        if not cus:
            raise APIException("Order not found")
        cus_detail=cus[0] if cus else None
        product=exec_raw_sql('D_FETCH_ORDER_PRODUCT_DETAILS',{"order_no":data.get('order_number'),"id":data.get('id')})
    
        
        
        data={
            "order_info":{
                "order_id":cus_detail['order_id'],
                "order_number":cus_detail['order_number'],
                "status":cus_detail['status'],
                "payment_status":cus_detail['payment_status'],
                "order_date_time":cus_detail['created_at'],
                "update_date_time":cus_detail['updated_at']
                },
            "customer_details":{
                "customer_name":cus_detail['customer_name'],
                "mobile":cus_detail['mobile'],
                "email":cus_detail['email']
            },
            "shipping_address":{
                "customer_name":cus_detail['customer_name'],
                "mobile":cus_detail['mobile'],
                'address_type':cus_detail['address_name'],
                "address_line1":cus_detail['address_line1'],
                "address_line2":cus_detail['address_line2'],
                "city":cus_detail['city']
            },
            "product":product
        }
        
        return data
    except Exception as e:
        raise APIException(e)
    
 
    
def order_status_update(**data):
    try:
        order=Order.objects.filter(id=data.get('id')).first()        
        order.status=data.get('order_status')
        order.updated_at=datetime.now()
        order.save()
        fetch_all_order_data_task()
        fetch_order_top_tile_task()
        order_update_task(order.id)
        return (f"order {order.id} by status is updated")
    except Exception as e:
        raise APIException(e)


def read_notification(user,**data):
    try:
        notify=Notification.objects.filter(id=data.get('id')).first()
        notify.is_read=True
        notify.updated_at=datetime.now()
        notify.updated_by=user
        notify.save()
        
        return(f"{notify.message} read by admin")
    except Exception as e:
        raise APIException(e)