from ..models import *
from rest_framework.exceptions import APIException
import random
import datetime

def validate_email(**data):
    try:
        user=User.objects.filter(email=data.get('email'),is_active=True).first()
        if user:
            new_otp=random.randint(100000, 999999)
            current_time=datetime.datetime.now()
            new_entry=OTPVerified.objects.create(user_id=data.get('user_id'),email_id=data.get('email'),
                                                otp=int(new_otp),expired_in_min=5,verified_otp_time=current_time,
                                                created_by=data.get('username'))
            data={}
            data.update({
                'message':'OTP sent Successfully & please your Email',
                'otp':new_otp,'user_id':user.id,
                'otp_id':new_entry.id
            })
            return data
        else:
            raise APIException('This Email is not registered on our site')
    except Exception as e:
        raise APIException(e)