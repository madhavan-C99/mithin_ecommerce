from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from ..services.otp_verified_service import *
from rest_framework.decorators import authentication_classes, permission_classes



@authentication_classes([])
@permission_classes([])
class EmailVerification(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        username=serializers.CharField(required=True)
        email=serializers.EmailField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        validate=validate_email(**serializer.validated_data)
        return Response({'data':validate},status=status.HTTP_200_OK)

