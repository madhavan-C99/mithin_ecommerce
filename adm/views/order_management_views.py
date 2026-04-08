from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from ..services.order_management_service import *
from ..tasks.api_log_task import api_history_log
from ..services.user_service import *

class OrderTopTile(APIView):
    class InputSerializers(serializers.Serializer):
        from_date = serializers.DateField(required=False)
        to_date = serializers.DateField(required=False)
        filter_type = serializers.CharField(required=False, default="year")

    def post(self, request):
        authorize_request('api_perm_top_cards_report', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = order_top_tile(**serializer.validated_data)
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


class FetchOneOrderDetails(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_fetch_one_order_details', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = fetch_one_order(**serializer.validated_data)
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


class OrderStatusUpdate(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)
        order_status = serializers.CharField(required=True)

    def post(self, request):
        authorize_request('api_perm_order_status_update', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = order_status_update(**serializer.validated_data)
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


class ReadNotification(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_read_notification', request.user)
        admin_profile = AdminProfile.objects.filter(user=request.user).first()
        user_name = (
            admin_profile.name
            if admin_profile and admin_profile.name
            else request.user.username
        )

        print("Logged User:", user_name)      
        
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = read_notification(user_name,**serializer.validated_data)
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