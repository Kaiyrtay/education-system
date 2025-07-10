from django.db import models
from django.conf import settings


# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.code


class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    group = models.ForeignKey(
        "Group", on_delete=models.SET_NULL, null=True, related_name="students"
    )

    def __str__(self):
        return (
            f"{self.user.first_name} {self.user.last_name}".strip()
            or self.user.username
        )
