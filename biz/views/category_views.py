from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from ..services.category_services import *
from adm.tasks.api_log_task import api_history_log
from adm.services.user_service import authorize_request
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class FetchAllCategory(APIView):
    def post(self,request):
        # authorize_request("api_perm_fetch_all_categories",request.user)
        allcategory=fetch_all_category()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {}, 
            'response_payload': allcategory, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':allcategory},status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])
class FetchSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        category_id=serializers.IntegerField(required=True)
    def post(self,request):
        # authorize_request("api_perm_fetch_sub_category",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        subcategory=fetch_sub_category(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':subcategory},status=status.HTTP_200_OK)
