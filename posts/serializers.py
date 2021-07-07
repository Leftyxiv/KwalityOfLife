from rest_framework import serializers

from .models import Post

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ['user', 'created_at', 'title', 'company_website', 'product_image', 'description']
