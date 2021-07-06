from django.shortcuts import render
from django.views import View

from .models import Post
from .forms import PostForm


def PostHomeView(request, *args, **kwargs):
  posts = Post.objects.all()
  return render(request, 'productindex.html', context={'posts': posts})

class PostFormView(View):
  def get(self, request):
    form = PostForm()
    return render(request, 'form.html', context={'form': form})