from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View

from comment.models import Comment
from comment.forms import AddComment
from posts.models import Post

# Create your views here.
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
            Comment.objects.create(
                body=data['body'],
                post=post,
                user=user
            )
            return HttpResponseRedirect(reverse('homepage'))
        else:
            print(form.errors)
            return HttpResponseRedirect(reverse('homepage'))


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
