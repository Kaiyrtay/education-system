from django.urls import path
from .views import MyScheduleView, ScheduleViewSet
from rest_framework.routers import DefaultRouter

app_name = "schedules"

router = DefaultRouter()
router.register(r"", ScheduleViewSet, basename="schedule")

urlpatterns = [
    path("my-schedule/", MyScheduleView.as_view(), name="my-schedule"),
] + router.urls
