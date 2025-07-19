from rest_framework import viewsets, permissions
from .models import Subject
from .serializers import SubjectSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_staff


class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Subject.objects.all()

        if hasattr(user, "teacher"):
            return Subject.objects.filter(schedule__teacher=user.teacher).distinct()

        if hasattr(user, "student"):
            return Subject.objects.filter(schedule__group=user.student.group).distinct()

        return Subject.objects.none()
