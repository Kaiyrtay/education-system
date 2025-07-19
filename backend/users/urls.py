from django.urls import path
from .views import UserDetailView, ProfileView

app_name = "users"

urlpatterns = [
    path("user/", UserDetailView.as_view(), name="user-detail"),
    path('profile/', ProfileView.as_view(), name='profile'),
]
