from django.forms import ModelForm
from .models import Post

class PostForm(ModelForm):
  class Meta:
    model = Post
    fields = ['title', 'company_website', 'product_image', 'description' ]