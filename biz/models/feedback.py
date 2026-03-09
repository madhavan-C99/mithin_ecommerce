from django.db import models
from adm.models.user import User
from adm.models.products import Product

class Feedback(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    comment=models.TextField()
    created_at=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    class Meta:
        db_table='biz_feedback'