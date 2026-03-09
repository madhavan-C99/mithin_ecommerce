from ..models import *
from rest_framework.exceptions import APIException
from ..services.collection_query_service import *
from django.utils import timezone
from ..tasks.trendtask import *
from .file_service import *
import logging
from django.conf import settings



def add_details():
    try:
        for cate in categories_data:
            data=Category.objects.create(
                                            name=cate['name'],
                                            description=cate['description'],
                                            is_active=cate['status'],
           )
        
        # for sc in fruit_categories:
        #     data=SubCategory.objects.create(name=sc['name'],
        #                                     description=sc['description'],
        #                                     is_active=sc['is_active'],
        #                                     category_id=sc['category_id'])
        #     print(sc['name'])
        
        # for freshfruit in fresh_fruits_products:
        #     data=Product.objects.create(
        #                                    name=freshfruit['name'],
        #                                    tamil_name=freshfruit['tamil_name'],
        #                                    description=freshfruit['description'],
        #                                    is_active=freshfruit['is_active'],
        #                                    weight=freshfruit['weight'],
        #                                    trend_status=freshfruit['trend_status'],
        #                                    price=freshfruit['price'],
        #                                    stock=freshfruit['stock'],
        #                                    subcategory_id=freshfruit['subcategory_id'],
        #                                    expiry_date=freshfruit['expiry_date']
        #     )
            
        # for freshfruit in vegetables:
        #     data=Product.objects.create(
        #                                    name=freshfruit['name'],
        #                                    tamil_name=freshfruit['tamil_name'],
        #                                    description=freshfruit['description'],
        #                                    is_active=freshfruit['is_active'],
        #                                    weight=freshfruit['weight'],
        #                                    trend_status=freshfruit['trend_status'],
        #                                    price=freshfruit['price'],
        #                                    stock=freshfruit['stock'],
        #                                    subcategory_id=freshfruit['subcategory_id'],
        #                                    expiry_date=freshfruit['expiry_date']
           # )
        #     print('expiry',freshfruit['expiry_date'])
        return ('done')
    except Exception as e:
        raise APIException(e)


def get_select_options(**data):
    try:
        field=data.get('fields')
        values = exec_raw_sql(field, {})
        return values
    except Exception as e:
        raise APIException(e)



def add_product(**data):
    try:
        print(data)
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
                        expiry_date=data.get('expiry_date'),
                        product_img=data.get('product_img')
                        )
        # fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('product_image')).first()
        # logger.info("fl_upd",fl_upd)
        # if fl_upd is not None:
           
        #     disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
        #     dest_file_name = 'storage/product/product_snap/'
        #     fl_upd.storage_file_name = dest_file_name + disp_name
        #     fl_upd.save()
        #     new_product.product_image= fl_upd.storage_file_name
        #     print(1)
        #     move_tmp_file(fl_upd.id)

        trending_status=data.get('current_trending_status')
        if trending_status is not None:                                       
            if trending_status == True:
                trand=TrendingProduct.objects.create(
                        product_id=data.get('id'),
                        subcategory_id=data.get('subcategory_id'),
                        current_trending_status=data.get('current_trending_status')
                    )
                trending_product()
 
        
        fetch_all_product_task()
        
        return f"{new_product.name} Product Added Successfully."
    except Exception as e:
        raise APIException(e)




def fetch_all_product():
    try:
        product=exec_raw_sql('D_FETCH_ALL_PRODUCTS',{})
        
        product_data=[]
        for p in product:
            # print(p["product_img"])
            product_data.append({
                "s_no":p["s_no"],
                "id":p["id"],
                "name":p["name"],
                "tamil_name":p["tamil_name"],
                "description":p["description"],
                "product_image":p["product_image"],
                "product_img":(f"{settings.SITE_URL}{settings.MEDIA_URL}{p['product_img']}" if p["product_img"] else None),
                "price":p["price"],
                "weight":p["weight"],
                "unit":p["unit"],
                "stock":p["stock"],
                "status":p["status"],
                "expiry_date":p["expiry_date"],
                "subcategory":p["subname"],
                "current_trending_status":p["current_trending_status"]
                
                
            })
        
    
        fetch_all_product_task()
        
        return product_data
    except Exception as e:
        raise APIException(e)
    
def fetch_one_product(**data):
    try:
        product_list=exec_raw_sql('D_FETCH_ONE_PRODUCTS',{"id":data.get('id')})
        if not product_list:
            raise APIException("Product not found with the given ID")
     
        product_data=[]
        for p in product_list:
            # print(p["product_img"])
            product_data.append({
                "s_no":p["s_no"],
                "id":p["id"],
                "name":p["name"],
                "tamil_name":p["tamil_name"],
                "description":p["description"],
                "product_image":p["product_image"],
                "product_img":( f"{settings.SITE_URL}{settings.MEDIA_URL}{p['product_img']}" if p["product_img"] else None),
                "price":p["price"],
                "weight":p["weight"],
                "unit":p["unit"],
                "stock":p["stock"],
                "status":p["status"],
                "expiry_date":p["expiry_date"],
                "subcategory":p["subname"],
                "current_trending_status":p["current_trending_status"]
                
                
            })
        
        return product_data
    except Exception as e:
        raise APIException(e)   
    
def update_product(**data):
    try:
        print(1)
        updt_product=Product.objects.filter(id=data.get('id')).first()

            
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
            updt_product.price = data.get('price')
            
        if data.get('expiry_date'):
            updt_product.expiry_date = data.get('expiry_date')
            
        if data.get('subcategory_id'):
            updt_product.subcategory_id = data.get('subcategory_id')
            
        if data.get('stock'):
            updt_product.stock = data.get('stock')
            
        if data.get("status") is not None: # Boolean-ku 'is not None' use pannanum
            updt_product.is_active = data.get("status")

        if data.get("unit"):
            updt_product.unit=data.get("unit")
        
        if data.get("product_img"):
            updt_product.product_img=data.get("product_img")
        # updt_product.product_img=data["product_img"]
        updt_product.save()    
            
               
        trending_status=data.get('current_trending_status')
  
        if trending_status is not None:
        
            trending=TrendingProduct.objects.filter(product_id=data.get('id')).first()
         
          
            if trending:
                print(trending)
                trending.current_trending_status=trending_status
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
            
            
        fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('product_image')).first()

        if fl_upd is not None:
            
            disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
            dest_file_name = 'storage/product/product_snap/'
            fl_upd.storage_file_name = dest_file_name + disp_name
            fl_upd.save()
            updt_product.product_image= fl_upd.storage_file_name
            updt_product.save() 
        
            move_tmp_file(fl_upd.id)
                        
        fetch_all_product_task()
        
        return (f"{updt_product.name}Product Updated Successfully.")

    except Exception as e:
        raise APIException(detail=str(e))
 
 
def delete_product(**data):
    try:
        product=Product.objects.filter(id=data.get('id')).first()
        product.delete()
        fetch_all_product_task()
        return ("{product.name} Deleted Successfully")
    except Exception as e:
        raise APIException(e)   
    
    
    
def add_category(**data):
    try:
        category=Category.objects.create(name=data.get('name'),
                                         description=data.get('description'),
                                         is_active=data.get('status'),
                                         category_img=data['category_img']
                                        #  created_by=user
                                         )
        fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('category_image')).first()
        logger.info("fl_upd",fl_upd)
        if fl_upd is not None:
           
            disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
            dest_file_name = 'storage/category/category_snap/'
            fl_upd.storage_file_name = dest_file_name + disp_name
            fl_upd.save()
            category.category_image= fl_upd.storage_file_name
            category.save()
            move_tmp_file(fl_upd.id)
        
        return (f"{category.name} Category Added Successfully.")
    except Exception as e:
        raise APIException(e)


def fetch_all_category():
    try:
        data=exec_raw_sql('D_FETCH_ALL_CATEGORY',{})
        category=[]
        print(data)
        for c in data:
            category.append({
            "s_no":c["s_no"],
                "id":c['id'],
                "name":c['name'],
                "description":c['description'],
                "status":c['is_active'],
                "category_img":( f"{settings.SITE_URL}{settings.MEDIA_URL}{c['category_img']}" if c["category_img"] else None ),
            })
        

        return category
    except Exception as e:
        raise APIException(e)
    

def fetch_one_category(**data):
    try:
        categorys=exec_raw_sql('D_FETCH_ONE_CATEGORY',{"id":data.get('id')})
        if not categorys:
            raise APIException("category is not found ")
        category=[]
        
        for c in categorys:
            category.append({
                "id":c['id'],
                "name":c['name'],
                "description":c['description'],
                "status":c['is_active'],
                "category_img":(
                         f"{settings.SITE_URL}{settings.MEDIA_URL}{c['category_img']}" if c["category_img"] else None
                    ),
            })
        return category
    except Exception as e:
        raise APIException(e)   
    
        
    
def update_category(**data):
    try:
        categorys=Category.objects.filter(id=data.get('id')).first()
        
        if categorys is not None:
            #  return "Product Not Found"
       
            categorys.name=data.get('name')
            categorys.description=data.get('description')
            categorys.is_active=data.get("status")
            categorys.category_img=data['category_img']
            categorys.updated_at=timezone.now()
            categorys.save()
       
       
        fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('category_image')).first()
        logger.info("fl_upd",fl_upd)
        if fl_upd is not None:
           
            disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
            dest_file_name = 'storage/category/category_snap'
            fl_upd.storage_file_name = dest_file_name + disp_name
            fl_upd.save()
            categorys.category_image= fl_upd.storage_file_name
            categorys.save()
           
            move_tmp_file(fl_upd.id)       
        # if data.get("name") and data.get("name") != categorys.name:
            
        #     updated = True
        # if data.get("description") and data.get("description") != categorys.description:
            
        #     updated = True
        # incoming_status = data.get("status")
        # if incoming_status is not None:
    
        #     if incoming_status != categorys.is_active:
        #         categorys.is_active =incoming_status
        #         updated = True      
        # if updated:
        #      #  updated_by=user
        #     categorys.updated_at=timezone.now()
        #     categorys.save()
        #     return "category Updated Successfully"
        # else:
        #     return "No fields to provide update." 
        
        return (f"{categorys.name} updated successfully")
           
    except Exception as e:
        raise APIException(e)
    
    
