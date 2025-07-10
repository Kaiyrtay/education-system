from rest_framework.routers import DefaultRouter
from .views import SubjectViewSet

app_name = "subjects"

router = DefaultRouter()
router.register("", SubjectViewSet, basename="subject")


urlpatterns = router.urls
