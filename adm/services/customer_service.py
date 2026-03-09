import json
from django.http import FileResponse
from django.db.models import Window,F
from django.db.models.functions import RowNumber
# from redis import Redis
# from rq import Queue
from ..models import *
from django.core.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.db import transaction
from rest_framework.exceptions import APIException
from datetime import datetime
from .file_service import *
import logging
import uuid
# from ..tasks.task import *
logger = logging.getLogger('django')


def create_customer(**data):
    try:
        user = User.objects.filter(id= data.get('user_id'))
        if not user.exists():
            raise APIException("User not Found")
        
        if CustomerProfile.objects.filter(email=data.get('email')).exists():
            raise APIException("Email Id Already Used.")
        
        customer_profile=CustomerProfile.objects.create(user=user.first(),name=data.get('username'),email=data.get('email'))

        user.update(profile_completed=True)
        return customer_profile.id
    except Exception as e:
        raise APIException(e)
    


def add_perm_to_role(**data):
    try:
        role = None
        if data.get('role_id', None) is not None:
            role = Role.objects.filter(id=data.get('role_id')).first()
        elif data.get('role_name', None) is not None:
            role = Role.objects.filter(name=data.get('role_name')).first()
        elif data.get('role_code', None) is not None:
            role = Role.objects.filter(code=data.get('role_code')).first()

        if not role:
            raise ValidationError("Role not available for the given params.")

        perm = None
        if data.get('perm_id', None) is not None:
            perm = Perm.objects.filter(id=data.get('perm_id')).first()
        elif data.get('perm_name', None) is not None:
            perm = Perm.objects.filter(name=data.get('perm_name')).first()
        elif data.get('perm_code', None) is not None:
            perm = Perm.objects.filter(code=data.get('perm_code')).first()

        if not perm:
            raise ValidationError("Permission not available for the given params.")

        role.perms.add(perm)
        return "done"

    except Exception as e:
        raise APIException(e)

def create_permission(user_name, **data):
    try:
        perm = Perm(name=data.get('name'), display_value=data.get('display_value'), code=data.get('code'),
                     perm_group=data.get('perm_group'), perm_cat=data.get('perm_cat'), created_by=user_name)
        
        
        perm.save()

        # Add the newly added permission automtically to selected roles.
        surole = Role.objects.filter(code="DEV").first()
        if surole is not None:
            add_perm_to_role(**{'role_id': surole.id, 'perm_id': perm.id})

        return perm.name

    except Exception as e:
        raise APIException(e)


def create_role(user_name, **data):
    try:
        role = Role(name=data.get('name'), display_value=data.get('display_value'), code=data.get('code'),description = data.get('description'),
                     created_by=user_name)
        role.save()
        return role.code

    except Exception as e:
        raise APIException(str(e))
    


def authorize_request(perm_name, user):
    try:
        
        #if user is not None:
            #user.last_login = timezone.now()
            #user.save(update_fields=['last_login'])
        #return user
        
        if perm_name in user.get_perms():       
            pass
        
        else:
            raise PermissionDenied("Not Authorized to use this API")
    except Exception as e:
        raise APIException(e)


def fetch_all_customer_data():
    try:
        user=CustomerProfile.objects.annotate(mobile=F('user__mobile'),active=F('user__is_active'),s_no=Window(expression=RowNumber()),
                                              role_name=F('user__role__name')).values('s_no','id','name','email','mobile',
                                                                                  'active','role_name').all().order_by('id')
        return list(user)
    except Exception as e:
        raise APIException(e)
    

def fetch_one_customer_data(data):
    try:
        user=CustomerProfile.objects.filter(user_id=data.get('user_id')).annotate(mobile=F('user__mobile')).values('id','name','mobile','email').first()
        if not user:
            return "User Not Found"
        return user
    except Exception as e:
        raise APIException(e)
    
def update_customer_data(**data):
    try:
        user=User.objects.filter(id=data.get('user_id')).first()
        customer=CustomerProfile.objects.filter(user_id=data.get('user_id')).first()
        updated=False

        if not user:
            return "User not found."
        
        if not customer:
            return "Customer Profile not found."
        
        if 'name' in data:
            customer.name=data.get('name')
            updated=True
        if 'mobile' in data:
            user.mobile=data.get('mobile')
            updated=True
        if 'email' in data:
            customer.email=data.get('email')
            user.email=data.get('email')
            updated=True
        if updated:
            with transaction.atomic():
                customer.save(update_fields=['name','email'])
                user.save(update_fields=['mobile','email'])
                return "Profile Updated Successfully."
        return "No Fields are Updated"
    except Exception as e:
        raise APIException(e)
        


def change_customer_status(data):
    try:
        customer=CustomerProfile.objects.filter(id=data.get('user_id')).first()

        if customer:    
            user=customer.user
            user.is_active = not user.is_active
            user.save(update_fields=['is_active'])
            return {"message":"User Active Status Changed.",
                    "current_status":user.is_active}
        else:
            return "User Not Found."
    except Exception as e:
        raise APIException(e)


