from rest_framework.views import APIView
from rest_framework import status
from rest_framework import serializers
from rest_framework.response import Response
from ..services.location_service import *
from ..tasks.api_log_task import api_history_log
from ..services.user_service import authorize_request
from googlemaps import distance_matrix
from rest_framework.decorators import authentication_classes, permission_classes


@authentication_classes([])
@permission_classes([])
class FindCustomerDistance(APIView):
    class InputSerializers(serializers.Serializer):
        address=serializers.CharField(required=True)
    def post(self,request):
        # authorize_request("api_perm_find_customer_distance",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        address = serializer.validated_data['address']
        result =get_customer_distance(address)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': {}, 
            'status_code': 200
        }
        api_history_log(log_data)
        if "error" in result:
            return Response(
                {"status": "error", "message": result["error"]}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"status": "success", "data": result}, 
            status=status.HTTP_200_OK
        )
    
@authentication_classes([])
@permission_classes([])
class GetAddress(APIView):
    class InputSerializers(serializers.Serializer):
        lat=serializers.FloatField(required=True)
        lng=serializers.FloatField(required=True)
    def post(self,request):
        # authorize_request("api_perm_get_address",request.user)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        getaddress=get_address_from_coords(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data, 
            'response_payload': getaddress, 
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data':getaddress},status=status.HTTP_200_OK)