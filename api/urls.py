from django.conf.urls import include, url

from api.views import CommentViewSet, PostViewSet, CustomUserViewSet, MessageViewSet

from rest_framework import routers

router = routers.DefaultRouter()

router.register('comment', CommentViewSet)
router.register('post', PostViewSet)
router.register('customuser', CustomUserViewSet)
router.register('directmessages', MessageViewSet)

urlpatterns = [
    url(r"^api/", include(router.urls)),
    url(r'^api/', include('djoser.urls')),
    url(r'^api/', include('djoser.urls.authtoken')),
]
