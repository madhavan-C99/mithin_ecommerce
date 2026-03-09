from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from ..services.dashborad_services import *
from rest_framework.decorators import authentication_classes, permission_classes



@authentication_classes([])
@permission_classes([])
class TopCardsReport(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=top_cards_report(**serializer.validated_data)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)



@authentication_classes([])
@permission_classes([])
class TopSalesProduct(APIView):
    def get(self,request):
        data=top_sales_product()
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)

@authentication_classes([])
@permission_classes([])
class PiechartSubategory(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=piechart_subcategory(**serializer.validated_data)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)
    
@authentication_classes([])
@permission_classes([])    
class CategoryRevenueChart(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=category_revenue_chart(**serializer.validated_data)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)
    
    
    
@authentication_classes([])
@permission_classes([])    
class SalesChart(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=sales_graph_filter(**serializer.validated_data)
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)
    
    
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
    
    
