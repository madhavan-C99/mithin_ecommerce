from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.response import Response
from rest_framework import status
from ..services.auth_service import *
# from ..services.token_pair_service import create_token
# from ..tasks.api_logger_task import log_api_history
from ..models import *
from rest_framework.decorators import authentication_classes, permission_classes
import logging


logger = logging.getLogger('django')


@authentication_classes([])
@permission_classes([])
class CreateToken(APIView):
    class InputSerializer(serializers.Serializer):
        username = serializers.CharField()
        password = serializers.CharField(write_only=True)
        source = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token, user_details = create_token(**serializer.validated_data)
        # user_details = create_token(**serializer.validated_data)
        # print(token,user_details)
        # token,user_details = 
        # print("data",data)
        print({"data" : {"token" : token,"user_details" : user_details}})
        return Response({"data" : {"token" : token,"user" : user_details}},status=status.HTTP_200_OK)
        

