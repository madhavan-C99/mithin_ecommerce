from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from ..services.feedback_services import *
from adm.tasks.api_log_task import api_history_log
from adm.services.user_service import authorize_request
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class AddFeedback(APIView):
    class InputSerializers(serializers.Serializer):
        product_id=serializers.IntegerField(required=True)
        user_id=serializers.IntegerField(required=True)
        comment=serializers.CharField(required=True)
    def post(self,request):
        # authorize_request("api_perm_add_feedback",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addfeedback=add_feedback(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': addfeedback, 
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data':addfeedback},status=status.HTTP_201_CREATED)
    
@authentication_classes([])
@permission_classes([])
class FetchOneFeedback(APIView):
    class InputSerializers(serializers.Serializer):
        product_id=serializers.IntegerField(required=True)
    def post(self,request):
        # authorize_request("api_perm_fetch_one_feedback",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        fetchfeed=fetch_one_feedback(serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':fetchfeed},status=status.HTTP_200_OK)
