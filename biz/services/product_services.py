from rest_framework.exceptions import APIException
from adm.models.products import Product


def fetch_product_details(data):
    try:
        product = Product.objects.filter(id=data.get('product_id')).first()

        if not product:
            return {"error": "Product not found"}

        product_data = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "weight": product.weight,
            "image": product.image.url,
          }
        
        return {"product": product_data}

    except Exception as e:
        raise APIException(str(e))
