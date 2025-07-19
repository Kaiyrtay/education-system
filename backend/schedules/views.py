from rest_framework.views import APIView
from teachers.models import Teacher
from students.models import Student
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import ScheduleSerializer
from .models import Schedule

# Create your views here.


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.select_related("group", "subject", "teacher")
    serializer_class = ScheduleSerializer


class MyScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == "student":
            try:
                student = Student.objects.get(user=user)
                schedules = Schedule.objects.filter(group=student.group)
            except Student.DoesNotExist:
                return Response({"detail": "Student profile not found."}, status=404)

        elif user.role == "teacher":
            try:
                teacher = Teacher.objects.get(user=user)
                schedules = Schedule.objects.filter(teacher=teacher)
            except Teacher.DoesNotExist:
                return Response({"detail": "Teacher profile not found."}, status=404)

        else:
            return Response({"detail": "Admins do not have schedules."}, status=403)

        serialized = ScheduleSerializer(schedules, many=True)
        return Response(serialized.data)
