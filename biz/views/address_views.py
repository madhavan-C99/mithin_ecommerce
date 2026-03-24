from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.address_services import *
from adm.services.user_service import *
from adm.tasks.api_log_task import api_history_log
from adm.services.user_service import authorize_request

# @authentication_classes([])
# @permission_classes([])
class AddAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id =serializers.IntegerField(required=True)
        name=serializers.CharField(required=True)
        mobile=serializers.CharField(required=True)
        category=serializers.CharField(required=True)
        address_line1 = serializers.CharField(required=True)
        address_line2 = serializers.CharField(required=True)
        landmark=serializers.CharField(required=False,allow_blank=True, allow_null=True)
        city = serializers.CharField(required=True)
        state = serializers.CharField(required=True)
        country = serializers.CharField(required=True)
        pincode = serializers.CharField(required=True)
    def post(self,request):
        authorize_request('api_perm_add_address',request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addaddress=add_address(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {}, 
            'response_payload': {}, 
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data':addaddress},status=status.HTTP_201_CREATED)
    

# @authentication_classes([])
# @permission_classes([])
class UpdateAddress(APIView):
    class InputSerializers(serializers.Serializer):
        address_id =serializers.IntegerField(required=True)
        name=serializers.CharField(required=False)
        mobile=serializers.CharField(required=False)
        category=serializers.CharField(required=False)
        address_line1 = serializers.CharField(required=False)
        address_line2 = serializers.CharField(required=False)
        landmark=serializers.CharField(required=False)
        city = serializers.CharField(required=False)
        state = serializers.CharField(required=False)
        country = serializers.CharField(required=False)
        pincode = serializers.CharField(required=False)
    def post(self,request):
        authorize_request("api_perm_update_address",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        updateaddress=update_address(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {}, 
            'response_payload': updateaddress, 
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data':updateaddress},status=status.HTTP_201_CREATED)


# @authentication_classes([])
# @permission_classes([])
class FetchAllAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_fetch_all_address",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        alladdress=fetch_all_address(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':alladdress},status=status.HTTP_200_OK)        
    
# @authentication_classes([])
# @permission_classes([])
class DeleteAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        address_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_delete_address",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        deleteaddress=delete_address(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': deleteaddress, 
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data':deleteaddress},status=status.HTTP_201_CREATED)
    

# @authentication_classes([])
# @permission_classes([])
class DefaultAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        address_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_default_address",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        defaultaddress=default_address(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': defaultaddress, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':defaultaddress},status=status.HTTP_200_OK)    
    
# @authentication_classes([])
# @permission_classes([])
class FetchDefaultAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_fetch_default_address",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        fetchdefault=fetch_default_address(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': fetchdefault, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':fetchdefault},status=status.HTTP_200_OK)