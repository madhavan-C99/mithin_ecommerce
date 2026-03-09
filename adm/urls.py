from django.contrib import admin
from django.urls import path
from .views.auth_views import *
from .views.user_views import * 
from .views.otp_verified_views import *
from .views.file_views import *
from .views.customer_views import * 
from .views.products_views import *
from .views.collection_query_views import *
from .views.dashborad_views import *
from .views.order_management_views import *


urlpatterns = [
    path('admin_', admin.site.urls),
    path('create_token',CreateToken.as_view()),
    path('create_user',CreateUser.as_view()),
    path('create_role',CreateRole.as_view()),
    path('create_perm',CreatePerm.as_view()),
    path('fetch_all_customer_data',FetchAllCustomerData.as_view()),
    path('email_verification',EmailVerification.as_view()),
    path('upload_file',UploadFile.as_view()),
    path('get_file',GetFile.as_view()),
    path('add_collection_query',AddCollectionQuery.as_view()),
    # customer_creation
    path('create_customer',CreateCustomer.as_view()),

   
    #admin crud

    path('create_product',AddProduct.as_view()),
    path('fetch_all_product',FetchAllProduct.as_view()),  
    path('fetch_one_product',FetchOneProduct.as_view()),   
    path('update_product',UpdateProduct.as_view()),
    path('delete_product',DeleteProduct.as_view()),
    path('create_category',AddCategory.as_view()),
    path('fetch_all_category',FetchAllCategory.as_view()),
    path('fetch_one_category',FetchOneCategory.as_view()),
    path('update_category',UpdateCategory.as_view()),
    path('delete_category',DeleteCategory.as_view()),
    path('create_subcategory',AddSubCategory.as_view()),
    path('fetch_all_subcategory',FetchAllSubCategory.as_view()),
    path('fetch_one_subcategory',FetchOneSubCategory.as_view()),
    path('update_subcategory',UpdateSubCategory.as_view()),
    path('delete_subcategory',DeleteSubCategory.as_view()),
    
    path('get_select_options',GetSelectOption.as_view()),        #dropdown select option in query key 

    path('add_details',AddDetails.as_view()),
    path('top_revenue_report',TopCardsReport.as_view()),
    path('top_sales_product',TopSalesProduct.as_view()),
    path('piechart_subcategory',PiechartSubategory.as_view()),
    path('category_revenue_chart',CategoryRevenueChart.as_view()),
    path('sales_graph',SalesChart.as_view()),
    
    
    path('order_top_tile',OrderTopTile.as_view()),
    path('fetch_one_order',FetchOneOrderDetails.as_view()),
    path('order_status_update',OrderStatusUpdate.as_view())















]
