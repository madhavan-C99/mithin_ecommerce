from django.db import models
from adm.models.products import Product
from .order import Order
from adm.models.delete_base_model import SafeDeleteModel


class OrderItems(SafeDeleteModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    weight=models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    unit_price = models.FloatField()
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} (x{self.quantity})"

    class Meta:
        db_table = 'biz_order_items'