def delete_category(**data):
    try:
        category=Category.objects.filter(id=data.get('id')).first()
        category.delete()
        
        return (f"{category.name} Deleted Successfully")
    except Exception as e:
        raise APIException(e)  
    
    
    
    
    
def add_sub_category(**data):
    try:
        category=SubCategory.objects.create(name=data.get('name'),
                                         category_id=data.get('category_id'),
                                         description=data.get('description'),
                                         is_active=data.get('status'),
                                        #  created_by=user
                                         )
        fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('subcategory_image')).first()
        logger.info("fl_upd",fl_upd)
        if fl_upd is not None:
           
            disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
            dest_file_name = 'storage/subcategory/subcategory_snap'
            fl_upd.storage_file_name = dest_file_name + disp_name
            fl_upd.save()
            category.subcategory_image= fl_upd.storage_file_name
            category.save()
            move_tmp_file(fl_upd.id)
        return (f"{category.name} subCategory Added Successfully.")
    except Exception as e:
        raise APIException(e)


def fetch_all_subcategory():
    try:
        data=exec_raw_sql('D_FETCH_ALL_SUBCATEGORY',{})
        category=[]
        print(data)
        for c in data:
            category.append({
               "s_no":c["s_no"],
                "id":c['id'],
                "name":c['name'],
                "category_name":c['category_name'],
                "description":c['description'],
                "status":c['is_active'],
                # "subcategory_img":(
                #     request.build_absolute_uri(
                #         settings.MEDIA_URL +c["subcategory_img"]
                #     ) if c["subcategory_img"] else None
                #     ),
            })
   
        return category
    except Exception as e:
        raise APIException(e)
    

def fetch_one_subcategory(**data):
    try:
       
        categorys=exec_raw_sql('D_FETCH_ONE_SUBCATEGORY',{"id":data.get('id')})
        if not categorys:
            raise APIException("category is not found ")
        category=categorys[0]
      
        return category
    except Exception as e:
        raise APIException(e)   
    
        
    
def update_subcategory(**data):
    try:
        categorys=SubCategory.objects.filter(id=data.get('id')).first()
    
        if categorys is not None:
            categorys.name=data.get('name')
            categorys.category_id =data.get("category_id")
            categorys.description=data.get('description')
            categorys.is_active=data.get("status")
            categorys.updated_at=timezone.now()
            categorys.save()
            
        fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('subcategory_image')).first()
        logger.info("fl_upd",fl_upd)
        if fl_upd is not None:
           
            disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
            dest_file_name = 'storage/subcategory/subcategory_snap'
            fl_upd.storage_file_name = dest_file_name + disp_name
            fl_upd.save()
            categorys.subcategory_image= fl_upd.storage_file_name
            categorys.save()
            move_tmp_file(fl_upd.id)
            
        # if data.get("name") and data.get("name") != categorys.name:
        #     categorys.name=data.get('name')
        #     print(categorys.name)
        #     updated = True
        # new_cat_id = int(data.get("category_id")) if data.get("category_id") else None
        # if new_cat_id and new_cat_id != categorys.category_id:
        #     categorys.category_id = new_cat_id
        #     updated = True
        # if data.get("description") and data.get("description") != categorys.description:
        #     categorys.description=data.get('description')
        #     updated = True
        
        # incoming_status = data.get("status")
        # if incoming_status is not None:
        #     # String-a Boolean-ah mathurathu
        #     bool_status = str(incoming_status).lower() == 'true'
        #     if bool_status != categorys.is_active:
        #         categorys.is_active = bool_status
        #         updated = True
        # if updated:
        #      #  updated_by=user
        #     categorys.updated_at=timezone.now()
        #     categorys.save()
        #     return "category Updated Successfully"
        # else:
        #     return "No fields to provide update." 
        
        return (f"{categorys.name} category Updated Successfully")
           
    except Exception as e:
        raise APIException(e)
    
    
def delete_subcategory(**data):
    try:
        category=SubCategory.objects.filter(id=data.get('id')).first()
        category.delete()
        
        return (f"{category.name} Deleted Successfully")
    except Exception as e:
        raise APIException(e)  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

