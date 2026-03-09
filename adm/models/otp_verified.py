from django.db import models
from .user import * 

class OTPVerified(models.Model):
    user =  models.ForeignKey(User,on_delete=models.CASCADE)
    email_id = models.EmailField(max_length=100)
    otp = models.IntegerField()
    otp_sent_time = models.DateTimeField(auto_now_add=True)
    expired_in_min = models.IntegerField()
    verified_otp_time = models.DateTimeField(auto_now_add=False,null=True)
    
    created_by = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.CharField(max_length=50)

    def __str__(self):
         return self.email_id
    class Meta:
         db_table = 'otp_verified'