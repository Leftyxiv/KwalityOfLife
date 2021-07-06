from django.shortcuts import render, HttpResponseRedirect, reverse

from .models import Comment

# Create your views here.
def like_view(request, comment_id):
    comment = Comment.objects.get(id=comment_id)
    comment.likes += 1
    comment.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))


def dislike_view(request, comment_id):
    comment = Comment.objects.get(id=comment_id)
    comment.dislikes -= 1
    comment.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
