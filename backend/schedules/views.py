from rest_framework import viewsets
from .serializers import ScheduleSerializer
from .models import Schedule

# Create your views here.


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.select_related("group", "subject", "teacher")
    serializer_class = ScheduleSerializer
