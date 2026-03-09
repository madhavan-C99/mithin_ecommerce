# from django.utils.deprecation import MiddlewareMixin

# class DisableCSRFMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if request.path.startswith("/adm/"):
#             setattr(request, "_dont_enforce_csrf_checks", True)


from django.utils.deprecation import MiddlewareMixin
from django.views.decorators.csrf import csrf_exempt

class DisableCSRFMiddleware(MiddlewareMixin):
    API_PREFIXES = ("/adm/", "/biz/")

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.path.startswith(self.API_PREFIXES):
            return csrf_exempt(view_func)(request, *view_args, **view_kwargs)
        return None
