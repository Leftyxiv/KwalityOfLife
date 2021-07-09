from django.shortcuts import render
from rest_framework.decorators import action

from rest_framework.viewsets import ModelViewSet

from api.serializers import CommentSerializer, PostSerializer, CustomUserSerializer, DirectMessageSerializer, NotificationsSerializer
from comment.models import Comment
from posts.models import Post
from customuser.models import CustomUser
from directmessages.models import Message
from notifications.models import Notifications

# Create your views here.
class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CustomUserViewSet(ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

class MessageViewSet(ModelViewSet):
    serializer_class = DirectMessageSerializer
    queryset = Message.objects.all()

class NotificationsViewSet(ModelViewSet):
    serializer_class = NotificationsSerializer
    queryset = Notifications.objects.all()