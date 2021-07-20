from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
import re
from rest_framework.decorators import api_view
from rest_framework.response import Response

from comment.models import Comment
from comment.forms import AddComment
from posts.models import Post
from notifications.models import Notifications
from customuser.models import CustomUser
from api.serializers import CommentCreateApiViewSerializer, CommentApiViewSerializer


class CreateCommentView(LoginRequiredMixin, View):
    def get(self, request):
        template_name = 'form.html'
        form = AddComment()
        return render(request, 'form.html', {'form': form})

    def post(self, request, post_id):
        user = request.user
        post = Post.objects.get(id=post_id)
        form = AddComment(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            if '@' in data['body']:
                pattern = '@(\w+)'
                result = re.findall(pattern, data['body'])[0]
                user_to_notify = CustomUser.objects.get(username=result)
                if user_to_notify:
                    Notifications.objects.create(text=data['body'], user=user_to_notify)
            Comment.objects.create(
                body=data['body'],
                post=post,
                user=user
            )
            return HttpResponseRedirect(f'/post/{post.id}/')
        else:
            print(form.errors)
            return HttpResponseRedirect(reverse('homepage'))


def like_view(request, com_id):
    comment = Comment.objects.get(id=com_id)
    comment.likes += 1
    comment.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))


def dislike_view(request, com_id):
    comment = Comment.objects.get(id=com_id)
    comment.dislikes += 1
    comment.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))

@api_view(['POST'])
def create_comment(request, post_id, *args, **kwargs):
        user = request.user
        post = Post.objects.get(id=post_id)
        # print(user)
        serializer = CommentCreateApiViewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.post = post
            serializer.user = user
            if '@' in serializer.validated_data['body']:
                pattern = '@(\w+)'
                result = re.findall(pattern, serializer.validated_data['body'])[0]
                user_to_notify = CustomUser.objects.get(username=result)
                if user_to_notify:
                    Notifications.objects.create(text=serializer.validated_data['body'], user=user_to_notify)
            serializer.save()

        # if form.is_valid():
        #     data = form.cleaned_data
        #     if '@' in data['body']:
        #         pattern = '@(\w+)'
        #         result = re.findall(pattern, data['body'])[0]
        #         user_to_notify = CustomUser.objects.get(username=result)
        #         if user_to_notify:
        #             Notifications.objects.create(text=data['body'], user=user_to_notify)
        #     Comment.objects.create(
        #         body=data['body'],
        #         post=post,
        #         user=user
        #     )
        # return HttpResponseRedirect(f'/post/{post.id}/')
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def api_like(request, comment_id, *args, **kwargs):
    comment = Comment.objects.get(id=comment_id)
    if not comment:
        return Response('Comment not found', status=404)
    comment.likes += 1
    comment.save()
    serializer = CommentApiViewSerializer(comment)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def api_dislike(request, comment_id, *args, **kwargs):
    comment = Comment.objects.get(id=comment_id)
    if not comment:
        return Response('Comment not found', status=404)
    comment.dislikes += 1
    comment.save()
    serializer = CommentApiViewSerializer(comment)
    return Response(serializer.data, status=200)

@api_view(['DELETE'])
def delete_dm(request, pk):
  try:
    comment = Comment.objects.get(pk=pk)
    comment.delete()
  except:
    return Response({}, status=404)
  return Response({}, status=201)
