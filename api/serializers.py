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
            'description',
            'user',
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
        fields = [ 'id', 'user', 'body', 'created_at', 'likes', 'dislikes']

class CommentCreateApiViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['body', 'post', 'user']

class DirectMessageApiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'receiver',
            'content',
            'created_at',
        ]

class NotificationsApiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = [
            'id',
            'text',
            'read',
            'user'
        ]

class PostApiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['content']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'avatar',
            'first_name',
            'last_name',
            'email',
        ]

class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'company_website', 'description']