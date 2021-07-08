from django.shortcuts import render

from .models import Notifications

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
