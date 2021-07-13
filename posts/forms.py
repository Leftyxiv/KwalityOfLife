from django import forms
from django.forms import ModelForm
from .models import Post

class PostForm(ModelForm):
  class Meta:
    model = Post
    fields = ['title', 'company_website', 'product_image', 'description' ]


class PostURL(forms.Form):
  disability = forms.CharField(max_length=100)
  purpose = forms.CharField(max_length=100)