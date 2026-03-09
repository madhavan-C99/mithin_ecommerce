from django.urls import path,re_path
from biz.consumers import ProductConsumer,OrderTrackingConsumer


websocket_urlpatterns = [
    path('ws/products/', ProductConsumer.as_asgi()),
    path('ws/products/<int:id>/', ProductConsumer.as_asgi()),
    re_path(r'ws/order_tracking/(?P<user_id>\d+)/$',OrderTrackingConsumer.as_asgi())
]