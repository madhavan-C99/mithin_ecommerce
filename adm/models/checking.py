from django.db import models
from .delete_base_model import SafeDeleteModel


class Checking(SafeDeleteModel):
    name = models.CharField(max_length = 20)

    class Meta:
        db_table = 'checking'