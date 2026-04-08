from rest_framework.exceptions import APIException
from ..models.wishlist import *
from adm.models.customer_profile import CustomerProfile
from django.conf import settings

def add_and_remove_wishlist(**data):
    try:
        user_id = data.get('user_id')
        product_id = data.get('product_id')

        customer=CustomerProfile.objects.filter(user_id=user_id).first()

        if not customer:
            return "Customer profile not found."

        wishlist_item = Wishlist.objects.filter(user=customer, product_id=product_id).first()

        if wishlist_item:
            wishlist_item.save_delete(user_id=user_id)
            return "Product removed from wishlist."
        else:
            Wishlist.objects.create(
                user=customer,
                product_id=product_id,
            )
            return "Product added to wishlist."
    except Exception as e:
        raise APIException(str(e))
    

def delete_wishlist_item(**data):
    try:
        user_id=data.get('user_id')
        wishlist_id=data.get('wishlist_id')
        customer=CustomerProfile.objects.filter(user_id=user_id).first()

        if not customer:
            return "User Not Found."
        
        wishlist=Wishlist.objects.filter(id=wishlist_id,user=customer).first()

        if not wishlist:
            return "wishlist item not found."

        wishlist.save_delete(user_id=user_id)

        return f"Wishlist Item id {wishlist_id} removed."
    except Exception as e:
        raise APIException(e)


def fetch_wishlist(data):
    try:
        user_id = data.get('user_id')
        customer=CustomerProfile.objects.filter(user_id=user_id).first()

        if not customer:
            return "Customer Profile Not Found."

        wishlist_items = Wishlist.objects.filter(user=customer).select_related('product')
        
        if not wishlist_items.exists():
            return {"message": "Wishlist is empty"}

        final_data = []
        for item in wishlist_items:
            final_data.append({
                "wishlist_id": item.id,
                "product_id": item.product.id,
                "product_name": item.product.name,
                "image":   (f"{settings.CLOUD_FRONT_URL}{item.product.product_img.name.replace('media/', '')}") if item.product.product_img else None,
                "price": item.product.price,
                "weight": item.product.weight
            })
        return final_data
    except Exception as e:
        raise APIException(str(e))