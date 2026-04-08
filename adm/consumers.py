import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import * 
from .services.collection_query_service import *
from django.conf import settings
from datetime import datetime, timedelta


class DataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "user_updates_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_user_data(self, event):
        user_list = event['data']
        await self.send(text_data=json.dumps({
            'payload': user_list
        }))
        


class TrendingProducts(AsyncWebsocketConsumer):

    async def connect(self):
        self.group_name = "trending_product_group"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)


        if data.get("action") == "init_trend":
            trending_products = await self.get_trending_products()

            await self.send(text_data=json.dumps({
                "payload": trending_products
            }))


    async def send_trending_data(self, event):
        trend_product = event["data"]

        await self.send(text_data=json.dumps({
            "payload": trend_product
        }))

    async def send_all_product_data(self, event):
        fetch_all_product = event["data"]

        await self.send(text_data=json.dumps({
            "payload": fetch_all_product
        }))

    @sync_to_async
    def get_trending_products(self):
        product_list=exec_raw_sql('D_FETCH_ALL_TRENDING_PRODUCTS', {"status": True})
        product_data=[]
        for p in product_list:
            product_data.append({
                "product_id":p["id"],
                "trending_id":p["trending_id"],
                "name":p["name"],
                "tamil_name":p["tamil_name"],
                "product_img":(
                    (f"{settings.CLOUD_FRONT_URL}{p['product_img'][6:]}" if p["product_img"] else None)
                    ),
                "price":p["price"],
                "weight":p["weight"],
                "unit":p["unit"],
                "stock":p["stock"],
                "subcategory_name":p["subcategory_name"],
		"category_name":p["category_name"],
                "stock_status":p['stock_status']
                
                
            })
            
        return product_data




    
class FetchAllProducts(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "fetch_all_product_group"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get("action") == "init_all":
            fetch_all_product = await self.get_fetch_all_products()

            await self.send(text_data=json.dumps({
                "payload": fetch_all_product
            }))

    async def send_all_product_data(self, event):
        fetch_all_product = event["data"]

        await self.send(text_data=json.dumps({
            "payload": fetch_all_product
        }))

    @sync_to_async
    def get_fetch_all_products(self):
        product_list=exec_raw_sql('D_FETCH_ALL_PRODUCTS',{})
        product_data=[]
        for p in product_list:
            # print(p["product_img"])
            product_data.append({
                "s_no":p["s_no"],
                "id":p["id"],
                "name":p["name"],
                "tamil_name":p["tamil_name"],
                "description":p["description"],
                "product_img":(
                    (f"{settings.CLOUD_FRONT_URL}{p['product_img'][6:]}" if p["product_img"] else None)
                    ),
                "price":p["price"],
                "expiry_date":p["expiry_date"].isoformat(),
                "weight":p["weight"],
                "unit":p["unit"],
                "stock":p["stock"],
                "status":p["status"],
                "subcategory":p["subname"],
		"category_name":p["category_name"],
                "current_trending_status":p["current_trending_status"]
                
                
            })
        return product_data
    

    
    
class NotificationData(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "notification_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
    
    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get("action") == "notification_all":
            fetch_stock = await self.stock_data()

            await self.send(text_data=json.dumps({
                "payload": fetch_stock
            }))
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def notification_send_data(self, event):
        notification_data = event['data']
        await self.send(text_data=json.dumps({
            'payload': notification_data
        })) 

    @sync_to_async
    def stock_data(self):
        order_data=exec_raw_sql('D_FETCH_ALL_NOTIFICATION',{})
        return order_data   
        
class StockCategoryChart(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "stock_category_chart_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get("action") == "stock_category_chart":
            fetch_stock_category = await self.get_stock_category_data()

            await self.send(text_data=json.dumps({
                "payload": fetch_stock_category 
            }))
    async def send_stock_category_data(self, event):
        stock_data = event['data']
        await self.send(text_data=json.dumps({
            'payload': stock_data
        }))  
        
        
    @sync_to_async
    def get_stock_category_data(self):
        category_chart=exec_raw_sql('D_FETCH_STOCK_CATEGORY_PIECHART',{})
        # print(category_chart)
        return category_chart
    
    
    

    
        
        
class OrderTopTiles(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "order_top_tile_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get("action") == "order_tile":
            fetch_order_tile = await self.get_order_tile_data()

            await self.send(text_data=json.dumps({
                "payload": fetch_order_tile 
            }))
    async def send_order_tile_data(self, event):
        order_tile_data = event['data']
        await self.send(text_data=json.dumps({
            'payload': order_tile_data
        }))  
        
        
    @sync_to_async
    def get_order_tile_data(self):
        filter_type = "year"
        from_date = "2026-01-01" 
        to_date = datetime.now().date()
        
        
        params = {
            "from_date": str(from_date),
            "to_date": str(to_date),
            "filter_type": str(filter_type)
            }
        order_tile=exec_raw_sql('D_FETCH_ORDER_TOP_TILES',params)
        # print(category_chart)
        return order_tile
    
    
    

class FetchAllOrderData(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "fetch_all_order_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data.get("action") == "fetch_all_order":
            fetch_order_data = await self.get_all_order_data()

            await self.send(text_data=json.dumps({
                "payload": fetch_order_data 
            }))
    async def send_all_order_data(self, event):
        all_order_data = event['data']
        await self.send(text_data=json.dumps({
            'payload': all_order_data
        }))  
        
    @sync_to_async
    def get_all_order_data(self):
        order_data=exec_raw_sql('D_FETCH_ALL_ORDER_DATA',{})
        return order_data