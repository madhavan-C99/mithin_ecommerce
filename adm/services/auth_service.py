import datetime
import random
import re
from datetime import timedelta
from django.contrib.auth import authenticate
from django.db.models import Q
from django.utils import timezone
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password,check_password
from ..models.role import Role
from ..models.customer_profile import CustomerProfile
from ..models import User, OTPVerification
from ..models.admin_profile import AdminProfile
from ..tasks.mailtask import *
# from ..task.task import send_email_otp


def create_token(**data):
    mobile_number=data.get('mobile_number')
    email=data.get('email')
    user = User.objects.filter(email=email).first()

    customer=CustomerProfile.objects.filter(user=user).first()
    admin=AdminProfile.objects.filter(user=user).first()

    roles=[]

    if admin:
        roles.append("admin")
        if hasattr(admin, 'name') and admin.name:
            name = admin.name
    
    elif customer:
        roles.append("customer")
        if hasattr(customer, 'name') and customer.name:
            name = customer.name
    else:
        name = "Guest"

    if not roles:
        role = "Guest User"
    else:
        role = roles

    if not user:
        raise AuthenticationFailed(detail='User Not Found')
    
    if not user.is_active:
        raise AuthenticationFailed(detail='Your account has been blocked. Please contact support for assistance.')

    user.last_login = datetime.datetime.now()
    user.save(update_fields=["last_login"])

    refresh_tkn = RefreshToken.for_user(user)
    access_tkn = refresh_tkn.access_token

    user_data = {
        "user_id": user.id,
        "name":name,
        "mobile": getattr(user, 'mobile', None),
        "email": user.email,
        "roles":role
    }

    return str(access_tkn), user_data


def generate_otp(data):
    try:
        # user = User.objects.filter(mobile=mobile).first()
        # if not user:
        #     raise APIException("Email not found. Please enter a valid registered email.")
        email=data.get('email')
        otp = str(random.randint(100000, 999999))
        current_time = timezone.now()
        expires = current_time + timedelta(minutes=5)

        table = OTPVerification.objects.create(
            mobile_number=str(data.get('mobile')),
            email=email, #for testing purpose 
            otp_sent_time=current_time,
            otp_hash=make_password(otp),
            expires_at=expires
        )
        send_otp_email(email,otp)
        # send_otp(mobile, otp)


        return {
            "message": "OTP sent successfully. Please check your message.",
            "otp_id": table.id,
            "otp":otp
        }
    except Exception as e:
        raise APIException(str(e))


def verify_otp(**data):
    try:
        otp=data.get('otp')
        otp_obj = OTPVerification.objects.filter(id=data.get('otp_id')).first()
        if not otp_obj:
            raise APIException("OTP record not found")

        current_time = timezone.now()
        minutes_difference = (current_time - otp_obj.otp_sent_time).total_seconds() / 60

        if not check_password(otp,otp_obj.otp_hash):
            return {"message": "You have entered the wrong OTP", "verify": False}

        if minutes_difference >= 5:
            return {"message": "Your OTP has expired", "verify": False}

        otp_obj.verified_at = current_time
        otp_obj.is_used=True
        otp_obj.save(update_fields=["verified_at","is_used"])

        return {"message": "OTP Verified successfully", "verify": True}

    except Exception as e:
        raise APIException(str(e))


def verify_otp_and_create_token(**data):
    try:

        otp_response=verify_otp(**data)

        otp_record=OTPVerification.objects.filter(id=data.get('otp_id')).first()

        mobile=otp_record.mobile_number
        email=otp_record.email #for testing

        if otp_response.get("verify") is True:
            # user_obj=User.objects.filter(mobile=mobile).first()
            user_obj=User.objects.filter(email=email).first()

            if user_obj:
                message="Login Successful."
            else:
                user_obj=User.objects.create(is_active=True,email=email,
                                             is_verified=True,profile_completed=False)
                
                cust_role=Role.objects.filter(name__iexact='customer').first()

                user_obj.role.add(cust_role)

                message="Account Created and Login Successful."
                
            token_response,user_details=create_token(email=email)

            return {
                "status": "success",
                "token": token_response,
                "user": user_details,
                "message": message,
                "is_new_user": not user_obj.profile_completed 
            }
        return otp_response
        
    except Exception as e:
        raise APIException(e)