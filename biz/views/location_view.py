from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from ..services.location_services import *
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class GetLocation(APIView):
    class InputSerializers(serializers.Serializer):
        user_lat=serializers.DecimalField(max_digits=20, decimal_places=16,required=True)
        user_long=serializers.DecimalField(max_digits=20, decimal_places=16,required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        getlocation=get_location(**serializer.validated_data)
        return Response({'data':getlocation},status=status.HTTP_200_OK)
