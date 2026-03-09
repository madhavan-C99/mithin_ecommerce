from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.cart_services import *



@authentication_classes([])
@permission_classes([])
class AddtoCart(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        product_id=serializers.IntegerField(required=True)
        weight=serializers.FloatField(required=True)
        unit_price=serializers.FloatField(required=True)
        quantity=serializers.IntegerField(required=False, default=1)
        total_price=serializers.FloatField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addtocart=add_to_cart(**serializer.validated_data)
        return Response({'data':addtocart},status=status.HTTP_201_CREATED)

@authentication_classes([])
@permission_classes([])
class FetchCartItems(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        getitems=fetch_cart_items(serializer.validated_data)
        return Response({'data':getitems},status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])
class UpdateCartQuantity(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
        product_id = serializers.IntegerField(required=True)
    def post(self, request):
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_or_delete_cart_item(**serializer.validated_data)
        return Response({'message': result}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class DeleteCartitem(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        cart_item_id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        deleteitem=delete_cart_item(**serializer.validated_data)
        return Response({'data':deleteitem},status=status.HTTP_202_ACCEPTED)
    
@authentication_classes([])
@permission_classes([])
class ClearCart(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
    def post(self, request):
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)  
        result = clear_user_cart(serializer.validated_data)
        return Response({'message': result}, status=status.HTTP_200_OK)