from rest_framework.exceptions import APIException
from adm.models.category import Category

def fetch_all_category():
    try:
        categories=Category.objects.all()

        final_data=[]

        for item in categories:
            a={
                "id":item.id,
                "name":item.name,
                "description":item.description
            }
            final_data.append(a)
        return final_data
    except Exception as e:
        raise APIException(e)
