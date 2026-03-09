from ..models.cart import *
from ..models.cart_items import *
from rest_framework.exceptions import APIException


def add_to_cart(**data):
    try:
        user=data.get('user_id')
        product_id=data.get('product_id')
        qty=int(data.get('quantity',1))

        #We check if the product is already in the user's cart. If not, we create it.
        cart_data, created=Cart.objects.get_or_create(user_id=user,is_ordered=False,defaults={'total_price': 0})

        #fetch existing data 
        cart_item=CartItems.objects.filter(cart=cart_data,product_id=product_id).first()

        #update product quantity or Add products on cartitems 
        if cart_item:
            cart_item.quantity += qty
            cart_item.total_price=cart_item.quantity * cart_item.unit_price
            cart_item.save()
            msg="Cart item quantity Updated."
        else:
            CartItems.objects.create(
                cart=cart_data,
                product_id=product_id,
                unit_price=data.get('unit_price'),
                quantity=qty,
                weight=data.get('weight'),
                total_price=data.get('total_price')
            )
            msg="Item Added to Cart Successfully."

        #update the total price on cart table if the product count update.
        all_items=CartItems.objects.filter(cart=cart_data)
        cart_data.total_price=sum(item.total_price for item in all_items)
        cart_data.save()

        return msg
    except Exception as e:
        raise APIException(e)
    

def fetch_cart_items(data):
    try:
        products=Cart.objects.filter(user_id=data.get('id'), is_ordered=False).first()

        if not products:
            return "No Products on your Cart"
        
        cart_items=products.items.all()
        item_list=[]

        for item in cart_items:
            item_list.append({
                "cart_item_id": item.id,
                "product_id": item.product.id,
                "product_name": item.product.name,
                "image": item.product.image.url,
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
    
def update_or_delete_cart_item(**data):
    try:
        user_id = data.get('user_id')
        product_id = data.get('product_id')

        cart = Cart.objects.filter(user_id=user_id, is_ordered=False).first()

        if not cart:
            return "Cart not found"

        cart_item = CartItems.objects.filter(cart=cart, product_id=product_id).first()

        if not cart_item:
            return "Product not found in cart"

        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.total_price = cart_item.quantity * cart_item.unit_price
            cart_item.save()
            message = "Quantity decreased"
        else:
            cart_item.delete()
            message = "Product removed from cart"

        remaining_items = CartItems.objects.filter(cart=cart)

        if remaining_items.exists():
            cart.total_price = sum(item.total_price for item in remaining_items)
            cart.save()
        else:
            cart.delete()
            message = "Cart is empty and deleted"

        return message

    except Exception as e:
        raise APIException(str(e))


def delete_cart_item(**data):
    try:
        item_id = data.get('cart_item_id')
        user_id=data.get('user_id')
        
        cart_item = CartItems.objects.filter(id=item_id, cart__user=user_id).first()
        
        if not cart_item:
            return "Item not found in your cart"
        
        cart = cart_item.cart
        cart_item.delete()

        remaining_items = CartItems.objects.filter(cart=cart)
        
        if remaining_items.exists():
            cart.total_price = sum(item.total_price for item in remaining_items)
            cart.save()
            return "Item deleted and cart updated"
        else:
            cart.delete()
            return "Item deleted and cart removed"

    except Exception as e:
        raise APIException(str(e))


def clear_user_cart(**data):
    try:
        user_id = data.get('user_id')
        
        cart = Cart.objects.filter(user_id=user_id, is_ordered=False).first()
        
        if not cart:
            return "No active cart found"
        
        cart.items.all().delete()
        cart.delete()
        
        return "Cart and all items cleared successfully"
        
    except Exception as e:
        raise APIException(str(e))
    
