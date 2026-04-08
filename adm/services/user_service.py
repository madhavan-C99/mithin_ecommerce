import logging
import uuid
from django.core.exceptions import ValidationError, PermissionDenied
from rest_framework.exceptions import APIException
from django.contrib.auth.hashers import check_password
from django.db import connection
from django.db.models import Q
from django.db.models import F

from ..models import *
# from ..services.collection_query_service import exec_raw_sql

logger = logging.getLogger('django')


def create_user(user_name, **data):
    try:
        if User.objects.filter(email=data.get("email")).exists():
            raise APIException("Email id already exists")

        if User.objects.filter(mobile=data.get("mobile_number")).exists():
            raise APIException("Mobile already exists")

        user = User.objects.create_user(
            data.get("email"),
            data.get("email"),
            data.get("password")
        )

        user.first_name = data.get("name")
        user.is_active = True
        user.mobile = data.get("mobile_number")
        user.validate_token = User.objects.make_random_password(10) + uuid.uuid4().hex[:6].upper()
        user.save()

        if data.get("role_id"):
            user.role.add(data.get("role_id"))

        return user.id

    except Exception as e:
        raise APIException(e)


def add_perm_to_role(**data):
    try:
        role = None
        if data.get("role_id"):
            role = Role.objects.filter(id=data.get("role_id")).first()
        elif data.get("role_name"):
            role = Role.objects.filter(name=data.get("role_name")).first()
        elif data.get("role_code"):
            role = Role.objects.filter(code=data.get("role_code")).first()

        if not role:
            raise ValidationError("Role not available for the given params")

        perm = None
        if data.get("perm_id"):
            perm = Perm.objects.filter(id=data.get("perm_id")).first()
        elif data.get("perm_name"):
            perm = Perm.objects.filter(name=data.get("perm_name")).first()
        elif data.get("perm_code"):
            perm = Perm.objects.filter(code=data.get("perm_code")).first()

        if not perm:
            raise ValidationError("Permission not available for the given params")

        role.perms.add(perm)
        return "done"

    except Exception as e:
        raise APIException(e)


def create_permission(user_name, **data):
    try:
        perm = Perm.objects.create(
            name=data.get("name"),
            display_value=data.get("display_value"),
            code=data.get("code"),
            created_by=user_name
        )


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
        role = Role.objects.create(
            name=data.get("name"),
            display_value=data.get("display_value"),
            code=data.get("code"),
            description=data.get("description"),
            created_by=user_name
        )
        return role.code

    except Exception as e:
        raise APIException(e)


def authorize_request(perm_name, user):
    try:
       
        if user is None or user.is_anonymous:
            print(user)
            raise PermissionDenied("Authentication required")

       
        perm = Perm.objects.filter(
            roles__users=user,
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


def all_users():
    try:
        customers=list(CustomerProfile.objects.annotate(user_status=F('user__is_active')).values(
            'id', 'user_id', 'name', 'email', 'user_status', 'user__mobile'
        ))
        admins=list(AdminProfile.objects.annotate(user_status=F('is_active')).values(
            'id', 'user_id', 'name', 'email', 'user_status', 'user__mobile'
        ))

        overall_data=[]

        for c in customers:
            c['role'] = 'customer'
            overall_data.append(c)

        for a in admins:
            a['role'] = 'admin'
            overall_data.append(a)

        for index, user in enumerate(overall_data, start=1):
            user['s_no'] = index
        
        return {'users':overall_data}
    except Exception as e:
        raise APIException(e)