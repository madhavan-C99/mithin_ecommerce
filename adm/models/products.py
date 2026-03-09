from django.db import models
from .category import *


class Product(models.Model):
    name=models.CharField()
    tamil_name=models.CharField(blank=True)
    product_image=models.CharField(max_length=500, null=True)
    product_img=models.ImageField(upload_to="product_snap", null=True)
    description=models.TextField(max_length=200)
    subcategory=models.ForeignKey(SubCategory,on_delete=models.CASCADE,related_name='product')
    is_active=models.BooleanField(default=True)
    weight=models.FloatField(default=1000,null=True)
    unit=models.CharField(null=True)
    price=models.FloatField()
    stock=models.IntegerField(null=True)
    expiry_date=models.DateField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)

    
    def __str__(self):
        return self.name
    
    class Meta:
        db_table="adm_products"

class TrendingProduct(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,null=True, blank=True)
    subcategory=models.ForeignKey(SubCategory,on_delete=models.CASCADE,null=True, blank=True)
    current_trending_status=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)

    def __str__(self):
        return self.product.name
    
    class Meta:
        db_table="adm_trendingproducts"   
    
    
    