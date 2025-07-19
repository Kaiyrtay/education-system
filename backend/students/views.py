from rest_framework import viewsets, permissions
from .models import Student, Group
from .serializers import StudentSerializer, GroupSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_staff


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Group.objects.all()

        if hasattr(user, "teacher"):
            return Group.objects.filter(schedule__teacher=user.teacher).distinct()

        if hasattr(user, "student"):
            return Group.objects.filter(id=user.student.group_id)

        return Group.objects.none()


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Student.objects.select_related("user", "group").all()

        if hasattr(user, "teacher"):
            return Student.objects.select_related("user", "group")\
                .filter(group__schedule__teacher=user.teacher).distinct()

        if hasattr(user, "student"):
            return Student.objects.select_related("user", "group")\
                .filter(user=user)

        return Student.objects.none()
