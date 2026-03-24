from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from ..models import *
# from ..tasks.api_logger_task import *
from ..services.collection_query_service import *
from ..services.user_service import *
from ..tasks.api_log_task import api_history_log
from rest_framework.decorators import authentication_classes, permission_classes


logger = logging.getLogger('django')



@authentication_classes([])
@permission_classes([])
class AddCollectionQuery(APIView):
    class InputSerializer(serializers.Serializer):
        key = serializers.CharField()
        query = serializers.CharField()
    
    def post(self,request):
        #authorize_request('api_query',request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        Cq = collection_query_service(**serializer.validated_data)
        # log_api_history(request.data, {'collectionquery': Cq.key}, 'AddCollectionQuery', request.user.id)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': Cq, 
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data': {'key':"success"}},status=status.HTTP_201_CREATED)