from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserChangeForm, UserCreationForm
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
  add_form = UserCreationForm
  form = UserChangeForm
  model = CustomUser
  list_display = ['username', 'email']

admin.site.register(CustomUser, CustomUserAdmin)