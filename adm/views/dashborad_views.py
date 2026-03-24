from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from ..services.dashborad_services import *
from ..tasks.api_log_task import api_history_log
from ..services.user_service import *


class TopCardsReport(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")

    def post(self, request):
        authorize_request('api_perm_top_cards_report', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = top_cards_report(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)


class TopSalesProduct(APIView):
    def get(self, request):
        authorize_request('api_perm_top_sales_product', request.user)
        data = top_sales_product()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)


class PiechartSubategory(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")

    def post(self, request):
        authorize_request('api_perm_pie_chart_subcategory', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = piechart_subcategory(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)


class CategoryRevenueChart(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")

    def post(self, request):
        authorize_request('api_perm_category_revenue_chart', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = category_revenue_chart(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)


class SalesChart(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")

    def post(self, request):
        authorize_request('api_perm_sales_chart', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = sales_graph_filter(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)