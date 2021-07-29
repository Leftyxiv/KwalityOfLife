from django.db import models
from customuser.models import CustomUser

class Post(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True, blank=True)
  title = models.CharField(max_length=200)
  company_website = models.URLField(blank=True, null=True)
  product_image = models.ImageField(upload_to='uploads/', max_length=100)
  description = models.TextField()

  def __str__(self):
    return self.title