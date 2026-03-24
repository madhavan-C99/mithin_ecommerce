from ..models import *
from django.db.models import Window,F
from django.db.models.functions import RowNumber
from rest_framework.exceptions import APIException
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
import random
import datetime
from .auth_service import create_token


def create_admin_user(**data):
    try:
        email=data.get('email')
        password=data.get('password')
        confirm_password=data.get('confirm_password')

        user_list=AdminProfile.objects.filter(email=email).first()

        if user_list:
            return "This Email Id is already used."

        if password != confirm_password:
            return "Password and Confirm_Password wants must be same."
        
        user=User.objects.create(mobile=data.get('mobile'),email=data.get('email'))
        
        role=Role.objects.filter(name__iexact="admin").first()

        user.role.add(role)
        user.is_active=True
        user.is_verified=True
        user.profile_completed=True
        user.save()
        hashed_pwd=make_password(password)
        admin_user=AdminProfile.objects.create(name=data.get('name'),email=email,password=hashed_pwd,user=user)
        admin_user.is_active=True
        admin_user.save()

        return {'user_id':admin_user.id,
                'message':'Admin User Created'}
        
    except Exception as e:
        raise APIException(e)


def validate_email(**data):
    try:
        email=data.get('email')
        password=data.get('password')

        if not email and not password:
            raise APIException("Email and Password Required")
        
        adm_user=AdminProfile.objects.filter(email=email,is_active=True).select_related('user').first()

        if adm_user:
            main_user=adm_user.user
            if not check_password(password, adm_user.password):
                raise APIException('Invalid Password.')
            if not main_user.role.filter(name__iexact='admin').exists():
                raise APIException('Admin role required.')
            
            token_response,user_details=create_token(email=email)

            return {
                "status": "success",
                "token": token_response,
                "user": user_details,
                "message": "Admin Login Successful"
            }
        else:
            raise APIException('User not Found.')
 

    except Exception as e:
        raise APIException(e)   
    

def fetch_all_admin():
    try:
        user=AdminProfile.objects.annotate(role_name=F('user__role__name'),s_no=Window(expression=RowNumber())).values('s_no','id','name',
                                         'email','is_active','role_name').all()
        return list(user)
    except Exception as e:
        raise APIException(e)