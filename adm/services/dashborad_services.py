from ..models import *
from rest_framework.exceptions import APIException
from ..services.collection_query_service import *
from ..tasks.trendtask import *
from datetime import datetime, timedelta

def top_cards_report(**data):
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
        
        
        data=exec_raw_sql("D_FETCH_TOP_REVENUE_REPORT",params)
       
        return data
    except Exception as e:
        raise APIException(e)



def top_sales_product():
    try:
        top_sales=exec_raw_sql("D_FETCH_TOP_SALES_PRODUCT",{})
        print(top_sales)
        return top_sales
    except Exception as e:
        raise APIException(e)
    
    

def piechart_subcategory(**data):
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
        
        piechart=exec_raw_sql("D_FETCH_PIECHART_SUBCATEGORY",params)
        print(piechart)
        return piechart
    except Exception as e:
        raise APIException(e)
    
def category_revenue_chart(**data):
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
        
        
        data=exec_raw_sql("D_FETCH_CATEGORY_REVENUE_CHART",params)
       
        return data
    except Exception as e:
        raise APIException(e)
    
    
def sales_graph_filter(**data):
    try:
        filter_type = data.get("filter_type")

        if filter_type == "daily":   
            format = 'YYYY-MM-DD '
        elif filter_type == "monthly":
            format = 'YYYY-MM'
        elif filter_type == "year":
            format = 'YYYY'
        else:
            format = 'YYYY-MM'
        # print(1)  
        # print(format)
        sales_graph=exec_raw_sql("D_FETCH_SALES_GRAPH",{"format":format})
        print(sales_graph)
        
        return sales_graph
    except Exception as e:
        raise APIException(e)