from django.urls import path
from biz.consumers import ProductConsumer


websocket_urlpatterns = [
    path('ws/products/', ProductConsumer.as_asgi()),
    path('ws/products/<int:id>/', ProductConsumer.as_asgi())
]