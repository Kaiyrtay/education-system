from rest_framework import viewsets
from .models import Student, Group
from .serializers import StudentSerializer, GroupSerializer


# Create your views here.
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.select_related("user", "group")
    serializer_class = StudentSerializer
