from django.db import models
from .products import Product
from biz.models.order import Order
from .delete_base_model import SafeDeleteModel


class Notification(SafeDeleteModel):

    title = models.CharField(max_length=100)

    message = models.CharField(max_length=255)

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    created_by = models.CharField(max_length=50)

    updated_at = models.DateTimeField(auto_now=True)

    updated_by = models.CharField(max_length=50)

    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.title