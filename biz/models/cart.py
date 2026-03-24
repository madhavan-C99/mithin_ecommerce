from django.db import models
from adm.models.customer_profile import CustomerProfile
from adm.models.delete_base_model import SafeDeleteModel


class Cart(SafeDeleteModel):
    user = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name="carts")
    total_price = models.FloatField()
    is_ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        user_email = str(self.user.email) if self.user and self.user.email else "Unknown User"
        return f"Cart: {user_email}"

    class Meta:
        db_table = 'biz_cart'