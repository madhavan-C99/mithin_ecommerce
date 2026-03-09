from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.order_services import *

@authentication_classes([])
@permission_classes([])
class PurchaseHistory(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
    def post(self, request):
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        history = fetch_purchase_history(serializer.validated_data)
        return Response({'data': history}, status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])
class CreateOrder(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        address_id = serializers.IntegerField(required=True)
        total_amount = serializers.FloatField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result=create_order(**serializer.validated_data)
        return Response({'data':result},status=status.HTTP_201_CREATED)
    
@authentication_classes([])
@permission_classes([])
class CancelOrder(APIView):
    class InputSerializers(serializers.Serializer):
        order_id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        cancelorder=cancel_order(serializer.validated_data)
        return Response({'data':cancelorder},status=status.HTTP_202_ACCEPTED)


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
        return Response({'data':changestatus},status=status.HTTP_202_ACCEPTED)
    