fresh_fruits_products = [
    {
        "name": "Black Grapes ",
        "tamil_name": "கருப்பு திராட்சை ",
        "description": "Premium seedless black grapes known for their intense sweetness and juicy texture. These grapes are rich in antioxidants and vitamins, making them a perfect healthy snack or a great addition to your fruit salads.",
        "subcategory_id": 6, 
        "is_active": True,
        "weight": 500 ,
        "price": 90.00,
        "stock": 50,
        "expiry_date": "2026-02-20",
        "trend_status": False
    },
    {
        "name": "Green Grapes (Seedless)",
        "tamil_name": "பச்சை திராட்சை (விதை இல்லாதது)",
        "description": "Crispy and refreshing green seedless grapes with a perfect balance of sweet and tangy flavors. Sourced fresh from the finest vineyards, these grapes are ideal for quick snacking and boosting your daily energy naturally.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": 500,
        "price": 80.00,
        "stock": 60,
        "expiry_date": "2026-02-20",
        "trend_status": False
    },
    {
        "name": "Guava (Allahabad Safeda)",
        "tamil_name": "கொய்யாப்பழம் (அலகாபாத் சபதா)",
        "description": "The famous Allahabad Safeda guava known for its creamy white flesh and incredible aroma. These guavas are highly nutritious, rich in Vitamin C and fiber, providing a crunchy and sweet tropical experience in every bite.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 120.00,
        "stock": 40,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Muskmelon",
        "tamil_name": "முலாம் பழம்",
        "description": "A highly hydrating and refreshing muskmelon with a sweet, aromatic orange flesh. Perfect for summer days, this fruit is excellent for making fresh juices, smoothies, or enjoying as a chilled evening snack for natural hydration.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 60.00,
        "stock": 30,
        "expiry_date": "2026-02-21",
        "trend_status": False
    },
    {
        "name": "Nagpur Orange",
        "tamil_name": "நாக்பூர் ஆரஞ்சு",
        "description": "Authentic Nagpur oranges famous for their thin skin and incredibly juicy, sweet-tangy segments. These oranges are an excellent source of Vitamin C and immunity-boosting nutrients, making them a household favorite for fresh juices.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 150.00,
        "stock": 100,
        "expiry_date": "2026-02-25",
        "trend_status": False
    },
    {
        "name": "Papaya ",
        "tamil_name": "பப்பாளி பழம்",
        "description": "Sweet and perfectly ripened medium-sized papayas with a vibrant orange interior. Known for supporting healthy digestion and skin glow, these papayas are a nutrient-dense addition to your daily breakfast or fruit platter.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 50.00,
        "stock": 25,
        "expiry_date": "2026-02-19",
        "trend_status": False
    },
    {
        "name": "Pineapple (Giant Kew)",
        "tamil_name": "அன்னாசிப்பழம்",
        "description": "Large and juicy Giant Kew pineapples offering a tropical burst of sweet and tart flavors. These pineapples are hand-selected for quality and are perfect for desserts, fruit salads, or extracting fresh, enzyme-rich juice.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 85.00,
        "stock": 20,
        "expiry_date": "2026-02-24",
        "trend_status": False
    },
    {
        "name": "Pomegranate (Anar) ",
        "tamil_name": "மாதுளம் பழம்",
        "description": "Premium quality pomegranates filled with deep red, juicy, and sweet pearls. Recognized globally as a superfood, they are rich in iron and antioxidants, helping to improve blood health and overall vitality in every serving.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 220.00,
        "stock": 45,
        "expiry_date": "2026-03-01",
        "trend_status": False
    },
    {
        "name": "Robusta Banana",
        "tamil_name": "ரோபஸ்டா வாழைப்பழம்",
        "description": "Long, sweet, and creamy Robusta bananas that are perfect for an instant energy boost. These bananas are carefully handled to prevent bruising and are ideal for daily consumption, smoothies, or adding to your cereal bowl.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 40.00,
        "stock": 200,
        "expiry_date": "2026-02-19",
        "trend_status": False
    },
    {
        "name": "Royal Gala Apple",
        "tamil_name": "ரொயால் காலா ஆப்பிள்",
        "description": "World-class Royal Gala apples with a beautiful red-striped skin and a crisp, sweet flavor profile. These apples are perfect for snacking on the go or baking, providing a crunchy texture and essential dietary fibers for heart health.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 280.00,
        "stock": 70,
        "expiry_date": "2026-03-10",
        "trend_status": False
    },
    {
        "name": "Sapota (Chikoo)",
        "tamil_name": "சப்போட்டா பழம்",
        "description": "Deliciously sweet and grainy textured Sapotas, often called Chikoo, with a malty flavor similar to brown sugar. These energy-dense fruits are perfect for milkshakes or as a natural sweet treat after meals.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 70.00,
        "stock": 55,
        "expiry_date": "2026-02-21",
        "trend_status": False
    },
    {
        "name": "Shimla Apple",
        "tamil_name": "சிம்லா ஆப்பிள்",
        "description": "Classic Indian apples sourced directly from the orchards of Shimla, known for their firm texture and sweet-tart juice. These apples are naturally grown and packed with vitamins, making them a staple fruit for every Indian household.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 190.00,
        "stock": 80,
        "expiry_date": "2026-03-05",
        "trend_status": False
    },
    {
        "name": "Watermelon ",
        "tamil_name": "தர்பூசணி ",
        "description": "Sugar Baby watermelons are small, dark green melons with an incredibly sweet and deep red flesh. They are extremely juicy and hydrating, providing the perfect natural solution to stay cool and refreshed during warm weather.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 45.00,
        "stock": 40,
        "expiry_date": "2026-02-20",
        "trend_status": False
    },
    {
        "name": "Yelakki Banana",
        "tamil_name": "ஏலக்கி வாழைப்பழம்",
        "description": "Tiny, highly fragrant, and exceptionally sweet Yelakki bananas known for their unique aroma. Despite their small size, they are packed with nutrients and are a favorite for children and those who prefer a more intense banana flavor.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "500 gm",
        "price": 65.00,
        "stock": 150,
        "expiry_date": "2026-02-19",
        "trend_status": False
    },
   # exotic_fruits_products = [
    {
        "name": "Dragon Fruit ",
        "tamil_name": "அக்கினிப் பழம் ",
        "description": "Exotic white-fleshed Dragon Fruit with a mild sweetness and crunchy tiny seeds. This nutrient-dense superfood is rich in magnesium and iron, making it a perfect addition to healthy breakfast bowls and refreshing tropical salads.",
        "subcategory_id": 7, # Update with your Exotic Fruits subcategory ID
        "is_active": True,
        "weight": "500 gm",
        "price": 120.00,
        "stock": 30,
        "expiry_date": "2026-02-23",
        "trend_status": False
    },
    {
        "name": "Kiwi ",
        "tamil_name": "பசலிப் பழம் ",
        "description": "Zesty and vibrant green Kiwi fruits packed with more Vitamin C than oranges. These tangy delights are great for digestion and skin health, offering a unique flavor profile that elevates smoothies, fruit tarts, and daily healthy snacks.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 180.00,
        "stock": 45,
        "expiry_date": "2026-02-25",
        "trend_status": False
    },
    {
        "name": "Avocado (Hass)",
        "tamil_name": "வெண்ணெய் பழம்",
        "description": "Creamy and buttery Hass Avocados known for their rich heart-healthy fats and smooth texture. These premium fruits are a versatile superfood, ideal for making classic guacamole, spreading on morning toast, or adding a rich finish to fresh salads.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 350.00,
        "stock": 20,
        "expiry_date": "2026-02-21",
        "trend_status": False
    },
    {
        "name": "Mangosteen",
        "tamil_name": "மங்கொஸ்தான் பழம்",
        "description": "Referred to as the 'Queen of Fruits', Mangosteen offers a unique sweet and tangy white pulp inside a deep purple rind. It is celebrated for its potent antioxidant properties and exquisite tropical flavor that is both refreshing and highly nutritious.",
        "subcategory_id": 2,
        "is_active": True,
        "weight": "500 gm",
        "price": 450.00,
        "stock": 15,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Rambutan",
        "tamil_name": "ரம்புட்டான் பழம்",
        "description": "Hairy-skinned exotic Rambutans with a sweet, translucent, and juicy flesh similar to lychee. Sourced from tropical orchards, these fruits are rich in Vitamin C and copper, providing a delicious and exotic snacking experience for all fruit lovers.",
        "subcategory_id": 2,
        "is_active": True,
        "weight": "500 gm",
        "price": 250.00,
        "stock": 25,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Passion Fruit",
        "tamil_name": "கொடித்தோடை பழம்",
        "description": "Aromatic and intensely flavored Passion Fruits with a jelly-like pulp and crunchy seeds. Known for its incredible scent and vitamin-rich profile, it is the perfect ingredient for exotic juices, flavorful desserts, and topping for yogurt bowls.",
        "subcategory_id": 2,
        "is_active": True,
        "weight": "500 gm",
        "price": 160.00,
        "stock": 35,
        "expiry_date": "2026-02-24",
        "trend_status": False
    },
    {
        "name": "Blueberries ",
        "tamil_name": "அவுரிநெல்லி",
        "description": "Premium imported Blueberries that are tiny, sweet, and bursting with antioxidants. These super-berries are a perfect snack for improving brain health and immunity, and they add a delightful burst of flavor to cereals, pancakes, and smoothies.",
        "subcategory_id": 2,
        "is_active": True,
        "weight": "125 gm",
        "price": 320.00,
        "stock": 50,
        "expiry_date": "2026-02-28",
        "trend_status": False
    },
    {
        "name": "Thai Guava",
        "tamil_name": "தாய்லாந்து கொய்யா",
        "description": "Extra-large Thai Guavas that are known for their firm, crunchy texture and mild sweetness. These guavas have very few seeds and are exceptionally high in fiber and Vitamin C, making them a refreshing and filling healthy snack option.",
        "subcategory_id": 2,
        "is_active": True,
        "weight": "1000 gm",
        "price": 240.00,
        "stock": 40,
        "expiry_date": "2026-02-25",
        "trend_status": False
    },
    {
        "name": "Red Grapes ",
        "tamil_name": "சிவப்பு திராட்சை",
        "description": "Large, seeded Red Globe grapes with a sweet, crunchy texture and high juice content. These premium grapes are visually stunning and packed with resveratrol and vitamins, making them ideal for table displays or a healthy fruit platter.",
        "subcategory_id": 2,
        "is_active": True,
        "weight": "500 gm",
        "price": 210.00,
        "stock": 30,
        "expiry_date": "2026-02-23",
        "trend_status": False
    },
  #  citrus_and_berries_products = [
    {
        "name": "Valencia Orange",
        "tamil_name": "வலென்சியா ஆரஞ்சு",
        "description": "Premium Valencia oranges known for their high juice content and deep golden color. These are the world's best juicing oranges, offering a perfect balance of sweetness and tanginess with a refreshing citrus aroma.",
        "subcategory_id": 3, # Update with your Citrus & Berries subcategory ID
        "is_active": True,
        "weight": "1000 gm",
        "price": 280.00,
        "stock": 40,
        "expiry_date": "2026-03-01",
        "trend_status": False
    },
    {
        "name": "Strawberries ",
        "tamil_name": "செம்புற்றுப் பழம் (ஸ்டிராபெர்ரி)",
        "description": "Selected premium grade strawberries that are bright red, heart-shaped, and incredibly sweet. These berries are hand-picked to ensure quality and are rich in antioxidants, making them a delicious healthy snack or dessert topping.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "250 gm",
        "price": 150.00,
        "stock": 25,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Blueberries ",
        "tamil_name": "அவுரிநெல்லி",
        "description": "Fresh, plump blueberries packed in a protective container to maintain their firm texture. These super-berries are a powerhouse of nutrients, perfect for boosting brain health and adding a burst of flavor to your daily yogurt or cereal.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "125 gm",
        "price": 300.00,
        "stock": 35,
        "expiry_date": "2026-02-24",
        "trend_status": False
    },
    {
        "name": "Maltas (Blood Orange)",
        "tamil_name": "செம்மஞ்சள் ஆரஞ்சு",
        "description": "Unique Blood Oranges with a distinct crimson-colored flesh and a flavor hint of raspberry. These oranges are prized for their high antioxidant levels and provide a sophisticated, tart sweetness that stands out in salads and fresh juices.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "1000 gm",
        "price": 240.00,
        "stock": 20,
        "expiry_date": "2026-02-28",
        "trend_status": False
    },
    {
        "name": "Fresh Raspberries",
        "tamil_name": "புற்றுப்பழம் (ராஸ்பெர்ரி)",
        "description": "Delicate and aromatic fresh raspberries with a rich red color and a sweet-tart flavor profile. These berries are highly perishable and handled with extreme care to provide you with the best quality for your smoothies and gourmet desserts.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "125 gm",
        "price": 450.00,
        "stock": 10,
        "expiry_date": "2026-02-20",
        "trend_status": False
    },
    {
        "name": "Eureka Lemon",
        "tamil_name": "யுரேகா எலுமிச்சை",
        "description": "Large, juicy Eureka lemons with a bright yellow skin and very few seeds. Known for their high acidity and strong citrus scent, they are the gold standard for culinary use, baking, and making refreshing premium lemonade.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "500 gm",
        "price": 120.00,
        "stock": 60,
        "expiry_date": "2026-03-15",
        "trend_status": False
    },
    {
        "name": "Cranberries ",
        "tamil_name": "குருதிநெல்லி",
        "description": "Versatile cranberries available in fresh or naturally dried forms, known for their sharp, tart flavor. These berries are world-famous for supporting urinary tract health and adding a unique nutritional punch to salads, nuts, and trail mixes.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "200 gm",
        "price": 350.00,
        "stock": 30,
        "expiry_date": "2026-04-10",
        "trend_status": False
    },
    {
        "name": "Grapefruit ",
        "tamil_name": "பம்பளிமாஸ் ",
        "description": "Large, tangy, and slightly bitter Pink Grapefruits with a beautiful blush-colored interior. An excellent choice for weight management and detox, these fruits are packed with Vitamin A and C, providing a refreshing start to your morning.",
        "subcategory_id": 3,
        "is_active": True,
        "weight": "1000 gm",
        "price": 180.00,
        "stock": 15,
        "expiry_date": "2026-02-28",
        "trend_status": False
    },
#    melons_and_papayas_products = [
    {
        "name": "Watermelon (Kiran)",
        "tamil_name": "தர்பூசணி (கிரண்)",
        "description": "Premium Kiran watermelons known for their attractive dark green stripes and exceptionally sweet, juicy red flesh. These melons are a perfect natural coolant, providing instant hydration and essential vitamins during hot summer days.",
        "subcategory_id": 4, # Update with your Melons & Papayas subcategory ID
        "is_active": True,
        "weight": "1000 gm",
        "price": 40.00,
        "stock": 50,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Papaya (Semi-Ripe)",
        "tamil_name": "பப்பாளி பழம் (பாதி பழுத்தது)",
        "description": "Carefully selected semi-ripe papayas that offer a firm texture and a balanced sweetness. These are ideal for those who prefer a crunchier bite or want a fruit that will fully ripen within a day or two at home for maximum freshness.",
        "subcategory_id": 4,
        "is_active": True,
        "weight": "1000 gm",
        "price": 55.00,
        "stock": 30,
        "expiry_date": "2026-02-21",
        "trend_status": False
    },
    {
        "name": "Muskmelon (Kharbuja)",
        "tamil_name": "முலாம் பழம் (கர்பூஜா)",
        "description": "Traditional Kharbuja muskmelons with a netted skin and a highly aromatic, sweet orange interior. Rich in Vitamin A and C, these melons are perfect for healthy breakfast bowls, refreshing juices, or as a light, natural dessert.",
        "subcategory_id": 4,
        "is_active": True,
        "weight": "1000 gm",
        "price": 60.00,
        "stock": 45,
        "expiry_date": "2026-02-23",
        "trend_status": False
    },
    {
        "name": "Sun Melon",
        "tamil_name": "மஞ்சள் முலாம் பழம்",
        "description": "Stunning bright yellow Sun Melons featuring a crisp white flesh and a delicate, honey-like sweetness. These aesthetic melons are not only visually appealing but also packed with nutrients, making them a premium choice for fruit platters.",
        "subcategory_id": 4,
        "is_active": True,
        "weight": "1000 gm",
        "price": 85.00,
        "stock": 25,
        "expiry_date": "2026-02-24",
        "trend_status": False
    },
    {
        "name": "Striped Watermelon",
        "tamil_name": "வரி தர்பூசணி",
        "description": "Classic striped watermelons sourced for their high water content and crisp texture. These large, refreshing fruits are the ultimate healthy solution for hydration, providing a wealth of electrolytes and lycopene in every sweet slice.",
        "subcategory_id": 4,
        "is_active": True,
        "weight": "1000 gm",
        "price": 35.00,
        "stock": 60,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Honey Dew Melon",
        "tamil_name": "தேன் முலாம் பழம்",
        "description": "Smooth-skinned Honey Dew melons known for their pale green, succulent flesh and exceptionally mild, sweet flavor. Their refreshing taste makes them a gourmet favorite for chilled salads, appetizers, or light summer smoothies.",
        "subcategory_id": 4,
        "is_active": True,
        "weight": "1000 gm",
        "price": 95.00,
        "stock": 20,
        "expiry_date": "2026-02-25",
        "trend_status": False
    },
#    dry_fruits_products = [
    {
        "name": "Almonds (Badam)",
        "tamil_name": "பாதாம் பருப்பு",
        "description": "Premium quality crunchy almonds that are a natural powerhouse of vitamin E and healthy fats. These nutrient-dense nuts are perfect for improving brain health, boosting energy, and serving as a healthy daily snack for all ages.",
        "subcategory_id": 5,  # Update with your Dry Fruits & Nuts subcategory ID
        "is_active": True,
        "weight": "250 gm",
        "price": 300.00,
        "stock": 100,
        "expiry_date": "2026-08-15",
        "trend_status": False
    },
    {
        "name": "Cashews (Kaju)",
        "tamil_name": "முந்திரிப் பருப்பு",
        "description": "Selected large-sized whole cashews known for their creamy texture and rich, nutty flavor. These are excellent for heart health and provide a great source of protein, making them ideal for both direct snacking and traditional Indian sweets.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "250 gm",
        "price": 350.00,
        "stock": 80,
        "expiry_date": "2026-07-20",
        "trend_status": False
    },
    {
        "name": "Walnuts (Akhrot)",
        "tamil_name": "அக்ரூட் பருப்பு",
        "description": "High-grade walnuts with a distinct brain-like shape, rich in Omega-3 fatty acids and antioxidants. These are essential for cognitive function and heart health, offering a slightly earthy and rich flavor that pairs perfectly with salads and desserts.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "200 gm",
        "price": 400.00,
        "stock": 50,
        "expiry_date": "2026-06-10",
        "trend_status": False
    },
    {
        "name": "Pistachios (Pista)",
        "tamil_name": "பிஸ்தா பருப்பு",
        "description": "Premium roasted and lightly salted pistachios that are as fun to eat as they are nutritious. Packed with fiber and minerals, these vibrant green nuts are great for weight management and provide a delicious, salty crunch for your snack time.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "200 gm",
        "price": 380.00,
        "stock": 60,
        "expiry_date": "2026-08-01",
        "trend_status": False
    },
    {
        "name": "Raisins (Kishmish)",
        "tamil_name": "உலர் திராட்சை",
        "description": "Naturally sun-dried golden raisins that provide a sweet and chewy burst of energy. These are a great natural source of iron and fiber, commonly used to enhance the flavor of breakfast cereals, baked goods, and traditional festive desserts.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "250 gm",
        "price": 120.00,
        "stock": 120,
        "expiry_date": "2026-09-30",
        "trend_status": False
    },
    {
        "name": "Dates (Khajoor)",
        "tamil_name": "பேரீச்சம்பழம்",
        "description": "Premium quality soft and sweet dates, known as nature's candy. They are packed with natural sugars for an instant energy boost and are rich in essential minerals and fiber, making them the perfect healthy substitute for processed sweets.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "500 gm",
        "price": 250.00,
        "stock": 90,
        "expiry_date": "2026-12-31",
        "trend_status": False
    },
    {
        "name": "Dried Figs (Anjeer)",
        "tamil_name": "உலர் அத்திப்பழம்",
        "description": "Naturally dried, fiber-rich figs that offer a unique sweet taste and a chewy texture with crunchy seeds. Anjeer is highly valued for its digestive benefits and high mineral content, serving as a delicious and health-conscious snack option.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "250 gm",
        "price": 450.00,
        "stock": 40,
        "expiry_date": "2026-07-15",
        "trend_status": False
    },
    {
        "name": "Apricots (Jardalu)",
        "tamil_name": "உலர் சர்க்கரை பாதாமி",
        "description": "Bright and tangy-sweet dried apricots that are a fantastic source of Vitamin A and potassium. These vibrant fruits are great for skin health and eye-sight, providing a chewy and refreshing alternative to traditional dry fruits.",
        "subcategory_id": 5,
        "is_active": True,
        "weight": "200 gm",
        "price": 280.00,
        "stock": 35,
        "expiry_date": "2026-06-25",
        "trend_status": False
    },
  #  seasonal_fruits_products = [
    {
        "name": "Alphonso Mango",
        "tamil_name": "அல்போன்சா மாம்பழம்",
        "description": "The 'King of Mangoes' known for its rich, creamy texture and unparalleled sweetness with a distinct aroma. These premium seasonal mangoes are hand-picked from the best orchards to ensure a luxurious tropical experience in every bite.",
        "subcategory_id": 6,  # Update with your Seasonal Fruits subcategory ID
        "is_active": True,
        "weight": "1000 gm",
        "price": 650.00,
        "stock": 40,
        "expiry_date": "2026-05-15",
        "trend_status": False
    },
    {
        "name": "Custard Apple (Sitaphal)",
        "tamil_name": "சீத்தாப்பழம்",
        "description": "Authentic seasonal custard apples with a creamy, custard-like white pulp and a sweet, granular texture. Rich in magnesium and vitamins, these fruits are a natural energy booster and a favorite for healthy desserts and shakes.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 140.00,
        "stock": 35,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Lychee (Muzaffarpur)",
        "tamil_name": "விளச்சிப்பழம் (லிச்சி)",
        "description": "Premium Muzaffarpur lychees featuring a translucent, juicy flesh and a floral, sweet scent. These seasonal delights are high in antioxidants and Vitamin C, providing a refreshing burst of hydration and sweetness during the peak harvest season.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "500 gm",
        "price": 220.00,
        "stock": 25,
        "expiry_date": "2026-05-20",
        "trend_status": False
    },
    {
        "name": "Plums (Red)",
        "tamil_name": "சிவப்பு அத்திப்பழம் (பிளம்ஸ்)",
        "description": "Juicy red plums with a perfect balance of tartness and sweetness, sourced fresh from cool-climate orchards. These stone fruits are packed with vitamins and minerals, making them an ideal seasonal snack or a flavorful addition to baked tarts.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "500 gm",
        "price": 180.00,
        "stock": 45,
        "expiry_date": "2026-02-25",
        "trend_status": False
    },
    {
        "name": "Jackfruit (Kathal)",
        "tamil_name": "பலாப்பழம்",
        "description": "Sweet and aromatic yellow jackfruit bulbs, celebrated for their unique honey-like flavor and firm texture. As a seasonal favorite, it is not only delicious but also highly nutritious, offering a great source of dietary fiber and energy.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "500 gm",
        "price": 90.00,
        "stock": 20,
        "expiry_date": "2026-02-20",
        "trend_status": False
    },
    {
        "name": "Cherries (Fresh)",
        "tamil_name": "செர்ரி பழம்",
        "description": "Stunning, deep red fresh cherries that are sweet, juicy, and full of flavor. These seasonal berries are highly prized for their anti-inflammatory properties and serve as a sophisticated snack or a vibrant garnish for premium desserts.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "250 gm",
        "price": 400.00,
        "stock": 15,
        "expiry_date": "2026-02-24",
        "trend_status": False
    },
    {
        "name": "Pear (Indian/Babbu Gosha)",
        "tamil_name": "பேரிக்காய்",
        "description": "Crisp and juicy Indian pears, specifically the Babbu Gosha variety, known for their mild sweetness and grainy texture. These seasonal pears are light on the stomach and provide essential fibers, making them a healthy choice for daily snacking.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "1000 gm",
        "price": 160.00,
        "stock": 50,
        "expiry_date": "2026-03-05",
        "trend_status": False
    },
    {
        "name": "Jamun (Black Plum)",
        "tamil_name": "நாவற்பழம்",
        "description": "Traditional deep purple Jamuns with a unique sweet and astringent taste. Known widely for their medicinal properties and blood-purifying benefits, these seasonal berries are a nutritious treat that supports healthy blood sugar levels.",
        "subcategory_id": 6,
        "is_active": True,
        "weight": "250 gm",
        "price": 120.00,
        "stock": 30,
        "expiry_date": "2026-02-19",
        "trend_status": False
    },
   # premium_imported_fruits = [
    {
        "name": "Washington Apple",
        "tamil_name": "வாஷிங்டன் ஆப்பிள்",
        "description": "Premium quality Washington apples known for their deep red color, crunchy texture, and mild sweetness. These world-famous apples are imported directly to ensure superior quality and long-lasting freshness for your daily fruit consumption.",
        "subcategory_id": 7,  # Update with your Premium/Imported subcategory ID
        "is_active": True,
        "weight": "1000 gm",
        "price": 320.00,
        "stock": 50,
        "expiry_date": "2026-03-10",
        "trend_status": False
    },
    {
        "name": "Seedless Red Globe Grapes",
        "tamil_name": "விதை இல்லாத சிவப்பு திராட்சை",
        "description": "Large, crunchy, and exceptionally sweet seedless Red Globe grapes imported from the finest international vineyards. These grapes are a rich source of resveratrol and antioxidants, making them a healthy and luxurious choice for any occasion.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 280.00,
        "stock": 35,
        "expiry_date": "2026-02-24",
        "trend_status": False
    },
    {
        "name": "Imported Blueberries",
        "tamil_name": "வெளிநாட்டு அவுரிநெல்லி",
        "description": "Selected premium blueberries imported for their intense flavor and high nutrient density. These super-berries are packed with brain-boosting antioxidants and are perfect for garnishing high-end desserts or enjoying as a healthy, low-calorie snack.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "125 gm",
        "price": 350.00,
        "stock": 40,
        "expiry_date": "2026-02-28",
        "trend_status": False
    },
    {
        "name": "Hass Avocado (Imported)",
        "tamil_name": "வெண்ணெய் பழம் (வெளிநாட்டு வகை)",
        "description": "Authentic imported Hass avocados featuring a pebbly skin and a rich, buttery interior. Celebrated for their heart-healthy monounsaturated fats, these avocados are the premium choice for making gourmet guacamole, smoothies, or avocado toasts.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 450.00,
        "stock": 20,
        "expiry_date": "2026-02-22",
        "trend_status": False
    },
    {
        "name": "Dragon Fruit (Pink/Red)",
        "tamil_name": "அக்கினிப் பழம் (சிவப்பு)",
        "description": "Visually stunning Pink/Red Dragon Fruit with a vibrant magenta interior and a sweet, earthy flavor. High in fiber and Vitamin C, this exotic fruit is perfect for creating colorful smoothie bowls and adding a tropical flair to your diet.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 180.00,
        "stock": 30,
        "expiry_date": "2026-02-25",
        "trend_status": False
    },
    {
        "name": "New Zealand Kiwi (Gold)",
        "tamil_name": "நியூசிலாந்து தங்கப் பசலிப் பழம்",
        "description": "Premium Golden Kiwis from New Zealand, offering a smoother skin and a much sweeter, tropical taste compared to the green variety. These kiwis are an immunity-boosting powerhouse with extremely high levels of Vitamin C and dietary fiber.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 300.00,
        "stock": 25,
        "expiry_date": "2026-03-05",
        "trend_status": False
    },
    {
        "name": "Premium Thai Mango",
        "tamil_name": "தாய்லாந்து மாம்பழம்",
        "description": "Exquisite Thai mangoes known for their slender shape, smooth skin, and incredibly sweet, fiber-less golden pulp. These mangoes provide an authentic Southeast Asian flavor experience and are prized for their consistent quality and delicious aroma.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "1000 gm",
        "price": 450.00,
        "stock": 15,
        "expiry_date": "2026-02-23",
        "trend_status": False
    },
    {
        "name": "Medjool Dates",
        "tamil_name": "மெட்ஜூல் பேரீச்சம்பழம்",
        "description": "Known as the 'King of Dates,' Medjool dates are large, soft, and have a rich, caramel-like flavor. These are naturally sun-dried and are an excellent source of energy, fiber, and potassium, serving as the ultimate premium natural sweetener.",
        "subcategory_id": 7,
        "is_active": True,
        "weight": "500 gm",
        "price": 850.00,
        "stock": 45,
        "expiry_date": "2026-12-31",
        "trend_status": False
    }

]



