from django.urls import re_path
from .import consumers

websocket_urlpatterns = [
    re_path(r'ws/users/$', consumers.DataConsumer.as_asgi()),
    re_path(r'ws/trending_products/$', consumers.TrendingProducts.as_asgi()),
    re_path(r'ws/fetch_all_product/$',consumers.FetchAllProducts.as_asgi()),
    re_path(r'ws/notification_data/$',consumers.NotificationData.as_asgi()),
    re_path(r'ws/stock_category_chart/$',consumers.StockCategoryChart.as_asgi()),
    re_path(r'ws/order_top_tile/$',consumers.OrderTopTiles.as_asgi()),
    re_path(r'ws/fetch_all_order/$',consumers.FetchAllOrderData.as_asgi())
]