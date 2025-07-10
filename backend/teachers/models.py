from django.db import models
from django.conf import settings


# Create your models here.
class Teacher(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return (
            f"{self.user.first_name} {self.user.last_name}".strip()
            or self.user.username
        )
