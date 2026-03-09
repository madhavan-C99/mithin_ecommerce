from django.db import models
from .user import User

class AdminProfile(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
    email=models.EmailField(db_index=True,unique=True)
    password=models.CharField(max_length=200)
    is_active=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.CharField(max_length=50)
    updated_at=models.DateTimeField(auto_now=True)
    updated_by=models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table='adm_admin_profile'