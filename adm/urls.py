from django.contrib import admin
from django.urls import path
from .views.user_views import * 
from .views.otp_verified_views import *
from .views.auth_views import *
from .views.file_views import *
from .views.admin_views import *
from .views.customer_views import * 
from .views.products_views import *
from .views.collection_query_views import *
from .views.location_views import *
from .views import CreateToken
from .views.dashborad_views import *
from .views.order_management_views import *
from .views.transaction_views import *

urlpatterns = [
    path('create_token',CreateToken.as_view()),
    # path('create_user',CreateUser.as_view()),
    path('create_role',CreateRole.as_view()),
    path('create_perm',CreatePerm.as_view()),
    path('add_perm_role',AddPermissionRole.as_view()),
    path('fetch_all_customer_data',FetchAllCustomerData.as_view()), # for fetch all customers to admin
    path('fetch_all_users',FetchallUsers.as_view()), # Fetch all customers and admins
    path('admin_email_verification',EmailVerification.as_view()), # for login authentication for admin users
    path('upload_file',UploadFile.as_view()),
    path('get_file',GetFile.as_view()),
    path('add_collection_query',AddCollectionQuery.as_view()),
    path('generate_otp',GenerateOtpView.as_view()),  # for generating otp for user
    path('verify_otp',VerifyOtpView.as_view()), # for verifying the entered otp
    path('create_customer',CreateCustomer.as_view()),  # create a new customer 
    path('update_customer_profile',UpdateCustomerProfile.as_view()), # Update the customer profile details
    path('create_new_admin_user',CreateAdminProfile.as_view()), # create a new admin user
    path('fetch_all_admin',FetchAllAdmin.as_view()), # Fetch All admin
    path('change_customer_status',CustomerOneActiveStatus.as_view()), # change the customer is_active status
    path('fetch_one_customer_data',FetchOneCustomerProfile.as_view()), # fetch a single customer profile data
    path('find_customer_distance',FindCustomerDistance.as_view()), #Find the customers distance from store
    path('get_address',GetAddress.as_view()), # Get address from lat and long

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

    path('top_revenue_report',TopCardsReport.as_view()),
    path('top_sales_product',TopSalesProduct.as_view()),
    path('piechart_subcategory',PiechartSubategory.as_view()),
    path('category_revenue_chart',CategoryRevenueChart.as_view()),
    path('sales_graph',SalesChart.as_view()),

    path('order_top_tile',OrderTopTile.as_view()),
    path('fetch_one_order',FetchOneOrderDetails.as_view()),
    path('order_status_update',OrderStatusUpdate.as_view()),

    path('read_notification',ReadNotification.as_view()),
    path('create_order_payment',CreateOrderPayment.as_view()),
    path('order_payment_verify',OrderPaymentVerify.as_view()),
   
]
