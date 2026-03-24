from django.db import models
from adm.models.customer_profile import CustomerProfile
from adm.models.products import Product
from adm.models.delete_base_model import SafeDeleteModel

class Wishlist(SafeDeleteModel):
    user = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name="wishlist")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username 
    
    class Meta:
        db_table = 'biz_wishlist'