from rest_framework import serializers
from .models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    group_info = serializers.SerializerMethodField(read_only=True)
    subject_info = serializers.SerializerMethodField(read_only=True)
    teacher_info = serializers.SerializerMethodField(read_only=True)

    def get_group_info(self, obj):
        return {"id": obj.group.id, "name": str(obj.group)} if obj.group else None

    def get_subject_info(self, obj):
        return {"id": obj.subject.id, "name": str(obj.subject)} if obj.subject else None

    def get_teacher_info(self, obj):
        return {"id": obj.teacher.id, "name": str(obj.teacher)} if obj.teacher else None

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
