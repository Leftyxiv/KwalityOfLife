"""kol URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from api.urls import urlpatterns as api_urls
from django.conf import settings
from django.conf.urls.static import static

from posts.views import PostHomeView, PostFormView, post_detail_view, delete_post
from customuser.views import customUserCreation_view, login_view, CustomUserChangeView, loggedOut_view
from comment.views import CreateCommentView, like_view, dislike_view

from .views import error_404, error_500

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', PostHomeView, name='homepage'),
    # user views
    path('addpost/', PostFormView.as_view()),
    path('signup/', customUserCreation_view),
    path('login/', login_view),
    path('myaccount/', CustomUserChangeView.as_view()),
    path('logout/', loggedOut_view),

    # post views
    path('post/<int:post_id>/', post_detail_view),
    path('post/<int:post_id>/delete', delete_post),

    # comment views
    path('post/<int:post_id>/addcomment', CreateCommentView.as_view()),
    path('comment/<int:com_id>/like', like_view),
    path('comment/<int:com_id>/dislike', dislike_view)

]

handler404 = error_404
handler500 = error_500

urlpatterns += api_urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