fruit_categories = [
    {
        "name": "Daily Vegetables",
        "description": "Essential kitchen staples required for everyday Indian cooking, including farm-fresh onions, tomatoes, and potatoes. These high-quality basics are sourced daily to ensure maximum freshness and flavor for your daily meals and curries.",
        "is_active": True,
        "category_id":1
    },
    {
        "name": "Leafy Greens",
        "description": "A wide selection of nutrient-dense spinach varieties and traditional South Indian greens like Palak, Murungai, and Siru Keerai. These greens are harvested at the peak of freshness to provide you with essential iron, vitamins, and natural minerals.",
        "is_active": True,
        "category_id":1
    },
    {
        "name": "Exotic Vegetables",
        "description": "Premium international vegetable varieties including fresh Broccoli, Zucchini, and vibrant Bell Peppers for gourmet cooking. Perfect for health-conscious customers looking to prepare continental salads, pastas, or nutritious stir-fry dishes at home.",
        "is_active": True,
        "category_id":1
    },
    {
        "name": "Root Vegetables",
        "description": "Earth-grown, fiber-rich vegetables such as crunchy Ooty carrots, beetroots, and traditional tubers like Yam and Tapioca. These vegetables are carefully cleaned and packed to maintain their natural earthiness and long-lasting shelf life in your kitchen.",
        "is_active": True,
        "category_id":1
    },
    {
        "name": "Gourmet & Mushrooms",
        "description": "A specialty collection featuring protein-packed Button and Oyster mushrooms along with tender baby corn and sweet corn. Ideal for adding a rich, meaty texture to your gravies or preparing restaurant-style starters and continental appetizers.",
        "is_active": True,
        "category_id":1
    }
                   
        ]

