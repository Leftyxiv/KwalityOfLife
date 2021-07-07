from django.conf.urls import include, url

from api.views import CommentViewSet, PostViewSet, CustomUserViewSet

from rest_framework import routers

router = routers.DefaultRouter()

router.register('comment', CommentViewSet)
router.register('post', PostViewSet)
router.register('customuser', CustomUserViewSet)

urlpatterns = [
    url(r"^api/", include(router.urls))
]
