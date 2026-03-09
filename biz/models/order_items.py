from django.db import models
from adm.models.products import Product
from .order import Order

class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
    weight=models.FloatField(max_length=50)
    quantity = models.PositiveIntegerField()
    unit_price = models.FloatField()
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} (x{self.quantity})"

    class Meta:
        db_table = 'biz_order_items'