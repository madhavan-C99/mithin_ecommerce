from ..models import *
from rest_framework.exceptions import APIException
from ..services.collection_query_service import *
from django.utils import timezone
from ..tasks.trendtask import *
from .file_service import *
import logging
from django.conf import settings
from biz.tasks.tasks import send_price_update_task, send_stock_update_task


def get_select_options(**data):
    try:
        field = data.get('fields')
        values = exec_raw_sql(field, {})
        return values
    except Exception as e:
        raise APIException(e)


def add_product(user, **data):
    try:
        existing_product = Product.objects.filter(name=data.get('name')).first()
        if existing_product:
            return {
                "status": "error",
                "message": "Product with this name already exists"
            }

        new_product = Product.objects.create(
            name=data.get('name'),
            tamil_name=data.get('tamil_name'),
            weight=data.get('weight'),
            unit=data.get('unit'),
            is_active=data.get('is_active'),
            description=data.get('description'),
            price=data.get('price'),
            stock=data.get('stock'),
            subcategory_id=data.get('subcategory_id'),
            category_id=data.get('category_id'),
            expiry_date=data.get('expiry_date'),
            product_img=data['product_img'],
            created_by= user  ,       
            updated_by= user           
        )

        trending_status = data.get('current_trending_status')
        if trending_status is True:
            TrendingProduct.objects.create(
                product_id=new_product.id,
                subcategory_id=data.get('subcategory_id'),
                current_trending_status=trending_status
            )
            trending_product()

        fetch_all_product_task()

        return {
            "status": "success",
            "message": f"{new_product.name} Product Added Successfully."
        }

    except Exception as e:
        raise APIException(e)


def fetch_all_product():
    try:
        product = exec_raw_sql('D_FETCH_ALL_PRODUCTS', {})

        product_data = []
        for p in product:
            product_data.append({
                "s_no": p["s_no"],
                "id": p["id"],
                "name": p["name"],
                "tamil_name": p["tamil_name"],
                "description": p["description"],
                "product_img": (f"{settings.CLOUD_FRONT_URL}{p['product_img'][6:]}" if p["product_img"] else None),
                "price": p["price"],
                "weight": p["weight"],
                "unit": p["unit"],
                "stock": p["stock"],
                "status": p["status"],
                "expiry_date": p["expiry_date"],
                "subcategory": p["subname"],
                "category": p["category_name"],
                "current_trending_status": p["current_trending_status"]
            })

        fetch_all_product_task()
        return product_data
    except Exception as e:
        raise APIException(e)


def fetch_one_product(**data):
    try:
        product_list = exec_raw_sql('D_FETCH_ONE_PRODUCTS', {"id": data.get('id')})
        if not product_list:
            raise APIException("Product not found with the given ID")

        product_data = []
        for p in product_list:
            product_data.append({
                "s_no": p["s_no"],
                "id": p["id"],
                "name": p["name"],
                "tamil_name": p["tamil_name"],
                "description": p["description"],
                "product_img": (f"{settings.CLOUD_FRONT_URL}{p['product_img'][6:]}" if p["product_img"] else None),
    
                "price": p["price"],
                "weight": p["weight"],
                "unit": p["unit"],
                "stock": p["stock"],
                "status": p["status"],
                "expiry_date": p["expiry_date"],
                "subcategory": p["subname"],
                "category": p["category_name"],
                "current_trending_status": p["current_trending_status"]
            })

        return product_data
    except Exception as e:
        raise APIException(e)


def update_product(user, **data):     
    try:
        updt_product = Product.objects.filter(id=data.get('id')).first()
        price_changed=False
        stock_changed=False
        
        if updt_product is None:
            return "Product Not Found"

        if data.get('name'):
            updt_product.name = data.get('name')

        if data.get('tamil_name'):
            updt_product.tamil_name = data.get('tamil_name')

        if data.get('description'):
            updt_product.description = data.get('description')

        if data.get('weight'):
            updt_product.weight = data.get('weight')

        if data.get('price'):
            old_price=updt_product.price 
            new_price= data.get('price')
            if old_price!=new_price:
                price_changed=True
            updt_product.price=new_price


        if data.get('expiry_date'):
            updt_product.expiry_date = data.get('expiry_date')

        if data.get('subcategory_id'):
            updt_product.subcategory_id = data.get('subcategory_id')

        if data.get('category_id'):
            updt_product.category_id = data.get('category_id')

        if data.get('stock'):
            old_stock=updt_product.stock 
            new_stock= data.get('stock')
            if old_stock!=new_stock:
                stock_changed=True
            updt_product.stock=new_stock

        if data.get("status") is not None:
            updt_product.is_active = data.get("status")

        if data.get("unit"):
            updt_product.unit = data.get("unit")

        if data.get("product_img"):
            updt_product.product_img = data.get("product_img")

        updt_product.updated_by =  user      
        updt_product.save()

        if price_changed:
            send_price_update_task(data.get("id"), data.get("price"))  

        if stock_changed:
            send_stock_update_task(data.get('id'), data.get("stock"))
            

        if updt_product.stock < 10:
            Notification.objects.create(
                title="Low Stock",
                message=f"{updt_product.name} is low stock",
                product=updt_product,
                created_by="system",
                updated_by="system"
            )
            notification_task()

        trending_status = data.get('current_trending_status')

        if trending_status is not None:
            trending = TrendingProduct.objects.filter(product_id=data.get('id')).first()

            if trending:
                trending.current_trending_status = trending_status
                trending.save()
                try:
                    trending_product()
                except Exception as e:
                    raise APIException(e)
            else:
                if trending_status == True:
                    TrendingProduct.objects.create(
                        product_id=data.get('id'),
                        subcategory_id=updt_product.subcategory_id,
                        current_trending_status=trending_status
                    )
                    try:
                        trending_product()
                    except Exception as e:
                        raise APIException(e)

        fetch_all_product_task()
        return f"{updt_product.name} Product Updated Successfully."

    except Exception as e:
        raise APIException(detail=str(e))


