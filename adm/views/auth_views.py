import logging
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.auth_service import *
from ..services.user_service import *
from ..tasks.api_log_task import api_history_log
from ..models import *

logger = logging.getLogger('django')


@authentication_classes([])
@permission_classes([])
class CreateToken(APIView):
    class InputSerializer(serializers.Serializer):
        username = serializers.CharField()
        password = serializers.CharField(write_only=True)
        source = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token, user_details = create_token(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response(
            {"data": {"token": token, "user": user_details}},
            status=status.HTTP_200_OK
        )


@authentication_classes([])
@permission_classes([])
class GenerateOtpView(APIView):
    class InputSerializers(serializers.Serializer):
        # mobile=serializers.IntegerField(required=True)
        email=serializers.EmailField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        generateotp=generate_otp(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': generateotp, 
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data':generateotp},status=status.HTTP_201_CREATED)


@authentication_classes([])
@permission_classes([])
class VerifyOtpView(APIView):
    class InputSerializer(serializers.Serializer):
        otp = serializers.CharField()
        otp_id = serializers.IntegerField()
    def post(self, request):
        # authorize_request('api_perm_verify_otp',request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = verify_otp_and_create_token(**serializer.validated_data)
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
