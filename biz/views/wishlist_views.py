from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.wishlist_services import *
from adm.tasks.api_log_task import api_history_log
from adm.services.user_service import authorize_request




@authentication_classes([])
@permission_classes([])
class AddandRemoveWishlist(APIView):

    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
        product_id = serializers.IntegerField(required=True)
        
    def post(self, request):
        # authorize_request("api_perm_add_and_remove_wishlist",request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = add_and_remove_wishlist(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': result, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': result}, status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])
class RemoveOneWishItem(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        wishlist_id=serializers.IntegerField(required=True)
    def post(self,request):
        # authorize_request("api_perm_delete_one_wishlist_item",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        deleteitem=delete_wishlist_item(**serializer.validated_data)
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
class FetchWishlist(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)

    def post(self, request):
        # authorize_request("api_perm_fetch_wishlist",request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = fetch_wishlist(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': result, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': result}, status=status.HTTP_200_OK)