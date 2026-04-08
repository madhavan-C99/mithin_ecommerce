from django.db import models
from .delete_base_model import SafeDeleteModel


class Category(SafeDeleteModel):
    name = models.CharField(max_length=100) 
    description = models.TextField(max_length=500, blank=True, null=True)
    category_img=models.ImageField(upload_to="media/category_snaps",null=True)
    is_active=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)
    
    
    def __str__(self):
        return self.name
    
    class Meta:
        db_table="adm_category"
        
        
class SubCategory(SafeDeleteModel):
    name = models.CharField(max_length=100) 
    description = models.TextField(max_length=500, blank=True, null=True)
    category=models.ForeignKey(Category,on_delete=models.CASCADE, related_name='subcategory')
    subcategory_img=models.ImageField(upload_to="subcategory_snap",null=True)
    is_active=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)
    
    
    def __str__(self):
        return self.name
    
    class Meta:
        db_table="adm_subcategory"