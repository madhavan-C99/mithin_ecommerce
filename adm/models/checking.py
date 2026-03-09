from django.db import models

class Checking(models.Model):
    name = models.CharField(max_length = 20)

    class Meta:
        db_table = 'checking'