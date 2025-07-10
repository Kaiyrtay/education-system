from django.urls import path
from .views import UserDetailView

app_name = "users"

urlpatterns = [
    path("user/", UserDetailView.as_view(), name="user-detail"),
]
