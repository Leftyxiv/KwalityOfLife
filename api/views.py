from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet

from api.serializers import CommentSerializer
from comment.models import Comment

# Create your views here.
class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