def delete_product(user, **data):     
    try:
        # print(1)
        product = Product.objects.filter(id=data.get('id')).first()
        if not product:
            return "Product Not Found"
        # print(2)
        name = product.name
        # print(3)
        product.save_delete(user_id=user.id) 
        # print(4)
        # logger.info(5)
        fetch_all_product_task()
        return f"{name} Deleted Successfully"
    except Exception as e:
        raise APIException (str(e))


def add_category(user, **data):       
    try:
        category = Category.objects.create(
            name=data.get('name'),
            description=data.get('description'),
            is_active=data.get('status'),
            category_img=data.get('category_img'),
            created_by= user ,           
            updated_by= user               
        )
        return f"{category.name} Category Added Successfully."
    except Exception as e:
        raise APIException(e)


def fetch_all_category():
    try:
        data = exec_raw_sql('D_FETCH_ALL_CATEGORY', {})
        category = []
        for c in data:
            category.append({
                "s_no": c["s_no"],
                "id": c['id'],
                "name": c['name'],
                "description": c['description'],
                "status": c['is_active'],
                "category_img": (f"{settings.CLOUD_FRONT_URL}{c['category_img'][6:]}" if c["category_img"] else None),
            })
        return category
    except Exception as e:
        raise APIException(e)


def fetch_one_category(**data):
    try:
        categorys = exec_raw_sql('D_FETCH_ONE_CATEGORY', {"id": data.get('id')})
        if not categorys:
            raise APIException("category is not found")
        category = []
        for c in categorys:
            category.append({
                "id": c['id'],
                "name": c['name'],
                "description": c['description'],
                "status": c['is_active'],
                "category_img": (f"{settings.CLOUD_FRONT_URL}{c['category_img'][6:]}" if c["category_img"] else None),
            })
        return category
    except Exception as e:
        raise APIException(e)


def update_category(user, **data):    
    try:
        categorys = Category.objects.filter(id=data.get('id')).first()

        if categorys is not None:
            categorys.name = data.get('name')
            categorys.description = data.get('description')
            categorys.is_active = data.get("status")
            categorys.updated_at = timezone.now()
            categorys.updated_by =  user       
            if data.get("category_img"):
                categorys.category_img = data.get("category_img")
            categorys.save()

        return f"{categorys.name} updated successfully"
    except Exception as e:
        raise APIException(e)


def delete_category(user, **data):     
    try:
        category = Category.objects.filter(id=data.get('id')).first()
        if not category:
            return "Category Not Found"
        name = category.name
        category.save_delete(user_id=user.id)
        return f"{name} Deleted Successfully"
    except Exception as e:
        raise APIException(e)


def add_sub_category(user, **data):   
    try:
        category = SubCategory.objects.create(
            name=data.get('name'),
            category_id=data.get('category_id'),
            description=data.get('description'),
            is_active=data.get('status'),
            created_by= user  ,           
            updated_by= user              
        )
        return f"{category.name} subCategory Added Successfully."
    except Exception as e:
        raise APIException(e)


def fetch_all_subcategory():
    try:
        data = exec_raw_sql('D_FETCH_ALL_SUBCATEGORY', {})
        category = []
        for c in data:
            category.append({
                "s_no": c["s_no"],
                "id": c['id'],
                "name": c['name'],
                "category_name": c['category_name'],
                "description": c['description'],
                "status": c['is_active'],
            })
        return category
    except Exception as e:
        raise APIException(e)


def fetch_one_subcategory(**data):
    try:
        categorys = exec_raw_sql('D_FETCH_ONE_SUBCATEGORY', {"id": data.get('id')})
        if not categorys:
            raise APIException("category is not found")
        category = categorys[0]
        return category
    except Exception as e:
        raise APIException(e)


def update_subcategory(user, **data): 
    try:
        categorys = SubCategory.objects.filter(id=data.get('id')).first()

        if categorys is not None:
            categorys.name = data.get('name')
            categorys.category_id = data.get("category_id")
            categorys.description = data.get('description')
            categorys.is_active = data.get("status")
            categorys.updated_at = timezone.now()
            categorys.updated_by = user
            categorys.save()

        return f"{categorys.name} category Updated Successfully"
    except Exception as e:
        raise APIException(e)


def delete_subcategory(user, **data):  
    try:
        category = SubCategory.objects.filter(id=data.get('id')).first()
        if not category:
            return "SubCategory Not Found"
        name = category.name
        category.save_delete(user_id=user.id)
        return f"{name} Deleted Successfully"
    except Exception as e:
        raise APIException (str(e))