from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from ..services.otp_verified_service import *
from rest_framework.decorators import authentication_classes, permission_classes
from ..tasks.api_log_task import api_history_log
from rest_framework.authentication import SessionAuthentication, BasicAuthentication



@authentication_classes([])
@permission_classes([])
class EmailVerification(APIView):
    class InputSerializers(serializers.Serializer):
        user_id=serializers.IntegerField(required=True)
        username=serializers.CharField(required=True)
        email=serializers.EmailField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        validate=validate_email(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else serializer.validated_data.get('user_id'),
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':validate},status=status.HTTP_200_OK)

# class EmailVerification(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = []

#     class InputSerializers(serializers.Serializer):
#         user_id = serializers.IntegerField(required=True)
#         username = serializers.CharField(required=True)
#         email = serializers.EmailField(required=True)

#     def post(self, request):
#         serializer = self.InputSerializers(data=request.data)
#         serializer.is_valid(raise_exception=True)
        
#         # 1. Email validation logic
#         validate = validate_email(**serializer.validated_data)

#         # 2. SESSION STORAGE (Backend-la save panrom)
#         # Intha request object kulla irukira session dictionary-la data-va podurom
#         request.session['verified_user_id'] = serializer.validated_data.get('user_id')
#         request.session['verified_email'] = serializer.validated_data.get('email')
#         request.session['is_email_verified'] = True
        
#         # Session expiry set panrom (e.g., 1 hour for verification state)
#         request.session.set_expiry(3600) 

#         request.session.modified = True 
#         request.session.save()
#         print(f"DEBUG: Session Key -> {request.session.session_key}")

#         # 3. API LOGGING (Unga existing logic)
#         log_data = {
#             'user_id': request.user.id if request.user.id else serializer.validated_data.get('user_id'),
#             'api_name': request.path,
#             'method': request.method,
#             'request_payload': serializer.validated_data,
#             'response_payload': validate, 
#             'status_code': 200
#         }
#         api_history_log(log_data)

#         # 4. RESPONSE (Frontend-ku validate results + session confirmation anuprom)
#         return Response({
#             'data': validate,
#             'session_info': {
#                 'user_id': request.session.get('verified_user_id'),
#                 'status': 'Session persistent in backend'
#             }
#         }, status=status.HTTP_200_OK)