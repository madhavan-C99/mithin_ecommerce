from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.address_services import *


@authentication_classes([])
@permission_classes([])
class AddAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id =serializers.IntegerField(required=True)
        name=serializers.CharField(required=True)
        address_line1 = serializers.CharField(required=True)
        address_line2 = serializers.CharField(required=True)
        city = serializers.CharField(required=True)
        state = serializers.CharField(required=True)
        country = serializers.CharField(required=True)
        pincode = serializers.CharField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addaddress=add_address(**serializer.validated_data)
        return Response({'data':addaddress},status=status.HTTP_201_CREATED)
    

@authentication_classes([])
@permission_classes([])
class UpdateAddress(APIView):
    class InputSerializers(serializers.Serializer):
        address_id =serializers.IntegerField(required=True)
        name=serializers.CharField(required=True)
        address_line1 = serializers.CharField(required=False)
        address_line2 = serializers.CharField(required=False)
        city = serializers.CharField(required=False)
        state = serializers.CharField(required=False)
        country = serializers.CharField(required=False)
        pincode = serializers.CharField(required=False)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        updateaddress=update_address(**serializer.validated_data)
        return Response({'data':updateaddress},status=status.HTTP_201_CREATED)


@authentication_classes([])
@permission_classes([])
class FetchAllAddress(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        alladdress=fetch_all_address(serializer.validated_data)
        return Response({'data':alladdress},status=status.HTTP_200_OK)        
    
@authentication_classes([])
@permission_classes([])
class DeleteAddress(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        deleteaddress=delete_address(**serializer.validated_data)
        return Response({'data':deleteaddress},status=status.HTTP_201_CREATED)
    
@authentication_classes([])
@permission_classes([])
class FetchOneAddress(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        oneaddress=fetch_one_address(serializer.validated_data)
        return Response({'data':oneaddress},status=status.HTTP_200_OK) 