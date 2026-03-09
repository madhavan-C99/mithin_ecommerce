import os

# MUST be first
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "mithin_ecommerce_api.settings"
)

from django.core.asgi import get_asgi_application

# Initialize Django FIRST
django_asgi_app = get_asgi_application()

# ONLY AFTER Django is ready, import Channels stuff
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

import adm.routing
import biz.routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            adm.routing.websocket_urlpatterns +
            biz.routing.websocket_urlpatterns
        )
    ),
})
