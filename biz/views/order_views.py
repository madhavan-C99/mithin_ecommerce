from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.order_services import *
from adm.tasks.api_log_task import api_history_log
from adm.services.user_service import authorize_request

# @authentication_classes([])
# @permission_classes([])
class PurchaseHistory(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
    def post(self, request):
        authorize_request("api_perm_purchase_history",request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        history = fetch_purchase_history(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': history}, status=status.HTTP_200_OK)
    
# @authentication_classes([])
# @permission_classes([])
class CreateOrder(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        address_id = serializers.IntegerField(required=True)
        total_amount = serializers.FloatField(required=True)
    def post(self,request):
        authorize_request("api_perm_create_order",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result=create_order(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': result, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':result},status=status.HTTP_201_CREATED)
    
# @authentication_classes([])
# @permission_classes([])
class CancelOrder(APIView):
    class InputSerializers(serializers.Serializer):
        order_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_cancel_order",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        cancelorder=cancel_order(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': cancelorder, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':cancelorder},status=status.HTTP_202_ACCEPTED)
    

# @authentication_classes([])
# @permission_classes([])
class FetchOrderSummary(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
    def post(self,request):
        authorize_request("api_perm_fetch_order_summary",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        getsummary=fetch_order_summary(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': getsummary, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':getsummary},status=status.HTTP_200_OK)



#This is only for testing purpose it's not an official API
@authentication_classes([])
@permission_classes([])
class ChangeOrderStatus(APIView):
    class InputSerializers(serializers.Serializer):
        order_id=serializers.IntegerField(required=True)
        status=serializers.CharField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        changestatus=change_status(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': changestatus, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':changestatus},status=status.HTTP_202_ACCEPTED)
    
