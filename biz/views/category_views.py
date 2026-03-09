from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from ..services.category_services import *
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class FetchAllCategory(APIView):
    def get(self,request):
        allcategory=fetch_all_category()
        return Response({'data':allcategory},status=status.HTTP_200_OK)
