from django.conf.urls import include, url

from api.views import CommentViewSet

from rest_framework import routers

router = routers.DefaultRouter()

router.register('comment', CommentViewSet)

urlpatterns = [
    url(r"^api/", include(router.uls))
]
