from django.db import models
from adm.models.user import User
from .address import Address

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    total_amount = models.FloatField()
    order_number=models.CharField(max_length=20 )
    status = models.CharField(max_length=50, default='Pending') # Pending, Shipped, Delivered, Cancelled
    payment_status = models.BooleanField(default=False)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    class Meta:
        db_table = 'biz_order'