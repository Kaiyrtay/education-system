from django.db import models
from students.models import Group
from subjects.models import Subject
from teachers.models import Teacher

# Create your models here.

WEEKDAYS = [
    (0, "Monday"),
    (1, "Tuesday"),
    (2, "Wednesday"),
    (3, "Thursday"),
    (4, "Friday"),
    (5, "Saturday"),
    (6, "Sunday"),
]


class Schedule(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="schedule")
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name="schedule"
    )
    teacher = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, related_name="schedule"
    )
    week_day = models.IntegerField(choices=WEEKDAYS)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.group.code} | {self.subject.code} | {self.get_week_day_display()} {self.start_time}-{self.end_time}"
