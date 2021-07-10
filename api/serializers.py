from ast import Str
from comment.models import Comment
from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from rest_framework import serializers

from comment.models import Comment
from customuser.models import CustomUser
from posts.models import Post
from directmessages.models import Message
from notifications.models import Notifications

class CommentSerializer(HyperlinkedModelSerializer):
    user = StringRelatedField()
    post = StringRelatedField()

    class Meta:
        model = Comment
        fields = [
            'id',
            'body',
            'user',
            'post'
        ]


class PostSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'company_website',
            'product_image',
            'description'
        ]


class CustomUserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'avatar'
        ]

class DirectMessageSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'receiver',
            'content',
            'created_at',
        ]

class NotificationsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Notifications
        fields = [
            'id',
            'text',
            'read',
            'user'
        ]

class CommentApiViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['user', 'body', 'created_at', 'likes', 'dislikes']