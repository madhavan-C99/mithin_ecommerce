import json
from django.http import FileResponse
# from redis import Redis
# from rq import Queue
from ..models import *
from django.core.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import APIException
import datetime
from django.contrib.auth.hashers import check_password
import logging
import uuid
from ..services.collection_query_service import exec_raw_sql
from django.db.models import Q
# from ..tasks.task import *
from django.db import connection
logger = logging.getLogger('django')


def create_user(user_name,**data):
    try:
        user = User.objects.filter(email = data.get('email')).first()
        if user is not None:
            raise APIException("Email id Already exists")
        # password = data.get("email_id")[:3]+"1234"
        user = User.objects.create_user(data.get('email'),data.get('email'),data.get('password'))
        user.role.add(data.get("role_id"))
        user.first_name=data.get('name')
        user.last_name=data.get('last_name')
        # user.is_active=True
        user.mobile=data.get('mobile_number')
        user.gender = data.get('gender')
        user.ending_date = data.get('ending_date')
        user.address = data.get('address')
        user.validate_token = User.objects.make_random_password(10) + uuid.uuid4().hex[:6].upper()

        user.save()
        data["user_id"] = user.id

        
        
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

        roles = Role.objects.filter(code__in=["DEV", "ADM"])

        # 3. Loop panni rendu role-kum permission-a add panrathu
        for role in roles:
            add_perm_to_role(**{'role_id': role.id, 'perm_id': perm.id})
            print(f"Permission added to role: {role.code}")

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
       
        if user is None or user.is_anonymous:
            print(user)
            raise PermissionDenied("Authentication required")

       
        perm = Perm.objects.filter(
            roles__user=user,
            name=perm_name
        ).exists()
        print(perm)
        if not perm:
            raise PermissionDenied("Permission denied")

        return True

    except PermissionDenied:
        raise
    except Exception as e:
        raise APIException(str(e))


def fetch_all_user_data():
    try:
        data = User.objects.all().values('first_name','email','username','is_active')
        return data
    except Exception as e:
        raise APIException(e)