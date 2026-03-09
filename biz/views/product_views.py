from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from ..services.product_services import *
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class FetchProductDetails(APIView):
    class InputSerializers(serializers.Serializer):
        product_id = serializers.IntegerField(required=True)
    def post(self, request):
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)        
        result = fetch_product_details(serializer.validated_data)            
        return Response({'data': result}, status=status.HTTP_200_OK)
    