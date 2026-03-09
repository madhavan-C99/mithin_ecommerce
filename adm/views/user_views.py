from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.response import Response
from rest_framework import status
from ..services.user_service import *
# from ..tasks.api_logger_task import log_api_history
from ..models import *
from rest_framework.decorators import authentication_classes, permission_classes

from django.utils import timezone
  
import datetime



logger = logging.getLogger('django')


@authentication_classes([])
@permission_classes([])
class CreateUser(APIView):
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(required = True)
        # last_name = serializers.CharField(required = False)
        # username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
        email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
        # user_profile = serializers.CharField(required = False)
        # username = serializers.CharField(required = True)
        # email_id = serializers.EmailField()
        # mobile_number = serializers.CharField(required = False,allow_null = True)
        # gender = serializers.CharField(required=False)
        # ending_date = serializers.DateField(required = False,allow_null = True)
        # address =  serializers.CharField(required=False)
        #user_type = serializers.CharField()
        # client_id = serializers.IntegerField(required=False, allow_null=True)
        # client_account_ids = serializers.ListField(child=serializers.IntegerField(), required=False, allow_null=True)
        # role_ids = serializers.ListField(child=serializers.IntegerField(), required=False, allow_null=True)
        role_id = serializers.IntegerField()
        password = serializers.CharField(required = True)
        user_profile = serializers.CharField(required = False)
        # confirm_password = serializers.CharField(required = True)
    def post(self, request):
        # authorize_request('api_add_user', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
    
        usr = create_user(request.user.username,**serializer.validated_data)

        # background task
        # print_users()

     
       
        # log_api_history(request.data, {'user': usr}, 'AddUser', request.user.id)
        return Response({'data': {'user': usr}},status=status.HTTP_201_CREATED)
        #return Response(usr,status = status.HTTP_201_CREATED)

@authentication_classes([])
@permission_classes([])
class CreatePerm(APIView):
    class InputSerializer(serializers.Serializer):
        #name = serializers.CharField(required=True)
        name = serializers.CharField(required=True, validators=[UniqueValidator(queryset=Perm.objects.all())])
        display_value = serializers.CharField(required=True)
        code = serializers.CharField(required=True, validators=[UniqueValidator(queryset=Perm.objects.all())])
  
    

    def post(self, request):
        # authorize_request('api_add_perm', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        perm_code = create_permission(request.user.username, **serializer.validated_data)
        # log_api_history(request.data, {'perm_code': perm_code}, 'AddPerm', request.user.id)
        return Response({'data': {'perm_code': perm_code}}, status=status.HTTP_200_OK)
    

@authentication_classes([])
@permission_classes([])
class CreateRole(APIView):
    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(required=True, validators=[UniqueValidator(queryset=Role.objects.all())])
        display_value = serializers.CharField(required=True)
        code = serializers.CharField(required=True, validators=[UniqueValidator(queryset=Role.objects.all())])
        description = serializers.CharField(required=True)

    def post(self, request):
        # authorize_request('api_add_role', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        role_code = create_role(request.user.username, **serializer.validated_data)
        # log_api_history(request.data, {'role_code': role_code}, 'AddRole', request.user.id)
        return Response({'data': {'role_code': role_code}}, status=status.HTTP_200_OK)
 
 
@authentication_classes([])
@permission_classes([])  
class AddPermissionRole(APIView):
    class InputSerializers(serializers.Serializer):
        role_id=serializers.IntegerField(required=True)
        perm_id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=add_perm_to_role(**serializer.validated_data)
        
        return Response({"data":data},status=status.HTTP_201_CREATED)


    
@authentication_classes([])
@permission_classes([])
class FetchAllUserData(APIView):
    def get(self,request):
        usersdata=fetch_all_user_data()
        return Response({'data':{'users':usersdata}})