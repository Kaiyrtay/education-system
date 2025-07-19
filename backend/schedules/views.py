from rest_framework.views import APIView
from teachers.models import Teacher
from students.models import Student
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ScheduleSerializer
from .models import Schedule
from rest_framework import viewsets, permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_staff


class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Schedule.objects.select_related("group", "subject", "teacher").all()

        return Schedule.objects.none()


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
