import os
from django.http import FileResponse
# import pandas as pd
from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse
import pandas as pd
# from ..services.collection_query_service import exec_raw_sql
from ..services.user_service import *
from ..services.file_service import upload_file, upload_file_as_bytes
from rest_framework.decorators import authentication_classes, permission_classes
import logging


logger = logging.getLogger('django')


# field value in request json is the "key" field in collecton_queries.
# For select options, the key should always start with "SO_"
class GetSelectOptions(APIView):
    class InputSerializer(serializers.Serializer):
        field = serializers.CharField(required=True)
        opt_filter = serializers.JSONField(required=False)

    def post(self, request):
        #authorize_request('api_get_select_options', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        qry_data = serializer.validated_data
        if qry_data.get('opt_filter') is None:
            qry_data.update(opt_filter={})
        res_options = exec_raw_sql(qry_data.get('field'), qry_data.get('opt_filter'))
        return Response({'data': res_options}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class UploadFile(APIView):
    class InputSerializer(serializers.Serializer):
        file = serializers.FileField(required=True)
        source_field = serializers.CharField(required=True)

    def post(self, request):
        # authorize_request('api_upload_file', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file_upd_obj = upload_file('system', **serializer.validated_data)
        return Response({'data': file_upd_obj}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class UploadFileAsby(APIView):
    class InputSerializer(serializers.Serializer):
        # file = serializers.ListField(child=serializers.IntegerField(), required=True)
        file = serializers.CharField(required=True)
        source_field = serializers.CharField(required=True)
        filename = serializers.CharField(required=True)

    def post(self, request):
        # authorize_request('api_upload_file', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        # file_upd_obj = upload_file('system', **serializer.validated_data)
        file_upd_obj = upload_file_as_bytes('system', **serializer.validated_data)
        return Response({'data': file_upd_obj}, status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class GetFile(APIView):
    class InputSerializer(serializers.Serializer):
        file_path = serializers.CharField(required=True)

    def post(self, request):
        # authorize_request('api_get_file', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        req_file = open(serializer.validated_data.get('file_path'), 'rb')
        response = FileResponse(req_file)
        return response


class GetPincode(APIView):
    class InputSerializer(serializers.Serializer):
        pin = serializers.CharField(required=True)

    def post(self, request):
        # authorize_request('api_upload_file', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # pincode = get_pincode(**serializer.validated_data)
        pincode = None
        return Response({'pincode': pincode}, status=status.HTTP_200_OK)


# @authentication_classes([])
# @permission_classes([])
# class ExportExcel(APIView):
#     class InputSerializer(serializers.Serializer):
#         export_json = serializers.JSONField(required=True)

#     def post(self, request):
#         authorize_request('api_export_file', request.user)
#         serializer = self.InputSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         df = pd.DataFrame.from_dict(serializer.validated_data.get('export_json'))
#         df.index += 1
#         file_path = os.getcwd() + 'excel.xlsx'
#         df.to_excel(file_path)
#         req_file = open(file_path, 'rb')
#         response = FileResponse(req_file)
#         return response

# new code 
class ExportExcel(APIView):
    class InputSerializer(serializers.Serializer):
        export_json = serializers.JSONField(required=True)

    def post(self, request):
        authorize_request('api_export_file', request.user)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        df = pd.DataFrame.from_dict(serializer.validated_data.get('export_json'))
        # Remove the default pandas index by setting index=False
        file_path = os.path.join(os.getcwd(), 'excel.xlsx')
        df.to_excel(file_path, index=False)  # Set index to False here
        req_file = open(file_path, 'rb')
        response = FileResponse(req_file, as_attachment=True, filename='exported_data.xlsx')  # Optional: specify filename
        return response