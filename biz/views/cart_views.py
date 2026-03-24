from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.cart_services import *
from adm.services.user_service import *
from adm.services.user_service import authorize_request
from adm.tasks.api_log_task import api_history_log


@authentication_classes([])
@permission_classes([])
class AddtoCart(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        product_id=serializers.IntegerField(required=True)
        weight=serializers.FloatField(required=True)
        unit_price=serializers.FloatField(required=True)
        quantity=serializers.IntegerField(required=True)
        total_price=serializers.FloatField(required=True)
    def post(self,request):
        # authorize_request('api_perm_add_to_cart',request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addtocart=add_to_cart(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': addtocart,                
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data':addtocart},status=status.HTTP_201_CREATED)

@authentication_classes([])
@permission_classes([])
class FetchCartItems(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
    def post(self,request):
        # authorize_request("api_perm_fetch_cart_items",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        getitems=fetch_cart_items(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':getitems},status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])
class UpdateCartQuantity(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
        product_id = serializers.IntegerField(required=True)
        quantity=serializers.IntegerField(required=True)
        total_price=serializers.DecimalField(required=True,max_digits=10,decimal_places=2)
    def post(self, request):
        # authorize_request("api_perm_update_item_quantity",request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_cart_item(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': result, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'message': result}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class DeleteCartitem(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        cart_item_id=serializers.IntegerField(required=True)
    def post(self,request):
        # authorize_request("api_perm_delete_one_item",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        deleteitem=delete_cart_item(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': deleteitem, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data':deleteitem},status=status.HTTP_202_ACCEPTED)
    
@authentication_classes([])
@permission_classes([])
class ClearCart(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
    def post(self, request):
        # authorize_request("api_perm_clear_cart",request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)  
        result = clear_user_cart(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': result, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'message': result}, status=status.HTTP_200_OK)