fruit_categories = [
    {
        "name": "Fresh Fruits",
        "description": "Hand-picked everyday fruits including a variety of Apples, Bananas, and Grapes sourced directly from the best orchards. These fruits are perfect for your daily snacks and desserts, providing natural energy and essential nutrients to support a healthy and active lifestyle.",
        "is_active": True,
        "category_id":2
    },
    {
        "name": "Exotic Fruits",
        "description": "Discover a premium range of international fruits like Kiwi, Dragon Fruit, Avocado, and Mangosteen for a unique and luxurious taste experience. These nutrient-dense superfoods are imported with extreme care to ensure they reach you in perfectly ripe and ready-to-eat condition.",
        "is_active": True,
         "category_id":2
    },
    {
        "name": "Citrus & Berries",
        "description": "Zesty and refreshing citrus fruits like Oranges and Lemons paired with antioxidant-rich berries such as Strawberries and Blueberries. These fruits are world-renowned for their high Vitamin C content and are excellent for boosting immunity and making fresh, healthy juices.",
        "is_active": True,
         "category_id":2
    },
    {
        "name": "Melons & Papayas",
        "description": "Sweet, juicy, and highly hydrating large fruits like Watermelons, Muskmelons, and Papayas that are perfect for tropical climates and summer days. Great for natural digestion and weight management, these fruits are ideal for refreshing fruit bowls and cooling smoothies.",
        "is_active": True,
         "category_id":2
    },
    {
        "name": "Dry Fruits & Nuts",
        "description": "A selection of premium quality Almonds, Cashews, Walnuts, and Dates that serve as the perfect healthy snack for any time of the day. These nuts are naturally processed and packed with healthy fats, proteins, and minerals to keep your brain and heart functioning at their best.",
        "is_active": True,
         "category_id":2
    },
    {
        "name": "Seasonal Fruits",
        "description": "Enjoy the limited-time flavors of the season’s best harvest, featuring seasonal favorites like Alphonso Mangoes, Custard Apples, and Lychees. Since these are available only during specific months, we ensure you get the freshest pick of the season's bounty at the right time.",
        "is_active": True,
         "category_id":2
    },
         {
                "name": "premium_fruits ",
                "description": "Enjoy the limited-time flavors of the season’s best harvest, featuring seasonal favorites like Alphonso Mangoes, Custard Apples, and Lychees. Since these are available only during specific months, we ensure you get the freshest pick of the season's bounty at the right time.",
                "is_active": True,
                "category_id":2
            }
]


categories_data = [
    {
        
        "name": "Fresh Vegetables",
        "description": "Premium quality farm-fresh daily, country, and exotic vegetables.",
        "status": True
    },
    {
       
        "name": "Fruits",
        "description": "Sweet, juicy seasonal and imported fruits sourced directly from orchards.",
        "status": True
    },
    {
        
        "name": "Dairy Products",
        "description": "Fresh milk, thick curd, paneer, and other high-quality milk-based essentials.",
        "status": True
    }
]






