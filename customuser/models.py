from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
  avatar = models.ImageField(upload_to="avatars/", max_length=100, blank=True, null=True)

  def __str__(self):
    return self.username
