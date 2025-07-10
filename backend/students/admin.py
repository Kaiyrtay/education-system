from django.contrib import admin
from .models import Student, Group


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "code"]
    search_fields = ["name", "code"]


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "group"]
    search_fields = ["user__username", "group__code"]