vegetables_all= [									
    {									
        "name": "Onion (Big)",									
        "tamil_name": "பெரிய வெங்காயம்",									
        "description": "Premium quality farm-fresh big onions, known for their strong flavor and crisp texture. These are essential for daily cooking, providing the perfect base for gravies and sambar.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1000 gm",									
        "price": 45.00,									
        "stock": 500,									
        "expiry_date": "2026-02-23",									
        "trend_status": False									
    },									
    {									
        "name": "Tomato (Hybrid)",									
        "tamil_name": "தக்காளி (ஹைப்ரிட்)",									
        "description": "Firm and shiny hybrid tomatoes with a long shelf life. Perfect for slicing in salads or creating smooth and thick sauces for both continental and Indian dishes.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1000 gm",									
        "price": 30.00,									
        "stock": 400,									
        "expiry_date": "2026-02-21",									
        "trend_status": False									
    },									
    {									
        "name": "Tomato (Country/Local)",									
        "tamil_name": "நாட்டுத் தக்காளி",									
        "description": "Authentic country tomatoes known for their tangy flavor. These local varieties are highly preferred for traditional rasam and spicy chutneys.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1000 gm",									
        "price": 35.00,									
        "stock": 300,									
        "expiry_date": "2026-02-20",									
        "trend_status": False									
    },									
    {									
        "name": "Potato (Jyoti/Regular)",									
        "tamil_name": "உருளைக்கிழங்கு",									
        "description": "High-quality regular potatoes with a smooth skin. Whether boiling for masalas or frying for chips, these provide a consistent taste and excellent nutrition.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1000 gm",									
        "price": 40.00,									
        "stock": 600,									
        "expiry_date": "2026-03-10",									
        "trend_status": False									
    },									
    {									
        "name": "Carrot (Ooty)",									
        "tamil_name": "கேரட் (ஊட்டி)",									
        "description": "Sweet and crunchy premium carrots sourced from Ooty. Packed with vitamins, these are ideal for fresh juices, healthy salads, or traditional halwa.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 35.00,									
        "stock": 150,									
        "expiry_date": "2026-02-25",									
        "trend_status": False									
    },									
    {									
        "name": "Ginger (Old)",									
        "tamil_name": "இஞ்சி (பழையது)",									
        "description": "Strong and pungent aged ginger, perfect for adding a spicy kick and medicinal value to your tea, food, and home remedies.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "250 gm",									
        "price": 40.00,									
        "stock": 100,									
        "expiry_date": "2026-03-20",									
        "trend_status": False									
    },									
    {									
        "name": "Garlic (Malai Poo)",									
        "tamil_name": "மலைப் பூண்டு",									
        "description": "Premium Malai Poo garlic known for its bold aroma and large cloves. Sourced from hilly regions, it enhances any curry with its intense flavor.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "250 gm",									
        "price": 60.00,									
        "stock": 150,									
        "expiry_date": "2026-04-10",									
        "trend_status": False									
    },									
    {									
        "name": "Green Chilli",									
        "tamil_name": "பச்சை மிளகாய்",									
        "description": "Fresh and spicy green chillies that add a sharp heat. Essential for tempering, making chutneys, or adding a zing to daily meals.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "250 gm",									
        "price": 20.00,									
        "stock": 100,									
        "expiry_date": "2026-02-24",									
        "trend_status": False									
    },									
    {									
        "name": "Lemon",									
        "tamil_name": "எலுமிச்சை",									
        "description": "Zesty and juicy fresh lemons, perfect for boosting immunity. Essential for making juices, seasoning salads, or preparing traditional lemon rice.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "250 gm",									
        "price": 30.00,									
        "stock": 200,									
        "expiry_date": "2026-03-05",									
        "trend_status": False									
    },									
    {									
        "name": "Small Onion",									
        "tamil_name": "சின்ன வெங்காயம்",									
        "description": "Traditional shallots famous for their medicinal properties and unique sweetness. An absolute must-have for authentic South Indian sambar.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 60.00,									
        "stock": 250,									
        "expiry_date": "2026-02-28",									
        "trend_status": False									
    },									
    {									
        "name": "Lady's Finger",									
        "tamil_name": "வெண்டைக்காய்",									
        "description": "Fresh and tender lady's fingers, rich in fiber. These green pods are hand-picked to ensure they are crisp, making them ideal for frying or kootu.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 25.00,									
        "stock": 200,									
        "expiry_date": "2026-02-21",									
        "trend_status": False									
    },									
    {									
        "name": "Brinjal (Vari)",									
        "tamil_name": "வரி கத்தரிக்காய்",									
        "description": "Striped green and purple brinjals with a soft interior. Perfect for oil-based fries like Ennai Kathirikkai or adding to aromatic sambar.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 30.00,									
        "stock": 180,									
        "expiry_date": "2026-02-22",									
        "trend_status": False									
    },									
    {									
        "name": "Cabbage",									
        "tamil_name": "முட்டைக்கோஸ்",									
        "description": "Fresh and compact green cabbage with crunchy leaves. Great source of Vitamin C and K, perfect for poriyal or healthy stir-fries.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 20.00,									
        "stock": 150,									
        "expiry_date": "2026-02-25",									
        "trend_status": False									
    },									
    {									
        "name": "Beetroot",									
        "tamil_name": "பீட்ரூட்",									
        "description": "Deep crimson, firm beetroots rich in iron. Known for their earthy sweetness, they are perfect for side dishes or nutritious juices.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 25.00,									
        "stock": 120,									
        "expiry_date": "2026-03-05",									
        "trend_status": False									
    },									
    {									
        "name": "Bitter Gourd",									
        "tamil_name": "பாகற்காய்",									
        "description": "Nutrient-packed bitter gourds known for blood-purifying properties. Freshly harvested to ensure they are firm and excellent for crispy chips.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 28.00,									
        "stock": 120,									
        "expiry_date": "2026-02-22",									
        "trend_status": False									
    },									
    {									
        "name": "Snake Gourd",									
        "tamil_name": "புடலங்காய்",									
        "description": "Refreshing and hydrating snake gourds with a mild flavor. High in water content, they are perfect for light summer meals and traditional kootu.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 20.00,									
        "stock": 100,									
        "expiry_date": "2026-02-21",									
        "trend_status": False									
    },									
    {									
        "name": "Bottle Gourd",									
        "tamil_name": "சுரைக்காய்",									
        "description": "Cooling and highly nutritious bottle gourds. These fresh gourds have a tender skin and are widely used in juices and comforting stews.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1000 gm",									
        "price": 25.00,									
        "stock": 90,									
        "expiry_date": "2026-02-22",									
        "trend_status": False									
    },									
    {									
        "name": "Beans",									
        "tamil_name": "பீன்ஸ்",									
        "description": "Fresh and snappy green beans, packed with vitamins. These tender beans are perfect for quick stir-fries or preparing a classic poriyal.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 40.00,									
        "stock": 140,									
        "expiry_date": "2026-02-23",									
        "trend_status": False									
    },									
    {									
        "name": "Cauliflower",									
        "tamil_name": "காலிபிளவர்",									
        "description": "Beautiful white cauliflower florets that are fresh and crunchy. Versatile for making spicy Gobi 65 or healthy roasted side dishes.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 Piece",									
        "price": 45.00,									
        "stock": 80,									
        "expiry_date": "2026-02-20",									
        "trend_status": False									
    },									
    {									
        "name": "Ridge Gourd",									
        "tamil_name": "பீர்க்கங்காய்",									
        "description": "Rich in dietary fiber and essential nutrients. Its mild taste makes it ideal for kootu, chutneys, and nutritious daily gravies.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 30.00,									
        "stock": 110,									
        "expiry_date": "2026-02-22",									
        "trend_status": False									
    },									
    {									
        "name": "Drumstick",									
        "tamil_name": "முருங்கைக்காய்",									
        "description": "Aromatic and nutrient-rich drumsticks. High in calcium and iron, they add a unique earthy flavor and health benefits to your sambar.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "250 gm",									
        "price": 20.00,									
        "stock": 130,									
        "expiry_date": "2026-02-24",									
        "trend_status": False									
    },									
    {									
        "name": "Ivy Gourd (Kovakkai)",									
        "tamil_name": "கோவக்காய்",									
        "description": "Small, crunchy Ivy gourds excellent for maintaining health. Perfect for making spicy stir-fries, providing a delightful crunch.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 30.00,									
        "stock": 120,									
        "expiry_date": "2026-02-22",									
        "trend_status": False									
    },									
    {									
        "name": "Radish",									
        "tamil_name": "முள்ளங்கி",									
        "description": "Crisp white radishes with a peppery punch. Excellent for digestion and commonly used in sambar or as a cooling element in salads.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 20.00,									
        "stock": 100,									
        "expiry_date": "2026-02-25",									
        "trend_status": False									
    },									
    {									
        "name": "Chow Chow",									
        "tamil_name": "சௌ சௌ",									
        "description": "A mild-tasting, hydrating vegetable that is very easy to cook. Perfect for adding to kootu, soups, or stir-fries for a light meal.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 25.00,									
        "stock": 110,									
        "expiry_date": "2026-02-25",									
        "trend_status": False									
    },									
    {									
        "name": "Cucumber",									
        "tamil_name": "வெள்ளரிக்காய்",									
        "description": "Crunchy and hydrating cucumbers, perfect for cooling your body. Sourced fresh for maximum crispness in raw salads.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 20.00,									
        "stock": 180,									
        "expiry_date": "2026-02-21",									
        "trend_status": False									
    },									
    {									
        "name": "Pumpkin",									
        "tamil_name": "அரசாணிக்காய்",									
        "description": "Sweet and nutrient-dense yellow pumpkins. Their soft texture when cooked makes them perfect for creamy soups or traditional sambar.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 25.00,									
        "stock": 90,									
        "expiry_date": "2026-03-05",									
        "trend_status": False									
},									
									
    {									
        "name": "Coriander Leaves",									
        "tamil_name": "கொத்தமல்லி",									
        "description": "Fresh and aromatic Coriander leaves, essential for garnishing and adding flavor to curries, dals, and chutneys.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 bunch",									
        "price": 10.00,									
        "stock": 100,									
        "expiry_date": "2026-02-18",									
        "trend_status": False									
    },									
    {									
        "name": "Mint Leaves",									
        "tamil_name": "புதினா",									
        "description": "Refreshing and fragrant Mint leaves, perfect for making spicy chutneys, biryani, and cooling summer drinks.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 bunch",									
        "price": 10.00,									
        "stock": 100,									
        "expiry_date": "2026-02-18",									
        "trend_status": False									
    },									
    {									
        "name": "Curry Leaves",									
        "tamil_name": "கறிவேப்பிலை",									
        "description": "Highly aromatic Curry leaves, a fundamental ingredient in South Indian tempering for its distinct flavor and health benefits.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 bunch",									
        "price": 5.00,									
        "stock": 150,									
        "expiry_date": "2026-02-19",									
        "trend_status": False									
    },									
									
    {									
        "name": "Ash Gourd",									
        "tamil_name": "வெள்ளை பூசணிக்காய்",									
        "description": "Hydrating and low-calorie Ash Gourd, perfect for making traditional mor-kuzhambu, kootu, or healthy juices.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 30.00,									
        "stock": 80,									
        "expiry_date": "2026-02-20",									
        "trend_status": False									
    },									
    {									
        "name": "Raw Banana",									
        "tamil_name": "வாழைக்காய்",									
        "description": "Farm-fresh raw bananas, ideal for making crispy roasts, bajji, or traditional South Indian stir-fries.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 Piece",									
        "price": 10.00,									
        "stock": 150,									
        "expiry_date": "2026-02-22",									
        "trend_status": False									
    },									
    {									
        "name": "Banana Stem",									
        "tamil_name": "வாழைத்தண்டு",									
        "description": "Nutritious and fiber-rich Banana Stem, highly recommended for kidney health. Best used in kootu, salads, or juices.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 Piece",									
        "price": 25.00,									
        "stock": 60,									
        "expiry_date": "2026-02-18",									
        "trend_status": False									
    },									
    {									
        "name": "Banana Flower",									
        "tamil_name": "வாழைப்பூ",									
        "description": "Fresh Banana Flower, known for its numerous health benefits. Perfect for making traditional vadai, usili, or poriyal.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "1 Piece",									
        "price": 30.00,									
        "stock": 40,									
        "expiry_date": "2026-02-18",									
        "trend_status": False									
    },									
    {									
        "name": "Brinjal (Green)",									
        "tamil_name": "பச்சை கத்தரிக்காய்",									
        "description": "Tender and flavorful green brinjals, perfect for making spicy curries, sambar, or roasted side dishes.",									
        "subcategory_id": 1,									
        "is_active": True,									
        "weight": "500 gm",									
        "price": 35.00,									
        "stock": 100,									
        "expiry_date": "2026-02-21",									
        "trend_status": False									
    },																														
	    {																	
	        "name": "Palak (Spinach)",																	
	        "tamil_name": "பாலக்கீரை",																	
	        "description": "Nutrient-dense Palak leaves, rich in iron and vitamins. Perfect for making healthy dals, soups, or the classic Palak Paneer with its smooth texture.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 15.00,																	
	        "stock": 100,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Siru Keerai",																	
	        "tamil_name": "சிறுகீரை",																	
	        "description": "Known as Tropical Amaranth, these tender leaves are a staple in South Indian homes. Best suited for stir-fries (poriyal) or mashed with dal for a nutritious meal.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 12.00,																	
	        "stock": 80,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Ara Keerai",																	
	        "tamil_name": "அரைக்கீரை",																	
	        "description": "Commonly used for its incredible health benefits, Ara Keerai has a mild flavor and soft texture. Ideal for making traditional 'Masiyal' or healthy green gravies.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 12.00,																	
	        "stock": 80,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Mulai Keerai",																	
	        "tamil_name": "முளைக்கீரை",																	
	        "description": "Early stage Amaranth leaves that are extremely tender and sweet. High in calcium and fiber, these are perfect for growing children and healthy adult diets.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 12.00,																	
	        "stock": 80,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Ponnanganni Keerai",																	
	        "tamil_name": "பொன்னாங்கண்ணி கீரை",																	
	        "description": "Renowned for improving eyesight and skin glow, this medicinal green is a powerhouse of nutrients. Best enjoyed when stir-fried with grated coconut.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 15.00,																	
	        "stock": 60,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Fenugreek (Methi)",																	
	        "tamil_name": "வெந்தயக்கீரை",																	
	        "description": "Slightly bitter yet highly aromatic, Methi leaves are excellent for digestion and sugar control. Used widely in parathas, pulavs, and medicinal preparations.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 18.00,																	
	        "stock": 70,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Murungai Keerai",																	
	        "tamil_name": "முருங்கைக் கீரை",																	
	        "description": "Moringa leaves, the ultimate superfood. Packed with 90+ nutrients, these leaves are essential for immunity. Great for soups, adai, or classic poriyal.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 20.00,																	
	        "stock": 50,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Manathakkali",																	
	        "tamil_name": "மணத்தக்காளி கீரை",																	
	        "description": "Black Nightshade leaves, famous for curing mouth ulcers and stomach infections. A medicinal green that is both tasty and highly therapeutic when cooked with coconut milk.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 15.00,																	
	        "stock": 60,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Agathi Keerai",																	
	        "tamil_name": "அகத்திக் கீரை",																	
	        "description": "Hummingbird tree leaves, traditionally consumed for detoxification. Rich in calcium and vitamins, it is usually prepared during special occasions for its health properties.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 15.00,																	
	        "stock": 40,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Pulicha Keerai",																	
	        "tamil_name": "புளிச்சக் கீரை",																	
	        "description": "Gongura or Sorrel leaves, known for their distinct tangy flavor. A favorite in South India for making spicy pickles and the famous Gongura Pappu.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 15.00,																	
	        "stock": 55,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Vallarai Keerai",																	
	        "tamil_name": "வல்லாரை கீரை",																	
	        "description": "The 'Memory Green.' Traditionally known to boost brain function and memory power. Best consumed as a chutney or thuvaiyal for kids and students.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 20.00,																	
	        "stock": 45,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Thuthuvalai",																	
	        "tamil_name": "தூதுவளை",																	
	        "description": "A natural remedy for respiratory issues and cold. This thorny creeper green is highly medicinal and usually prepared as a rasam or spicy thuvaiyal.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "100 gm",																	
	        "price": 25.00,																	
	        "stock": 30,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Pasalai Keerai",																	
	        "tamil_name": "பசலைக்கீரை",																	
	        "description": "Ceylon Spinach or Malabar Spinach, known for its thick, succulent leaves. Very cooling for the body and excellent for digestion and skin health.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 15.00,																	
	        "stock": 50,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Paruppu Keerai",																	
	        "tamil_name": "பருப்புக் கீரை",																	
	        "description": "Common Purslane leaves, rich in Omega-3 fatty acids. This slightly sour green is traditionally cooked with lentils (dal) to make a creamy and nutritious kootu.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 12.00,																	
	        "stock": 65,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },																	
	    {																	
	        "name": "Mudakathan Keerai",																	
	        "tamil_name": "முடக்கத்தான் கீரை",																	
	        "description": "Balloon Vine leaves, highly effective for joint pains and arthritis. Usually added to dosa batter to make healthy and tasty medicinal dosas.",																	
	        "subcategory_id": 2,																	
	        "is_active": True,																	
	        "weight": "1 bunch",																	
	        "price": 20.00,																	
	        "stock": 40,																	
	        "expiry_date": "2026-02-18",																	
	        "trend_status": False																	
	    },
     	    {													
	        "name": "Broccoli",													
	        "tamil_name": "பச்சை பூக்கோசு",													
	        "description": "Premium quality green broccoli, rich in fiber and vitamins. A must-have for healthy salads, stir-fries, and continental dishes.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "500 gm",													
	        "price": 90.00,													
	        "stock": 40,													
	        "expiry_date": "2026-02-19",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Zucchini (Green/Yellow)",													
	        "tamil_name": "சுக்கினி",													
	        "description": "Fresh and firm Zucchini available in green and yellow. Low in calories and perfect for grilling, roasting, or adding to pasta.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "500 gm",													
	        "price": 70.00,													
	        "stock": 35,													
	        "expiry_date": "2026-02-20",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Iceberg Lettuce",													
	        "tamil_name": "லெட்டியூஸ்",													
	        "description": "Crisp and crunchy Iceberg Lettuce. The essential base for fresh salads and a cool, crunchy addition to burgers and wraps.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "1 Piece",													
	        "price": 55.00,													
	        "stock": 50,													
	        "expiry_date": "2026-02-18",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Red & Yellow Capsicum",													
	        "tamil_name": "சிவப்பு மற்றும் மஞ்சள் குடைமிளகாய்",													
	        "description": "Vibrant and sweet bell peppers. These colorful capsicums add a beautiful crunch and rich vitamins to your pizzas and salads.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "500 gm",													
	        "price": 120.00,													
	        "stock": 45,													
	        "expiry_date": "2026-02-21",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Button Mushroom",													
	        "tamil_name": "காளான்",													
	        "description": "Fresh and white button mushrooms. Sourced for their soft texture and earthy flavor, perfect for gravies, soups, and starters.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "200 gm",													
	        "price": 50.00,													
	        "stock": 60,													
	        "expiry_date": "2026-02-19",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Baby Corn",													
	        "tamil_name": "பேபி கார்ன்",													
	        "description": "Tender and sweet baby corn. Ideal for Chinese stir-fries, crispy starters, or adding a unique crunch to your vegetable curries.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "250 gm",													
	        "price": 45.00,													
	        "stock": 40,													
	        "expiry_date": "2026-02-20",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Cherry Tomato",													
	        "tamil_name": "செர்ரி தக்காளி",													
	        "description": "Bite-sized, sweet, and juicy cherry tomatoes. Perfect for fresh salads, pasta garnishing, or as a healthy snack for kids.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "250 gm",													
	        "price": 40.00,													
	        "stock": 30,													
	        "expiry_date": "2026-02-19",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Purple Cabbage",													
	        "tamil_name": "சிவப்பு முட்டைக்கோஸ்",													
	        "description": "Stunning purple-colored cabbage with a mild peppery flavor. Rich in antioxidants and adds a great color to your salads.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "500 gm",													
	        "price": 60.00,													
	        "stock": 25,													
	        "expiry_date": "2026-02-22",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Asparagus",													
	        "tamil_name": "தண்ணீர்விட்டான் கிழங்கு வகை",													
	        "description": "Premium exotic asparagus spears. Known for their unique taste and high nutrient profile, best enjoyed grilled or sautéed.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "250 gm",													
	        "price": 180.00,													
	        "stock": 15,													
	        "expiry_date": "2026-02-19",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Pak Choy (Bok Choy)",													
	        "tamil_name": "பாக் சோய்",													
	        "description": "Crisp and leafy Pak Choy, a staple in Asian cuisine. Perfect for soups and healthy stir-fries with its mild, sweet flavor.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "250 gm",													
	        "price": 65.00,													
	        "stock": 20,													
	        "expiry_date": "2026-02-18",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Celery",													
	        "tamil_name": "செலரி",													
	        "description": "Aromatic and crunchy celery stalks. Essential for flavoring soups, stews, and a great addition to healthy green juices.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "250 gm",													
	        "price": 50.00,													
	        "stock": 20,													
	        "expiry_date": "2026-02-19",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Kale",													
	        "tamil_name": "கேல் கீரை",													
	        "description": "The ultimate superfood green. Kale is packed with iron and vitamins, perfect for healthy smoothies or crispy kale chips.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "250 gm",													
	        "price": 110.00,													
	        "stock": 15,													
	        "expiry_date": "2026-02-18",													
	        "trend_status": False													
	    },													
	    {													
	        "name": "Avocado (Hass)",													
	        "tamil_name": "ஆவகேடோ (வெண்ணெய் பழம்)",													
	        "description": "Creamy and rich Hass Avocado, perfect for making guacamole or spreading on toast. Rich in healthy fats and nutrients.",													
	        "subcategory_id": 3,													
	        "is_active": True,													
	        "weight": "1 Piece",													
	        "price": 150.00,													
	        "stock": 30,													
	        "expiry_date": "2026-02-21",													
	        "trend_status": False													
	    },
															]																	
								


