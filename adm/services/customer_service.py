import json
from django.http import FileResponse
# from redis import Redis
# from rq import Queue
from ..models import *
from django.core.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import APIException
from datetime import datetime
from .file_service import *
import logging
import uuid
# from ..tasks.task import *
logger = logging.getLogger('django')


def create_customer(user_name,**data):
    try:
        user = User.objects.filter(email = data.get('email')).first()
        if user is not None:
            raise APIException("Email id Already exists")
        user = User.objects.create_user(data.get('email'),data.get('email'),data.get('password'))
        user.role.add(data.get("role_id"))
        user.first_name=data.get('username')
        user.last_name=data.get('last_name')
        user.mobile=data.get('mobile_number')
        user.gender = data.get('gender')
        user.ending_date = data.get('ending_date')
        user.address = data.get('address')
        user.validate_token = User.objects.make_random_password(10) + uuid.uuid4().hex[:6].upper() 
        print("fs")
        print(data.get('user_profile'))
        fl_upd = FileUpload.objects.filter(tmp_file_name=data.get('user_profile')).first()
        print("fl_upd",fl_upd)
        if fl_upd is not None:
            print("done")
            disp_name = get_random_string(length=12) + "_" + fl_upd.orig_file_name
            dest_file_name = 'storage/user/user_profile/'
            fl_upd.storage_file_name = dest_file_name + disp_name
            fl_upd.save()
            user.user_profile = fl_upd.storage_file_name
            print(1)
            move_tmp_file(fl_upd.id)
            print("done2")
        # user.save()
        #new_user_verification(user_id)
        user.save()
        data["user_id"] = user.id
        # logger.info(4)

        # update user_id in sp_table
        # if role.name == 'sales_person':
        #     if sp_status == True:
        #         update_user_id_in_sp(**data)

        # 
        
        
        return user.id
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


# def fetch_all_customer_data():
#     try:
#         data = User.objects.all().values('first_name','email','username','is_active','user_profile','role_id')
#         return data
#     except Exception as e:
#         raise APIException(e)

from django.contrib.postgres.aggregates import ArrayAgg

def fetch_all_customer_data():
    try:
        return (
            User.objects
            .annotate(role_names=ArrayAgg('role__name', distinct=True))
            .values(
                'first_name',
                'email',
                'username',
                'is_active',
                'user_profile',
                'role_names'
            )
        )

        

        
    except Exception as e:
        raise APIException(str(e))





