from django.db import models
from django.apps import apps
from django.forms.models import model_to_dict

class SafeDeleteModel(models.Model):
    class Meta:
        abstract = True

    def delete(self):
        return None

    def save_delete(self, user_id=None):
        LogModel = apps.get_model('adm', 'DeletedDataLog')
        
        obj_data = model_to_dict(self)
        
        LogModel.objects.create(
            table_name=self._meta.db_table,
            row_id=self.id,
            data=obj_data,
            deleted_by_id=user_id
        )

        return super(SafeDeleteModel, self).delete()