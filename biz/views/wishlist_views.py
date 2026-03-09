from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status
from rest_framework.decorators import authentication_classes, permission_classes
from ..services.wishlist_services import *


@authentication_classes([])
@permission_classes([])
class AddandRemoveWishlist(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)
        product_id = serializers.IntegerField(required=True)
        weight = serializers.CharField(required=True)

    def post(self, request):
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = add_and_remove_wishlist(**serializer.validated_data)
        return Response({'data': result}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class FetchWishlist(APIView):
    class InputSerializers(serializers.Serializer):
        user_id = serializers.IntegerField(required=True)

    def post(self, request):
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = fetch_wishlist(serializer.validated_data)
        return Response({'data': result}, status=status.HTTP_200_OK)