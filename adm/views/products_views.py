from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from ..services.products_service import *
from ..services.user_service import *
from ..models import *
from ..tasks.api_log_task import api_history_log


class GetSelectOption(APIView):
    class InputSerializers(serializers.Serializer):
        fields = serializers.CharField(required=True)

    def post(self, request):
        authorize_request('api_perm_get_select_option', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = get_select_options(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)



class AddProduct(APIView):
    class InputSerializers(serializers.Serializer):
        name = serializers.CharField(required=True)
        tamil_name = serializers.CharField(required=False)
        description = serializers.CharField(required=True)
        is_active = serializers.BooleanField(required=True)
        weight = serializers.IntegerField(required=True)
        price = serializers.FloatField(required=True)
        unit = serializers.CharField(required=True)
        stock = serializers.IntegerField(required=True)
        expiry_date = serializers.DateField()
        subcategory_id = serializers.IntegerField(required=False)
        category_id = serializers.IntegerField(required=True)
        current_trending_status = serializers.BooleanField(required=False)
        product_img = serializers.ImageField(required=True)

    def post(self, request):
        authorize_request('api_perm_create_product', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addproduct = add_product(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': {},
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data': addproduct}, status=status.HTTP_201_CREATED)


class FetchAllProduct(APIView):
    def get(self, request):
        authorize_request('api_perm_fetch_all_product', request.user)
        data = fetch_all_product()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': {},
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({"data": data}, status=status.HTTP_202_ACCEPTED)


class FetchOneProduct(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_fetch_one_product', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = fetch_one_product(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_202_ACCEPTED)


class UpdateProduct(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)
        name = serializers.CharField(required=False)
        tamil_name = serializers.CharField(required=False)
        product_image = serializers.CharField(required=False)
        product_img = serializers.ImageField(required=False)
        description = serializers.CharField(required=False)
        price = serializers.FloatField(required=False)
        weight = serializers.FloatField(required=False)
        unit = serializers.CharField(required=False)
        stock = serializers.IntegerField(required=False)
        expiry_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", input_formats=['%Y-%m-%d', 'iso-8601'], required=False)
        subcategory_id = serializers.IntegerField(required=False)
        category_id = serializers.IntegerField(required=False)
        status = serializers.BooleanField(required=False)
        current_trending_status = serializers.BooleanField(required=False)

    def post(self, request):
        authorize_request('api_perm_update_product', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        updateproduct = update_product(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': {},
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': updateproduct}, status=status.HTTP_200_OK)


class DeleteProduct(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_delete_product', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = delete_product(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_200_OK)


class AddCategory(APIView):
    class InputSerializers(serializers.Serializer):
        name = serializers.CharField(required=True)
        description = serializers.CharField(required=True)
        status = serializers.BooleanField(required=True)
        category_image = serializers.ImageField(required=False)

    def post(self, request):
        authorize_request('api_perm_create_category', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addcategory = add_category(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': addcategory,
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data': addcategory}, status=status.HTTP_201_CREATED)


class FetchAllCategory(APIView):
    def get(self, request):
        authorize_request('api_perm_fetch_all_category', request.user)
        data = fetch_all_category()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': data,
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_202_ACCEPTED)


class FetchOneCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_fetch_one_category', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = fetch_one_category(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_202_ACCEPTED)


class UpdateCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)
        name = serializers.CharField(required=False)
        description = serializers.CharField(required=False)
        status = serializers.BooleanField(required=False)
        category_img = serializers.ImageField(required=False)

    def post(self, request):
        authorize_request('api_perm_update_category', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = update_category(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': data,
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_200_OK)


class DeleteCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_delete_category', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = delete_category(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_200_OK)


class AddSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        name = serializers.CharField(required=True)
        description = serializers.CharField(required=True)
        category_id = serializers.IntegerField(required=True)
        status = serializers.BooleanField(required=True)
        subcategory_img = serializers.ImageField(required=False)

    def post(self, request):
        authorize_request('api_perm_create_subcategory', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addcategory = add_sub_category(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': addcategory,
            'status_code': 201
        }
        api_history_log(log_data)
        return Response({'data': addcategory}, status=status.HTTP_201_CREATED)


class FetchAllSubCategory(APIView):
    def get(self, request):
        authorize_request('api_perm_fetch_all_subcategory', request.user)
        data = fetch_all_subcategory()
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': data,
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_202_ACCEPTED)


class FetchOneSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_fetch_one_subcategory', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = fetch_one_subcategory(**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 202
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_202_ACCEPTED)


class UpdateSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)
        name = serializers.CharField(required=False)
        description = serializers.CharField(required=False)
        status = serializers.BooleanField(required=False)
        category_id = serializers.IntegerField(required=False)
        subcategory_img = serializers.ImageField(required=False)

    def post(self, request):
        authorize_request('api_perm_update_subcategory', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = update_subcategory(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': {},
            'response_payload': data,
            'status_code': 200
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_200_OK)


class DeleteSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id = serializers.IntegerField(required=True)

    def post(self, request):
        authorize_request('api_perm_delete_subcategory', request.user)
        serializer = self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = delete_subcategory(request.user,**serializer.validated_data)
        log_data = {
            'user_id': request.user.id if request.user.id else None,
            'api_name': request.path,
            'method': request.method,
            'request_payload': serializer.validated_data,
            'response_payload': data,
            'status_code': 201  # ✅ 201 → 200 fix (DELETE is 200)
        }
        api_history_log(log_data)
        return Response({'data': data}, status=status.HTTP_200_OK)