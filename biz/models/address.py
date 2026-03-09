from django.db import models
from adm.models.customer_profile import CustomerProfile

class Address(models.Model):
    user = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name="users")
    name=models.CharField(max_length=50)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)

    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.address_line1}, {self.city}"

    class Meta:
        db_table = "biz_address"
