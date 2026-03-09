from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.response import Response
from rest_framework import status
from ..services.customer_service import *
# from ..tasks.api_logger_task import log_api_history
from ..models import *
from rest_framework.decorators import authentication_classes, permission_classes

from django.utils import timezone
  
import datetime

logger = logging.getLogger('django')



@authentication_classes([])
@permission_classes([])
class CreateCustomer(APIView):
    class InputSerializer(serializers.Serializer):
        username = serializers.CharField(required = True)
        email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
        role_id = serializers.IntegerField()
        password = serializers.CharField(required = True)
        user_profile = serializers.CharField(required = False)
    def post(self, request):
        # authorize_request('api_add_user', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        usr = create_customer(request.user.username,**serializer.validated_data)
        return Response({'data': {'user': usr}},status=status.HTTP_201_CREATED)
    
@authentication_classes([])
@permission_classes([])
class FetchAllCustomerData(APIView):
    def get(self,request):
        usersdata=fetch_all_customer_data()
        return Response({'data':{'users':usersdata}})