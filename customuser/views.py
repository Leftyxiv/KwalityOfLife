from django.shortcuts import render
from .forms import UserCreationForm
from posts.models import Post

def add_user(request, *args, **kwargs):
  form = UserCreationForm()
  return render(request, 'form.html', context={'form': form})

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth import authenticate, login, logout
from customuser.forms import CustomUserChangeForm, CustomUserCreationForm, LoginForm
from customuser.models import CustomUser
from api.serializers import CustomUserSerializer, UserUpdateSerializer

# Create your views here.
# SignUp
def customUserCreation_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            # form.cleaned_data.get('password')
            if data['password1'] != data['password2']:
                alert('Passwords must match')
                return HttpResponseRedirect('/signup/')
            else:
                user = CustomUser.objects.create_user(first_name=data['first_name'], last_name=data['last_name'], username=data['username'], password=data['password1'], email=data['email'])
                login(request, user)
        return HttpResponseRedirect(request.GET.get('next', reverse('homepage')))

    form = CustomUserCreationForm()
    return render(request, "form.html", {'form' : form})

# Login
def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = authenticate(request, username=data['username'], password=data['password'])
            # user = form.save()
            if user: 
                login(request, user)
            return HttpResponseRedirect(request.GET.get('next', reverse('homepage')))
    form = LoginForm()
    return render(request, "form.html", {'form' : form})

# User Edit View
# def customUserChange_view(request, *args, **kwargs):
#     item = request.user

#     if request.method == "POST":
#         form = CustomUserChangeForm(request.POST)

#         if form.is_valid():
#             data = form.cleaned_data
#             # item.username = data['username']
#             item.email = data['email']
#             item.first_name = data['first_name']
#             item.last_name = data['last_name']
#             item.save()
#             # return HttpResponseRedirect('')

#     form = CustomUserChangeForm(initial={
#         'username': item.username,
#         'email' : item.email,
#         'first_name' : item.first_name,
#         'last_name' : item.last_name,

#     })
#     return render(request, "form.html", {"form": form})


class CustomUserChangeView(LoginRequiredMixin, View):
    def get(self, request):
        item = request.user
        
        form = CustomUserChangeForm(initial={
            'username': item.username,
            'email' : item.email,
            'first_name' : item.first_name,
            'last_name' : item.last_name,

        })
        return render(request, "form.html", {"form": form})

    def post(self, request):
        item = request.user

        if request.method == "POST":
            form = CustomUserChangeForm(request.POST)

            if form.is_valid():
                data = form.cleaned_data
                item.username = data['username']
                item.email = data['email']
                item.first_name = data['first_name']
                item.last_name = data['last_name']
                item.save()
                return HttpResponseRedirect('/')


# Log out
def loggedOut_view(request):
    logout(request)
    return HttpResponseRedirect(request.GET.get('next', reverse('homepage')))

# user_detail
def author_detail(request, author_id: int):
    my_authors = CustomUser.objects.get(id=author_id)
    author_posts = Post.objects.filter(user=my_authors.id)
    return render(request, 'author_detail.html', {'author': my_authors, 'posts': author_posts})

@api_view(['GET'])
def get_my_id(request, username, *args, **kwargs):
    """ this function takes in a username as a string and returns the user object"""
    user = CustomUser.objects.get(username=username)
    serializer = CustomUserSerializer(user)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def get_all_users(request, *args, **kwargs):
    """This function returns a list of id/names for message dropdown"""
    name_list = []
    qs = CustomUser.objects.all()
    for user in qs:
        serializer = CustomUserSerializer(user)
        name_list.append({'id': serializer.data['id'], 'username': serializer.data['username']})
    return Response(name_list, status=200)

@api_view(['DELETE'])
def delete_dm(request, pk):
  try:
    user = CustomUser.objects.get(pk=pk)
    user.delete()
  except:
    return Response({}, status=404)
  return Response({}, status=201)

class UserAPIView(APIView):
  parser_classes = (MultiPartParser, FormParser)

  def get(self, request, *args, **kwargs):
    posts = CustomUser.objects.all()
    serializer = CustomUserSerializer(posts, many=True)
    return Response(serializer.data)

  def post(self, request, *args, **kwargs):
    serializer = UserUpdateSerializer(data=request.data)
    # print(request.data)
    user = request.user
    print(serializer.initial_data)
    if serializer.is_valid():
        # serializer.avatar = serializer.validated_data['avatar']
        # print(serializer.data)
        # print(request.data['avatar'])
        user = request.user
        serializer.user = user
        print(user.avatar)
        serializer.save()
        return Response(serializer.data, status=201)
    else:
      print(serializer.errors)
      return Response(serializer.errors, status=400)
