from ..models.cart import *
from ..models.cart_items import *
from adm.models.customer_profile import CustomerProfile
from django.db.models import Sum
from rest_framework.exceptions import APIException
from django.db import transaction
from decimal import Decimal
from django.conf import settings
import requests
from decimal import Decimal


def add_to_cart(**data): 
    try:
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        qty = int(data.get('quantity', 1))

        user=CustomerProfile.objects.filter(user__id=user_id).first()

        product = Product.objects.get(id=product_id)
        
        if product.stock <= 0:
            return "Sorry, Product is Out of Stock."
        
        if product.stock < qty:
            return f"Only {product.stock} items left in stock."

        cart_data, created = Cart.objects.get_or_create(
            user_id=user.id, 
            is_ordered=False, 
            defaults={'total_price': 0}
        )

        # Item already irukka nu check panroam
        existing_item = CartItems.objects.filter(cart=cart_data, product_id=product_id).exists()

        if existing_item:
            return "Item already in cart."
        
        
        # Pudusa create panroam
        new_item=CartItems.objects.create(
            cart=cart_data,
            product_id=product_id,
            unit_price=data.get('unit_price'),
            quantity=qty,
            weight=data.get('weight'),
            total_price=data.get('total_price')
        )

        # Cart grand total update
        all_items = CartItems.objects.filter(cart=cart_data)
        cart_data.total_price = sum(item.total_price for item in all_items)
        cart_data.save()

        return {'message':"Item Added to Cart Successfully.",
                'cart_item_id':new_item.id}
    except Exception as e:
        raise APIException(str(e))
    

def fetch_cart_items(data):
    try:
        user_id=data.get('user_id')
        user=CustomerProfile.objects.filter(user_id=user_id).first()
        products=Cart.objects.filter(user_id=user.id, is_ordered=False).first()

        if not products:
            return "No Products on your Cart"
        
        cart_items=products.items.all()
        item_list=[]
        for item in cart_items:
            item_list.append({
                "cart_item_id": item.id,
                "product_id": item.product.id,
                "product_name": item.product.name,
                "image": (f'{settings.SITE_URL}{settings.MEDIA_URL}{item.product.product_img}') if item.product.product_img else None,
                "weight": item.weight,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "total_price": item.total_price # Individul item total
            })

        return {
            "cart_id": products.id,
            "grand_total": products.total_price,
            "items": item_list
        }
    except Exception as e:
        raise APIException(e)
    

def update_cart_item(**data):
    try:
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        new_quantity=int(data.get('quantity'))
        new_total_price=data.get('total_price')

        with transaction.atomic():
            user=CustomerProfile.objects.filter(user_id=user_id).first()
            cart = Cart.objects.filter(user_id=user.id, is_ordered=False).first()
            if not cart: 
                return "Cart not found"

            cart_item = CartItems.objects.filter(cart=cart, product_id=product_id).first()
            if not cart_item: 
                return "Product not found"
            
            if new_quantity <= 0:
                cart_item.save_delete(user_id=user_id)
                message = f"Product {product_id} removed from cart."
            
            else:           
                cart_item.quantity=new_quantity
                total = Decimal(str(cart_item.unit_price)) * Decimal(str(cart_item.weight)) * Decimal(str(new_quantity))
                cart_item.total_price=total 
                cart_item.save()
                message = f"Product {product_id} updated successfully."

            fin_total_price=CartItems.objects.filter(cart=cart).aggregate(total=Sum('total_price'))
            cart.total_price=fin_total_price['total'] if fin_total_price['total'] is not None else 0
            cart.save()

            return message

    except Exception as e:
        raise APIException(str(e))



def delete_cart_item(**data):
    try:
        cart_item_id = data.get('cart_item_id')
        user_id=data.get('user_id')

        user=CustomerProfile.objects.filter(user_id=user_id).first()
        
        cart_item = CartItems.objects.filter(id=cart_item_id, cart__user=user.id).first()
        
        if not cart_item:
            return "Item not found in your cart"
        
        cart = cart_item.cart
        cart_item.save_delete(user_id=user_id)

        remaining_items = CartItems.objects.filter(cart=cart)
                                                             
        if remaining_items.exists():
            cart.total_price = sum(item.total_price for item in remaining_items)
            cart.save()
            return "Item deleted and cart updated"
        else:
            cart.save_delete(user_id=user_id)
            return "Item deleted and cart removed"

    except Exception as e:
        raise APIException(str(e))


def clear_user_cart(**data):
    try:
        user_id = data.get('user_id')

        user=CustomerProfile.objects.filter(user_id=user_id).first()
        
        cart = Cart.objects.filter(user_id=user.id, is_ordered=False).first()
        
        if not cart:
            return "No active cart found"
        
        cart_items=cart.items.all()
        for item in cart_items:
            item.save_delete(user_id=user_id)
            
        cart.save_delete(user_id=user_id)
        
        return "Cart and all items cleared successfully"
        
    except Exception as e:
        raise APIException(str(e))
    
