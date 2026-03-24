from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.response import Response
from rest_framework import status
from ..services.customer_service import *
from ..tasks.api_log_task import api_history_log
from adm.services.user_service import authorize_request
from ..models import *
from rest_framework.decorators import authentication_classes, permission_classes

from django.utils import timezone
  
import datetime

logger = logging.getLogger('django')



@authentication_classes([])
@permission_classes([])
class CreateCustomer(APIView):
    class InputSerializer(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        username = serializers.CharField(required = True)
        email = serializers.EmailField(required=True)
    def post(self, request):
        # authorize_request('api_perm_create_customer', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        usr = create_customer(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': usr, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data': {'user': usr}},status=status.HTTP_201_CREATED)
    
# @authentication_classes([])
# @permission_classes([])
class FetchAllCustomerData(APIView):
    def get(self,request):
        authorize_request("api_perm_fetch_all_customer_data",request.user)
        usersdata=fetch_all_customer_data()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {}, 
            'response_payload': {}, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data':{'users':usersdata}})
    
# @authentication_classes([])
# @permission_classes([])
class FetchOneCustomerProfile(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_fetch_one_customer_data",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        customerprofile=fetch_one_customer_data(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': customerprofile, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data':customerprofile},status=status.HTTP_202_ACCEPTED)
    

# @authentication_classes([])
# @permission_classes([])
class UpdateCustomerProfile(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        name=serializers.CharField(required=False)
        # mobile=serializers.CharField(required=False)
        email=serializers.EmailField(required=False)
    def post(self,request):
        authorize_request("api_perm_update_customer_profile",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        updateuser=update_customer_data(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': updateuser, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data':updateuser},status=status.HTTP_202_ACCEPTED)
    
# @authentication_classes([])
# @permission_classes([])
class CustomerOneActiveStatus(APIView):
    class InputSerializer(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        role=serializers.CharField(required=True)
        status=serializers.BooleanField(required=True)
    def post(self,request):
        authorize_request("api_perm_change_customer_status",request.user)
        serializer=self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        change_status=change_customer_status(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': change_status, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data':change_status},status=status.HTTP_202_ACCEPTED)
    
 
