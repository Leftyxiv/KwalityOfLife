from django.shortcuts import render, HttpResponseRedirect
from django.views import View
from django.http import Http404
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Post
from .forms import PostForm
from comment.models import Comment
from comment.forms import AddComment
from notifications.models import Notifications

from django.contrib.auth.mixins import LoginRequiredMixin


def redirect(request):
  return request.GET.get('next', reverse('homepage'))

def PostHomeView(request, *args, **kwargs):
  posts = Post.objects.all().order_by('created_at').reverse()
  notify = []
  not_num = ''
  for notification in Notifications.objects.filter(user=request.user):
    if notification.read != True:
      notify.append(notification)
    if notify:
      not_num = len(notify)
      print(not_num)
  return render(request, 'productindex.html', context={'posts': posts, 'notifications': not_num })

class PostFormView(LoginRequiredMixin, View):
  def get(self, request):
    form = PostForm()
    return render(request, 'form.html', context={'form': form})
  
  def post(self, request):
    form = PostForm(request.POST, request.FILES)
    if form.is_valid():
      data = form.cleaned_data
      post = Post.objects.create(
        user=request.user,
        title=data['title'],
        company_website=data['company_website'],
        product_image=data['product_image'],
        description=data['description'],
        
      )
      post.save()
      return HttpResponseRedirect('/')
    return HttpResponseRedirect('addpost/')

# FIX 404 HERE
def post_detail_view(request, post_id, *args, **kwargs):
  try:
    post = Post.objects.get(id=post_id)
  except Post.DoesNotExist:
    raise Http404
  comments = Comment.objects.filter(post=post)
  form = AddComment()
  return render(request, 'postdetail.html',context={'post': post, 'comments': comments, 'addform': form})

# FIX 404 HERE
def delete_post(request, post_id, *args, **kwargs):
  post = Post.objects.get(id=post_id)
  try:
    post = Post.objects.get(id=post_id)
  except Post.DoesNotExist:
    raise Http404
  post.delete()
  return HttpResponseRedirect('/')