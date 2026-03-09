import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from adm.models.products import Product 
import logging
logger = logging.getLogger('django')

class ProductConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "stock_updates"
        
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        
        # 1. Home page load aagum podhu automatic-ah popular products anupuroam
        popular_products = await self.get_popular_products()
        await self.send(text_data=json.dumps({
            'type': 'popular_list',
            'products': popular_products
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # Frontend-la irundhu vara filter requests-ah handle panna
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)            
            cat_id = data.get('category_id')
            sub_cat_id = data.get('sub_category_id')

            if cat_id or sub_cat_id:    
                filtered_products = await self.get_filtered_products(cat_id, sub_cat_id)
                await self.send(text_data=json.dumps({
                    'type': 'filtered_products_list',
                    'products': filtered_products
                }))
        except Exception as e:
            logger.info(f"WebSocket Receive Error: {str(e)}")


    @sync_to_async
    def get_popular_products(self):
        queryset = Product.objects.filter(trend_status=True)
        return [self.serialize_product(p) for p in queryset]

    @sync_to_async
    def get_filtered_products(self, cat_id, sub_cat_id):
        queryset = Product.objects.all()
        
        if sub_cat_id:
            queryset = queryset.filter(sub_category_id=sub_cat_id)
        elif cat_id:
            queryset = queryset.filter(category_id=cat_id)
        
        return [self.serialize_product(p) for p in queryset]

    def serialize_product(self, p):
        """Product object-ah JSON format-ku maatha help pannum helper function"""
        return {
            "id": p.id,
            "name": p.name,
            "price": str(p.price),
            "stock": p.stock,
            "status": "Out of Stock" if p.stock <= 0 else "Available",
            "image": p.image.url if p.image else None 
        }


    async def send_stock_update(self, event):
        new_stock = event['new_stock']
        await self.send(text_data=json.dumps({
            'type': 'stock_update',
            'product_id': event['product_id'],
            'new_stock': new_stock,
            'status': "Out of Stock" if new_stock <= 0 else "Available"
        }))