from rest_framework.exceptions import APIException
from adm.models.products import Product
from django.conf import settings


def fetch_product_details(data):
    try:
        product = Product.objects.filter(id=data.get('product_id')).first()

        if not product:
            return {"error": "Product not found"}

        product_data = {
            "id": product.id,
            "name": product.name,
            "tamil_name":product.tamil_name,
            "description": product.description,
            "price": product.price,
            "weight": product.weight,
            "unit":product.unit,
            "image": (f"{settings.CLOUD_FRONT_URL}{product.product_img.name.replace('media/', '')}") if product.product_img else None
        }

        # print(product_data)
        
        return product_data

    except Exception as e:
        raise APIException(str(e))
