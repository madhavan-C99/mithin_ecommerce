from django.urls import path
from .views.cart_views import *
from .views.order_views import *
from .views.wishlist_views import *
from .views.address_views import *
from .views.category_views import *
from .views.product_views import *
from .views.feedback_views import *

urlpatterns = [
    path('add_to_cart',AddtoCart.as_view()), #Add to cart 
    path('fetch_cart_items',FetchCartItems.as_view()), #Fetch all cart items
    path('update_item_quantity',UpdateCartQuantity.as_view()), # Update a cartitem quantity
    path('delete_one_item',DeleteCartitem.as_view()), #Delete a single cartitem 
    path('clear_cart',ClearCart.as_view()), # delete all cartitems in cart in a single time
    path('purchase_history',PurchaseHistory.as_view()), #Fetch all purchase history
    path('add_and_remove_wishlist',AddandRemoveWishlist.as_view()), #Add and remove items from wishlist
    path('delete_one_wishlist_item',RemoveOneWishItem.as_view()), # Remove one item in wishlist
    path('fetch_wishlist',FetchWishlist.as_view()), # Fetch all wishlist items 
    path('create_order',CreateOrder.as_view()), # Create a new order
    path('cancel_order',CancelOrder.as_view()), # Cancel the order
    path('add_address',AddAddress.as_view()),  #Add a new address for the user
    path('update_address',UpdateAddress.as_view()), #Update a existing address on address table
    path('delete_address',DeleteAddress.as_view()), #for delete a single address
    path('fetch_all_address',FetchAllAddress.as_view()), #Fetch all address
    path('fetch_one_address',FetchOneAddress.as_view()), #Fetch a single address
    path('fetch_all_categories',FetchAllCategory.as_view()), #Fetch all categories from the table
    path('fetch_sub_category',FetchSubCategory.as_view()), # Fetch sub category by category
    path('fetch_one_product',FetchProductDetails.as_view()), #Fetch a single product details
    path('default_address',DefaultAddress.as_view()), # Make an address to default
    path('fetch_default_address',FetchDefaultAddress.as_view()), # Fetch one default address 
    path('add_feedback',AddFeedback.as_view()), # Add a new feedback
    path('fetch_one_feedback',FetchOneFeedback.as_view()), # fetch a single product feedbacks
]