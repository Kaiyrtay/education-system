from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.serializers import UserSerializer
from students.serializers import StudentSerializer, GroupSerializer
from teachers.serializers import TeacherSerializer
# Create your views here.


class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "user": UserSerializer(user).data
        }

        if hasattr(user, "student"):
            student = user.student
            data["role"] = "student"
            data["student"] = StudentSerializer(student).data
            data["group"] = GroupSerializer(student.group).data

        elif hasattr(user, "teacher"):
            teacher = user.teacher
            data["role"] = "teacher"
            data["teacher"] = TeacherSerializer(teacher).data

        else:
            data["role"] = "admin"

        return Response(data)
