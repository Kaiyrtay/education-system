from rest_framework import viewsets, permissions
from .models import Teacher
from .serializers import TeacherSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_staff


class TeacherViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Teacher.objects.select_related("user").all()

        if hasattr(user, "teacher"):
            return Teacher.objects.filter(id=user.teacher.id)

        if hasattr(user, "student"):
            student_group = user.student.group
            return Teacher.objects.filter(schedule__group=student_group).distinct()

        return Teacher.objects.none()
