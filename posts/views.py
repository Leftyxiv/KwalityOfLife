from django.shortcuts import render, HttpResponseRedirect
from django.views import View

from .models import Post
from .forms import PostForm

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
    print(form.is_valid())
    if form.is_valid():
      data = form.cleaned_data
      post = Post.objects.create(
        user=request.user,
        title=data['title'],
        company_website=data['company_website'],
        product_image=data['product_image'],
        description=data['description']
      )
      post.save()
      return HttpResponseRedirect('/')
    else:
      print(form.errors)
    return HttpResponseRedirect('/')