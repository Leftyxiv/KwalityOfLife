from django.conf.urls import include, url

from api.views import CommentViewSet, PostViewSet

from rest_framework import routers

router = routers.DefaultRouter()

router.register('comment', CommentViewSet)
router.register('post', PostViewSet)

urlpatterns = [
    url(r"^api/", include(router.uls))
]
