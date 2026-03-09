import datetime
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
#from rest_framework_simplejwt.authentication import JWTAuthenticationMiddleware
from django.contrib.auth import authenticate
from django.conf import settings
from ..models import User
from ..services.collection_query_service import exec_raw_sql


# main function 
def create_token(**data):
    username = data.get('username').lower()
    expired = User.objects.filter(username = username,is_active = False)
    if expired:
        raise AuthenticationFailed(detail = 'Your plan has expired. Please renew your plan.')

    user = authenticate(username=username, password=data.get('password'))
    if not user:
        raise AuthenticationFailed(detail='Invalid Username or Password')
    elif user:
        if user.ending_date is None:
            user.last_login = datetime.datetime.now()
            user.save()
            refresh_tkn = RefreshToken.for_user(user)
            access_tkn = refresh_tkn.access_token
        elif user.ending_date >= datetime.datetime.now().date():
            user.last_login = datetime.datetime.now()
            user.save()
            refresh_tkn = RefreshToken.for_user(user)
            access_tkn = refresh_tkn.access_token
        elif user.ending_date < datetime.datetime.now().date():
            raise AuthenticationFailed(detail='Your plan has expired. Please renew your plan.')
            
        # else:
        #     raise AuthenticationFailed(detail='Your plan has expired. Please renew your plan.')
        token = access_tkn
        # print("token",token)
        user = {"user_email" : user.email,"user_id" : user.id}
    # return str(token), str(refresh_tkn)
    # return str(token), user
    return str(token),user


# def create_token(**data):
#     user = authenticate(username=data.get('username'), password=data.get('password'))
#     if not user:
#         raise AuthenticationFailed(detail='Invalid Credentials')
#     elif data.get('username') == 'webadmin@gmail.com':
#         access_token = timedelta(days=365 * 3)  # 3 years expiration for specific user
#     else:
#         access_token_lifetime = timedelta(days=1)  # 24 hours expiration for other users
        
#     token = super().create_token(user)
#     token.set_exp(token.current_time + access_token_lifetime)
       # if data.get('source') and data.get('source') == 'mobile':
    #     access_tkn.set_exp(lifetime=settings.ACCESS_TOKEN_MOBILE_LIFETIME)
    # else:
    #     access_tkn.set_exp(lifetime=settings.ACCESS_TOKEN_GENERIC_LIFETIME)

    # waiting
    # from datetime import timedelta
# from django.conf import settings
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.exceptions import AuthenticationFailed

# def create_token(**data):
#     user = authenticate(username=data.get('username'), password=data.get('password'))
#     if not user:
#         raise AuthenticationFailed(detail='Invalid Credentials')
#     if data.get('username') == 'webadmin@gmail.com':
#         #lifetime = 180 # 3 years
#         #lifetime = getattr(settings, 'ACCESS_WEB_USER_LIFETIME')
#         lifetime = 300
     
#     else:
#         # lifetime = getattr(settings, 'ACCESS_TOKEN_LIFETIME')
#         lifetime = 60
       
#     refresh_tkn = RefreshToken.for_user(user)
#     access_tkn = refresh_tkn.access_token
#     access_tkn.set_exp(lifetime)
#     return str(access_tkn),str(refresh_tkn)