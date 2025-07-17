from rest_framework import serializers
from .models import Student, Group
from users.models import User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "code"]


class UserNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}


class StudentSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer()

    class Meta:
        model = Student
        fields = ["id", "user", "group"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_data["role"] = "student"
        password = user_data.pop("password", None)
        user = User(**user_data)
        if password:
            user.set_password(password)
        user.save()
        return Student.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", None)
        if user_data:
            for attr, value in user_data.items():
                if attr == "password":
                    instance.user.set_password(value)
                else:
                    setattr(instance.user, attr, value)
            instance.user.save()
        return super().update(instance, validated_data)
