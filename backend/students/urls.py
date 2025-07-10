from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, GroupViewSet

app_name = "students"

router = DefaultRouter()
router.register(r"students", StudentViewSet)
router.register(r"groups", GroupViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
