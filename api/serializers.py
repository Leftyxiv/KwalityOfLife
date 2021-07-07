from ast import Str
from comment.models import Comment
from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField

from comment.models import Comment
from customuser.models import CustomUser
from posts.models import Post

class CommentSerializer(HyperlinkedModelSerializer):
    user = StringRelatedField()
    post = StringRelatedField()

    class Meta:
        model = Comment
        fields = [
            'body',
            'user',
            'post'
        ]


class PostSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = [
            'title',
            'company_website',
            'product_image',
            'description'
        ]


class CustomUserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'first_name',
            'last_name',
            'username',
            'email'
        ]
