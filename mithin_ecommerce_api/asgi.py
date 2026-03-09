import os


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mithin_ecommerce_api.settings')

from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import adm.routing 



application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            adm.routing.websocket_urlpatterns
        )
    ),
})


# new 
# import os

# os.environ.setdefault(
#     'DJANGO_SETTINGS_MODULE',
#     'mithin_ecommerce_api.settings'
# )

# from django.core.asgi import get_asgi_application

# # 🔥 This initializes Django apps properly
# django_asgi_app = get_asgi_application()

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# import adm.routing

# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             adm.routing.websocket_urlpatterns
#         )
#     ),
# })
