from rest_framework.exceptions import APIException
from adm.models.category import Category,SubCategory
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def fetch_all_category():
    try:
        categories=Category.objects.filter(is_active=True).order_by('id')

        final_data=[]

        for item in categories:
            # image_path = item.category_img.name
            # clean_path = image_path.replace('media/', '')
            # print(clean_path)
            # print(type(clean_path))
            final_data.append({
                "id": item.id,
                "name": item.name,
                "description": item.description,
                 
                "image": (f"{settings.CLOUD_FRONT_URL}{item.category_img.name.replace('media/', '')}") if item.category_img else None
            })
            
        print("final_data",final_data)
        logger.info("final_data",final_data)
        return final_data
    except Exception as e:
        raise APIException(e)
    

def fetch_sub_category(data):
    category_id=data.get('category_id')
    categories=SubCategory.objects.filter(category_id=category_id,is_active = True)
    return [{
        "id":i.id,
        "name":i.name,
        "category_id":i.category_id
    }for i in categories]
