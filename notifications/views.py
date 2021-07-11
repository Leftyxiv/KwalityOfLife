from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Notifications
from api.serializers import NotificationsApiSerializer
from customuser.models import CustomUser

def notification_view(request, *args, **kwargs):
  notifications = Notifications.objects.filter(user=request.user)
  notifications_to_display = []
  old_notifications = []
  for notification in notifications:
    if not notification.read:
      notifications_to_display.append(notification)
      notification.read = True
      notification.save()
    else:
      old_notifications.append(notification)
  return render(request, 'notifications.html', context={'new_notifications': notifications_to_display, 'old_notifications': old_notifications })

@api_view(['GET'])
def get_notifications(request, username, *args, **kwargs):
  user = CustomUser.objects.get(username=username)
  notifications = Notifications.objects.filter(user=user)
  serializer = NotificationsApiSerializer(notifications, many=True)
  data = serializer.data
  if data:
    return Response(data, status=200)
  return Response({}, status=400)
