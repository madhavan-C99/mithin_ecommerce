from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from ..services.admin_service import *
from rest_framework.decorators import authentication_classes, permission_classes
from ..tasks.api_log_task import api_history_log
from ..services.user_service import authorize_request


# @authentication_classes([])
# @permission_classes([])
class CreateAdminProfile(APIView):
    class InputSerializers(serializers.Serializer):
        name=serializers.CharField(required=True)
        mobile=serializers.CharField(required=True)
        email=serializers.EmailField(required=True)
        password=serializers.CharField(required=True)
        confirm_password=serializers.CharField(required=True)
    def post(self,request):
        authorize_request("api_perm_create_new_admin_user",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        createuser=create_admin_user(**serializer.validated_data)
        log_data={'user_id': request.user.id if request.user.id else None,
        'api_name': request.path,
        'method': request.method,
        'request_payload': serializer.validated_data,
        'response_payload': createuser,              
        'status_code': 201}
        api_history_log(log_data)
        return Response({'data':createuser},status=status.HTTP_201_CREATED)



@authentication_classes([])
@permission_classes([])
class EmailVerification(APIView):
    class InputSerializers(serializers.Serializer):
        email=serializers.EmailField(required=True)
        password=serializers.CharField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        validate=validate_email(**serializer.validated_data)
        response_body = validate 

        # 2. SESSION STORAGE
        # Dictionary keys-ah access panna get() use pannunga
        user_info = response_body.get('user', {})
        u_id = user_info.get('user_id')

        if u_id:
            request.session['user_id'] = u_id
            request.session.modified = True
            request.session.save()
            print(f"DEBUG: Session saved for ID {u_id}")
        log_data = {
            'user_id': None, 
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': validate,
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':validate},status=status.HTTP_200_OK)


# @authentication_classes([])
# @permission_classes([])
class FetchAllAdmin(APIView):
    def get(self,request):
        authorize_request("api_perm_fetch_all_admin",request.user)
        fetchalladmin=fetch_all_admin()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {}, 
            'response_payload': {}, 
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data':{'users':fetchalladmin}},status=status.HTTP_202_ACCEPTED)