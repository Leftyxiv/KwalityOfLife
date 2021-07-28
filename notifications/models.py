from django.db import models

from customuser.models import CustomUser

class Notifications(models.Model):
  text = models.CharField(max_length=2000)
  read = models.BooleanField(default=False)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

  def __str__(self):
    return f"notifying {self.user}"

