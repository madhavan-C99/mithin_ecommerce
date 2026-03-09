from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from ..services.admin_service import *
from rest_framework.decorators import authentication_classes, permission_classes


@authentication_classes([])
@permission_classes([])
class CreateAdminProfile(APIView):
    class InputSerializers(serializers.Serializer):
        name=serializers.CharField(required=True)
        mobile=serializers.CharField(required=True)
        email=serializers.EmailField(required=True)
        password=serializers.CharField(required=True)
        confirm_password=serializers.CharField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        createuser=create_admin_user(**serializer.validated_data)
        return Response({'data':createuser},status=status.HTTP_201_CREATED)



@authentication_classes([])
@permission_classes([])
class EmailVerification(APIView):
    class InputSerializers(serializers.Serializer):
        email=serializers.EmailField(required=True)
        password=serializers.CharField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        validate=validate_email(**serializer.validated_data)
        return Response({'data':validate},status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class FetchAllAdmin(APIView):
    def get(self,request):
        fetchalladmin=fetch_all_admin()
        return Response({'data':{'users':fetchalladmin}},status=status.HTTP_202_ACCEPTED)