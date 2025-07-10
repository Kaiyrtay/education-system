from rest_framework.routers import DefaultRouter
from .views import TeacherViewSet

app_name = "teachers"

router = DefaultRouter()
router.register("", TeacherViewSet, basename="teacher")

urlpatterns = router.urls
