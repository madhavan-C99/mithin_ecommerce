from django.db import models
from .delete_base_model import SafeDeleteModel



class OTPVerification(SafeDeleteModel):
    mobile_number=models.CharField(max_length=15)
    email=models.EmailField(db_index=True,null=True,blank=True)
    otp_hash=models.CharField(max_length=250)
    otp_sent_time=models.DateTimeField(auto_now_add=True)
    expires_at=models.DateTimeField()
    verified_at=models.DateTimeField(auto_now_add=False,null=True)
    is_used=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)

    def __str__(self):
        return self.mobile_number
    
    class Meta:
        db_table='adm_otp_verification'