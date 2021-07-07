from django.shortcuts import render
from rest_framework.decorators import action

from rest_framework.viewsets import ModelViewSet

from api.serializers import CommentSerializer, PostSerializer
from comment.models import Comment
from posts.models import Post

# Create your views here.
class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


<<<<<<< HEAD
=======
class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
>>>>>>> main
