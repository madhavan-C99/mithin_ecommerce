import time
from django.apps import apps
from huey.contrib.djhuey import task
from huey.contrib.djhuey import periodic_task
from huey import crontab
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.core.cache import cache
from django.conf import settings
from ..models.user import User


@task()
def print_users():
   # a=User.objects.all().values('first_name','email','role_id')

    for i in a:
        print(i)
        time.sleep(1)
    print('all data printed')



@periodic_task(crontab(minute='*'))
def users():
    # User = apps.get_model('adm', 'User')
    from adm.models import User

    current=cache.get('huey_users',0)
    limit=5

    users_query = User.objects.all()[current: current+ limit]

    user_data_list = []
    for user in users_query:
        user_dict = {
            "id": user.id,
           # "username": user.username,
           # "email": user.email
        }
        user_data_list.append(user_dict)

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "user_updates_group", 
        {
            "type": "send_user_data", 
            "data": user_data_list
        }
    )

    total_users = User.objects.count()
    new_current=current+ limit

    if new_current >= total_users:
        cache.set('huey_users',0)
    else:
        cache.set('huey_users',new_current)