vegetables = [
    # --- Subcategory 4: Root Vegetables ---
    {
        "name": "Potato (Regular)",
        "tamil_name": "உருளைக்கிழங்கு",
        "description": "Versatile and farm-fresh regular potatoes. A kitchen staple perfect for masalas, fries, and a variety of Indian gravies.",
        "subcategory_id": 4,
        "is_active": True, "weight": "1000 gm", "price": 40.00, "stock": 500, "trend_status": False,
        "expiry_date": "2026-03-05"
    },
    {
        "name": "Carrot (Ooty)",
        "tamil_name": "கேரட் (ஊட்டி)",
        "description": "Sweet and crunchy carrots sourced directly from Ooty. Rich in Vitamin A, perfect for salads, halwa, or daily cooking.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 45.00, "stock": 200, "trend_status": False,
        "expiry_date": "2026-02-25"
    },
    {
        "name": "Beetroot",
        "tamil_name": "பீட்ரூட்",
        "description": "Deep red and nutritious beetroots. High in iron and antioxidants, ideal for poriyal, juices, or healthy salads.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 30.00, "stock": 150, "trend_status": False,
        "expiry_date": "2026-02-28"
    },
    {
        "name": "Radish (White)",
        "tamil_name": "வெள்ளை முள்ளங்கி",
        "description": "Fresh white radishes with a mild peppery taste. Excellent for making traditional sambar, parathas, or crunchy salads.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 25.00, "stock": 100, "trend_status": False,
        "expiry_date": "2026-02-23"
    },
    {
        "name": "Sweet Potato",
        "tamil_name": "சர்க்கரைவள்ளி கிழங்கு",
        "description": "Naturally sweet and fiber-rich sweet potatoes. A healthy carbohydrate source, great for roasting, boiling, or making snacks.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 35.00, "stock": 80, "trend_status": False,
        "expiry_date": "2026-03-02"
    },
    {
        "name": "Tapioca (Maravalli Kizhanggu)",
        "tamil_name": "மரவள்ளி கிழங்கு",
        "description": "Starchy and energy-packed Tapioca roots. Perfect for traditional steamed snacks or making crispy homemade chips.",
        "subcategory_id": 4,
        "is_active": True, "weight": "1000 gm", "price": 40.00, "stock": 120, "trend_status": False,
        "expiry_date": "2026-02-26"
    },
    {
        "name": "Yam (Elephant Foot Yam)",
        "tamil_name": "சேனைக்கிழங்கு",
        "description": "Versatile Elephant Foot Yam, known for its firm texture. Best suited for spicy roasts, fry, or traditional kuzhambu varieties.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 45.00, "stock": 90, "trend_status": False,
        "expiry_date": "2026-03-10"
    },
    {
        "name": "Colocasia (Seppankizhanggu)",
        "tamil_name": "சேப்பங்கிழங்கு",
        "description": "Tender Taro roots that become wonderfully crispy when fried. A favorite side dish for variety rice and South Indian meals.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 40.00, "stock": 100, "trend_status": False,
        "expiry_date": "2026-03-05"
    },
    {
        "name": "Turnip",
        "tamil_name": "டர்னிப் (நூல்கோல்)",
        "description": "Crisp and mild-flavored turnips. A healthy addition to sambar, stews, or lightly sautéed vegetable preparations.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 30.00, "stock": 60, "trend_status": False,
        "expiry_date": "2026-02-24"
    },
    {
        "name": "Small Yam (Karunai Kizhanggu)",
        "tamil_name": "கருணைக் கிழங்கு",
        "description": "Small medicinal yams, traditionally used for their health benefits. Best prepared as a mashed masiyal or spicy roast.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 50.00, "stock": 70, "trend_status": False,
        "expiry_date": "2026-03-10"
    },
    {
        "name": "Chinese Potato (Siru Kizhanggu)",
        "tamil_name": "சிறு கிழங்கு",
        "description": "Tiny and flavorful Chinese potatoes, a seasonal delicacy. Known for their unique taste when roasted with spices.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 60.00, "stock": 50, "trend_status": False,
        "expiry_date": "2026-02-28"
    },
    {
        "name": "Turmeric Root (Raw)",
        "tamil_name": "பச்சை மஞ்சள்",
        "description": "Fresh raw turmeric roots, highly medicinal and antiseptic. Used in traditional cooking, teas, and during festive occasions.",
        "subcategory_id": 4,
        "is_active": True, "weight": "250 gm", "price": 30.00, "stock": 40, "trend_status": False,
        "expiry_date": "2026-03-15"
    },
    {
        "name": "Arrowroot (Koova Kizhanggu)",
        "tamil_name": "கூவைக் கிழங்கு",
        "description": "Nutritious Arrowroot, known for its cooling properties and digestive benefits. Often used to make healthy porridges.",
        "subcategory_id": 4,
        "is_active": True, "weight": "500 gm", "price": 55.00, "stock": 30, "trend_status": False,
        "expiry_date": "2026-03-05"
    },

    # --- Subcategory 5: Mushrooms & Exotic ---
    {
        "name": "Button Mushroom",
        "tamil_name": "பட்டன் காளான்",
        "description": "Fresh and plump white button mushrooms. A versatile ingredient perfect for stir-fries and traditional Indian masalas.",
        "subcategory_id": 5, "is_active": True, "weight": "200 gm", "price": 50.00, "stock": 60, "trend_status": False,
        "expiry_date": "2026-02-21"
    },
    {
        "name": "Oyster Mushroom",
        "tamil_name": "சிப்பிக் காளான்",
        "description": "Delicate and velvet-textured Oyster mushrooms. Known for their unique shape and mild savory flavor.",
        "subcategory_id": 5, "is_active": True, "weight": "200 gm", "price": 60.00, "stock": 40, "trend_status": False,
        "expiry_date": "2026-02-20"
    },
    {
        "name": "Milky Mushroom",
        "tamil_name": "பால் காளான்",
        "description": "Bright white and firm Milky mushrooms. These have a long shelf life and a robust flavor.",
        "subcategory_id": 5, "is_active": True, "weight": "200 gm", "price": 70.00, "stock": 30, "trend_status": False,
        "expiry_date": "2026-02-23"
    },
    {
        "name": "Shiitake Mushroom",
        "tamil_name": "ஷிடேக் காளான்",
        "description": "Premium exotic Shiitake mushrooms. Highly valued for their rich, smoky flavor and medicinal properties.",
        "subcategory_id": 5, "is_active": True, "weight": "100 gm", "price": 150.00, "stock": 20, "trend_status": False,
        "expiry_date": "2026-02-21"
    },
    {
        "name": "Fresh Sweet Corn",
        "tamil_name": "இனிப்பு சோளம்",
        "description": "Golden and juicy fresh sweet corn on the cob. Naturally sweet and perfect for boiling or roasting.",
        "subcategory_id": 5, "is_active": True, "weight": "1 Piece", "price": 25.00, "stock": 100, "trend_status": False,
        "expiry_date": "2026-02-24"
    },
    {
        "name": "Baby Corn (Pack)",
        "tamil_name": "பேபி கார்ன்",
        "description": "Tender and crunchy young corn. An essential ingredient for Chinese cuisine and crispy starters.",
        "subcategory_id": 5, "is_active": True, "weight": "250 gm", "price": 45.00, "stock": 50, "trend_status": False,
        "expiry_date": "2026-02-23"
    },
    {
        "name": "Asparagus (Premium)",
        "tamil_name": "அஸ்பாரகஸ்",
        "description": "Tender green asparagus spears. A gourmet vegetable rich in nutrients, best enjoyed grilled.",
        "subcategory_id": 5, "is_active": True, "weight": "250 gm", "price": 180.00, "stock": 15, "trend_status": False,
        "expiry_date": "2026-02-21"
    },
    {
        "name": "Zucchini (Green/Yellow)",
        "tamil_name": "சுக்கினி",
        "description": "Fresh and firm exotic zucchini. Low in calories and perfect for healthy roasting.",
        "subcategory_id": 5, "is_active": True, "weight": "500 gm", "price": 75.00, "stock": 30, "trend_status": False,
        "expiry_date": "2026-02-22"
    }
]
