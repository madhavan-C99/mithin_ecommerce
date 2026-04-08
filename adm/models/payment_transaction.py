from django.db import models
from .customer_profile import *
from .user import User
from biz.models.order import *

class RazorpayOrder(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    amount=models.FloatField()
    gateway_order_id=models.CharField(unique=True)
    order= models.ForeignKey(Order,on_delete=models.CASCADE)
    status=models.CharField()
    receipt = models.CharField()
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)
    
    def __str__(self):
        return str(self.user_id)
    
    class Meta:
        db_table="adm_razorpay_order"
        
        

class Transaction(models.Model):
    payment_id=models.CharField()
    razorpay_order=models.ForeignKey(RazorpayOrder,on_delete=models.CASCADE)
    signature=models.CharField()
    amount=models.FloatField()
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    payment_status=models.CharField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50,null=True)

    def __str__(self):
       return str(self.payment_id)
    class Meta:
        db_table="adm_transaction"