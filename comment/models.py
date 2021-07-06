from django.db import models
from datetime import datetime

from customuser.models import CustomUser
from posts.models import Post

# Create your models here.
class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(default=datetime.now())
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    def __str__(self):
        return self.body
