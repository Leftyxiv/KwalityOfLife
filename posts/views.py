from django.shortcuts import render, HttpResponseRedirect, reverse
from django.views import View
from django.http import Http404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import api_view
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

from .models import Post
from .forms import PostForm, PostURL
from comment.models import Comment
from comment.forms import AddComment
from notifications.models import Notifications

from api.serializers import CommentSerializer, CommentApiViewSerializer, PostApiSerializer

def redirect(request):
  return request.GET.get('next', reverse('homepage'))

def PostHomeView(request, *args, **kwargs):
  posts = Post.objects.all().order_by('created_at').reverse()
  notify = []
  not_num = ''
  if request.user.is_authenticated:
    for notification in Notifications.objects.filter(user=request.user):
      if notification.read != True:
        notify.append(notification)
      if notify:
        not_num = len(notify)
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

@api_view(['GET'])
def get_comments(request, post_id, *args, **kwargs):
  post = Post.objects.get(id=post_id)
  comments = Comment.objects.filter(post=post)
  serializer = CommentApiViewSerializer(comments, many=True)
  data = serializer.data
  if data:
    return Response(data, status=200)
  return Response({}, status=400)


def posts_view(request):
  if request.method == 'POST':
    form = PostURL(request.POST)
    if form.is_valid():
      data = form.cleaned_data
      disability = data['disability']
      purpose = data['purpose']
      if disability or purpose:
        return HttpResponseRedirect(f'{disability}%20{purpose}')
  posts = Post.objects.all()
  return render(request, 'post_index.html', {'posts': posts})

# @csrf_exempt
class PostAPIView(APIView):
  parser_classes = (MultiPartParser, FormParser)

  def get(self, request, *args, **kwargs):
    posts = Post.objects.all()
    serializer = PostApiSerializer(posts, many=True)
    return Response(serializer.data)

  def post(self, request, *args, **kwargs):
    serializer = PostApiSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=201)
    else:
      print(serializer.errors)
      return Response(serializer.errors, status=400)

  def delete(self, request, pk):
    post = self.get_object(pk)
    post.delete()
    return Response(status=200)

