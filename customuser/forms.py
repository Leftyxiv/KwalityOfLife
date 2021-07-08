from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
  class Meta:
    model = CustomUser
    fields = ('first_name', 'last_name', 'username', 'email')

class CustomUserChangeForm(UserChangeForm):
  class Meta:
    model = CustomUser
    fields = ('first_name', 'last_name', 'email', 'avatar')


class LoginForm(forms.Form):
    username = forms.CharField(max_length=37)
    password = forms.CharField(widget=forms.PasswordInput)
