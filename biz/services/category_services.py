from rest_framework.exceptions import APIException
from adm.models.category import Category,SubCategory
from django.conf import settings


def fetch_all_category():
    try:
        categories=Category.objects.all().order_by('id')

        final_data=[]

        for item in categories:
            final_data.append({
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "image": (f'{settings.SITE_URL}{settings.MEDIA_URL}{item.category_img}') if item.category_img else None
            })
        return final_data
    except Exception as e:
        raise APIException(e)
    

def fetch_sub_category(data):
    category_id=data.get('category_id')
    categories=SubCategory.objects.filter(category_id=category_id)
    return [{
        "id":i.id,
        "name":i.name,
        "category_id":i.category_id
    }for i in categories]
