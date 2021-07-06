from django.shortcuts import render
from .forms import UserCreationForm

def add_user(request, *args, **kwargs):
  form = UserCreationForm()
  return render(request, 'form.html', context={'form': form})