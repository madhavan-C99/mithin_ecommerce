from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from ..services.products_service import *
from rest_framework.decorators import authentication_classes, permission_classes






@authentication_classes([])
@permission_classes([]) 
class GetSelectOption(APIView):
    class InputSerializers(serializers.Serializer):
        fields=serializers.CharField(required=True)
    
    def post(self,request):
        print(1)
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=get_select_options(**serializer.validated_data)
        
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)


@authentication_classes([])
@permission_classes([])
class AddDetails(APIView):
    def get(self,request):
        data=add_details()
        return Response({"data":data},status=status.HTTP_201_CREATED)


@authentication_classes([])
@permission_classes([])
class AddProduct(APIView):
    class InputSerializers(serializers.Serializer):
        name=serializers.CharField(required=True)
        tamil_name=serializers.CharField(required=False)
        description=serializers.CharField(required=True)
        is_active=serializers.BooleanField(required=True)
        weight=serializers.IntegerField(required=True)
        price=serializers.FloatField(required=True)
        unit=serializers.CharField(required=True)
        stock=serializers.IntegerField(required=True)
        expiry_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", input_formats=['%Y-%m-%d', 'iso-8601'])        
        subcategory_id=serializers.IntegerField(required=True)
        current_trending_status=serializers.BooleanField(required=False)
        product_image=serializers.CharField(required=False)
        product_img=serializers.ImageField(required=False)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addproduct=add_product(**serializer.validated_data)
        return Response({'data':addproduct},status=status.HTTP_201_CREATED)
    

@authentication_classes([])
@permission_classes([])
class FetchAllProduct(APIView):
    def get(self,request):
        data=fetch_all_product()
        return Response({"data":data},status=status.HTTP_202_ACCEPTED)    
 
@authentication_classes([])
@permission_classes([])
class FetchOneProduct(APIView): 
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=fetch_one_product(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_202_ACCEPTED)

@authentication_classes([])
@permission_classes([])
class UpdateProduct(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        name=serializers.CharField(required=False)
        tamil_name=serializers.CharField(required=False)
        product_image=serializers.CharField(required=False)
        product_img=serializers.ImageField(required=False)
        description=serializers.CharField(required=False)
        price=serializers.FloatField(required=False)
        weight=serializers.FloatField(required=False)
        unit=serializers.CharField(required=False)
        stock=serializers.IntegerField(required=False)
        expiry_date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", input_formats=['%Y-%m-%d', 'iso-8601'],required=False)        
        subcategory_id=serializers.IntegerField(required=False)
        status=serializers.BooleanField(required=False)
        current_trending_status=serializers.BooleanField(required=False)
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        print('view1')
        updateproduct=update_product(**serializer.validated_data)
        print('view2')
        return Response({'data':updateproduct},status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class DeleteProduct(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=delete_product(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_200_OK)
    

@authentication_classes([])
@permission_classes([])        
class AddCategory(APIView):
    class InputSerializers(serializers.Serializer):
        name=serializers.CharField(required=True)
        description=serializers.CharField(required=True)
        status=serializers.BooleanField(required=True)
        category_image=serializers.ImageField(required=False)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addcategory=add_category(**serializer.validated_data)   #,request.user
        return Response({'data':addcategory},status=status.HTTP_201_CREATED)


@authentication_classes([])
@permission_classes([]) 
class FetchAllCategory(APIView):

    def get(self,request):
        data=fetch_all_category()
        print(data)
        return Response({'data':data},status=status.HTTP_202_ACCEPTED)            
    
@authentication_classes([])
@permission_classes([]) 
class FetchOneCategory(APIView): 
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=fetch_one_category(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_202_ACCEPTED)


@authentication_classes([])
@permission_classes([])  
class UpdateCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        name=serializers.CharField(required=False)
        description=serializers.CharField(required=False)
        status=serializers.BooleanField(required=False)
        category_img=serializers.ImageField(required=False)
    
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=update_category(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])    
class DeleteCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=delete_category(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_200_OK)
    
    
    
@authentication_classes([])
@permission_classes([])
class AddSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        name=serializers.CharField(required=True)
        description=serializers.CharField(required=True)
        category_id=serializers.IntegerField(required=True)
        status=serializers.BooleanField(required=True)
        subcategory_img=serializers.ImageField(required=False)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        addcategory=add_sub_category(**serializer.validated_data)   #,request.user
        return Response({'data':addcategory},status=status.HTTP_201_CREATED)


@authentication_classes([])
@permission_classes([]) 
class FetchAllSubCategory(APIView):

    def get(self,request):
        print('v1')
        data=fetch_all_subcategory()
        print('v2')
        return Response({'data':data},status=status.HTTP_202_ACCEPTED)            
    
@authentication_classes([])
@permission_classes([]) 
class FetchOneSubCategory(APIView): 
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=fetch_one_subcategory(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_202_ACCEPTED)


@authentication_classes([])
@permission_classes([]) 
class UpdateSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        name=serializers.CharField(required=False)
        description=serializers.CharField(required=False)
        status=serializers.BooleanField(required=False)
        category_id=serializers.IntegerField(required=False)
        subcategory_img=serializers.ImageField(required=False)
        
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=update_subcategory(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_200_OK)
    
@authentication_classes([])
@permission_classes([])     
class DeleteSubCategory(APIView):
    class InputSerializers(serializers.Serializer):
        id=serializers.IntegerField(required=True)
        
    def post(self,request):
        serializer=self.InputSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        data=delete_subcategory(**serializer.validated_data)
        return Response({'data':data},status=status.HTTP_200_OK)