from huey.contrib.djhuey import task
from ..models.api_log import Api_Log

@task()
def api_history_log(data):
    data=Api_Log.objects.create(user_id=data.get('user_id'),api_name=data.get('api_name'),
                                method=data.get('method'),request_payload=data.get('request_payload'),
                                response_payload=data.get('response_payload'),status=data.get('status_code'))