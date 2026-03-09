from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from ..services.order_management_service import *
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])    
class OrderTopTile(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=order_top_tile(**serializer.validated_data)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)
    
@authentication_classes([])
@permission_classes([])      
class FetchOneOrderDetails(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=False)
        order_number=serializers.CharField(required=False)
    
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=fetch_one_order(**serializer.validated_data)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)
    
@authentication_classes([])
@permission_classes([])   
class OrderStatusUpdate(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        # order_number=serializers.CharField(required=True)
        order_status=serializers.CharField(required=True)
    
    def post(self,request):
        print(1)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=order_status_update(**serializer.validated_data)
        print(2)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)