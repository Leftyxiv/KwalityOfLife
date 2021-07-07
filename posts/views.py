from django.shortcuts import render, HttpResponseRedirect
from django.views import View

from .models import Post
from .forms import PostForm
from comment.models import Comment
from comment.forms import AddComment

def redirect(request):
  return request.GET.get('next', reverse('homepage'))

def PostHomeView(request, *args, **kwargs):
  posts = Post.objects.all()
  return render(request, 'productindex.html', context={'posts': posts})

class PostFormView(View):
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

def post_detail_view(request, post_id, *args, **kwargs):
  post = Post.objects.get(id=post_id)
  comments = Comment.objects.filter(post=post)
  form = AddComment()
  return render(request, 'postdetail.html',context={'post': post, 'comments': comments, 'addform': form})