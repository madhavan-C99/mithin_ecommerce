from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from ..services.category_services import *
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class FetchAllCategory(APIView):
    def post(self,request):
        allcategory=fetch_all_category()
        return Response({'data':allcategory},status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])
class FetchSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        category_id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        subcategory=fetch_sub_category(serializer.validated_data)
        return Response({'data':subcategory},status=status.HTTP_200_OK)
