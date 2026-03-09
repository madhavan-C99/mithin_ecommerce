from rest_framework.exceptions import APIException
from ..models.wishlist import *

def add_and_remove_wishlist(**data):
    try:
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        weight = data.get('weight')

        wishlist_item = Wishlist.objects.filter(user_id=user_id, product_id=product_id).first()

        if wishlist_item:
            wishlist_item.delete()
            return "Product removed from wishlist."
        else:
            Wishlist.objects.create(
                user_id=user_id,
                product_id=product_id,
                weight=weight
            )
            return "Product added to wishlist."
    except Exception as e:
        raise APIException(str(e))

def fetch_wishlist(data):
    try:
        user_id = data.get('user_id')
        wishlist_items = Wishlist.objects.filter(user_id=user_id).select_related('product')
        
        if not wishlist_items.exists():
            return {"message": "Wishlist is empty"}

        final_data = []
        for item in wishlist_items:
            final_data.append({
                "wishlist_id": item.id,
                "product_id": item.product.id,
                "product_name": item.product.name,
                "image": item.product.image.url,
                "price": item.product.price,
                "weight": item.weight
            })
        return {"items": final_data}
    except Exception as e:
        raise APIException(str(e))