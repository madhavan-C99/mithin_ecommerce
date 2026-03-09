from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from ..services.feedback_services import *
from rest_framework.decorators import authentication_classes, permission_classes

@authentication_classes([])
@permission_classes([])
class AddFeedback(APIView):
    class InputSerializers(serializers.Serializer):
        product_id=serializers.IntegerField(required=True)
        user_id=serializers.IntegerField(required=True)
        comment=serializers.CharField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addfeedback=add_feedback(**serializer.validated_data)
        return Response({'data':addfeedback},status=status.HTTP_201_CREATED)
    
@authentication_classes([])
@permission_classes([])
class FetchOneFeedback(APIView):
    class InputSerializers(serializers.Serializer):
        product_id=serializers.IntegerField(required=True)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        fetchfeed=fetch_one_feedback(serializer.validated_data)
        return Response({'data':fetchfeed},status=status.HTTP_200_OK)
