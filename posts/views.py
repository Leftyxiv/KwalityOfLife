from django.shortcuts import render
from .models import Post

def PostHomeView(request, *args, **kwargs):
  posts = Post.objects.all()
  return render(request, 'productindex.html', context={'posts': posts})