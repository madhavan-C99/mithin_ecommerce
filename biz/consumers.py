
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .tasks.tasks import get_filtered_products_task,fetch_user_active_orders_task

logger = logging.getLogger('django')

class ProductConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "stock_updates"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)            
            cat_id = data.get('category_id')
            sub_cat_id = data.get('sub_category_id')

            if cat_id or sub_cat_id:    
                get_filtered_products_task(cat_id, sub_cat_id)
        except Exception as e:
            logger.error(f"WebSocket Receive Error: {str(e)}")

    async def broadcast_message(self, event):
        await self.send(text_data=json.dumps(event['message_data'], ensure_ascii=False))


class OrderTrackingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.group_name = f"order_user_{self.user_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        fetch_user_active_orders_task(self.user_id)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_status_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))