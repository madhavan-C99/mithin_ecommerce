from django.db import models
from .cart import Cart
from adm.models.products import Product

class CartItems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    weight=models.FloatField()
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.FloatField()
    total_price=models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    class Meta:
        db_table = 'biz_cart_items'