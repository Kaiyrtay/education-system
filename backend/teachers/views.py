from rest_framework import viewsets
from .models import Teacher
from .serializers import TeacherSerializer

# Create your views here.


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.select_related("user")
    serializer_class = TeacherSerializer
