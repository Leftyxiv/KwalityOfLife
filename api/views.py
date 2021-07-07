from django.shortcuts import render
from rest_framework.decorators import action

from rest_framework.viewsets import ModelViewSet

from api.serializers import CommentSerializer, PostSerializer, CustomUserSerializer
from comment.models import Comment
from posts.models import Post
from customuser.models import CustomUser

# Create your views here.
class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CustomUserViewSet(ModelViewSet):
    serializer_class = CustomUser
    queryset = CustomUser.objects.all()
