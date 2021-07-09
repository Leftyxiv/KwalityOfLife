from django.db import models

from customuser.models import CustomUser

class Message(models.Model):
  sender = models.ForeignKey(CustomUser, related_name='sender', on_delete=models.CASCADE)
  receiver = models.ForeignKey(CustomUser, related_name='receiver', on_delete=models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"Message from {self.sender} to {self.receiver}"

