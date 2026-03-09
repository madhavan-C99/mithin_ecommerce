from ..models.feedback import Feedback
from rest_framework.exceptions import APIException

def add_feedback(**data):
    try:
        feedback=Feedback.objects.create(product_id=data.get('product_id'),user_id=data.get('user_id'),
                                         comment=data.get('comment'))
        return "Feedback Submitted Successfully."
    except Exception as e:
        raise APIException(e)
    
def fetch_one_feedback(data):
    try:
        prod_feedback=Feedback.objects.filter(product_id=data.get('product_id'))

        final_result=[]
        for feedback in prod_feedback:
            final_result.append({
                "id":feedback.id,
                "user":feedback.user.username,
                "comment":feedback.comment
            })

        return final_result
    except Exception as e:
        raise APIException(e)
    