from rest_framework import serializers
from .models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"

    def validate(self, data):
        teacher = data["teacher"]
        week_day = data["week_day"]
        start_time = data["start_time"]
        end_time = data["end_time"]

        instance_id = self.instance.id if self.instance else None

        conflict = (
            Schedule.objects.filter(teacher=teacher, week_day=week_day)
            .exclude(id=instance_id)
            .filter(start_time__lt=end_time, end_time__gt=start_time)
            .exists()
        )

        if conflict:
            raise serializers.ValidationError(
                "Teacher already has another subject scheduled during this time."
            )

        return data
