from django.db import models


# Create your models here.
class Subject(models.Model):
    code = models.CharField(max_length=25, unique=True)
    name = models.CharField(max_length=255)
    desc = models.TextField(blank=True)

    def __str__(self):
        return self.code
