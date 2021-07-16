from django.shortcuts import render, HttpResponseRedirect
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Message
from .forms import MessageForm
from customuser.models import CustomUser
from api.serializers import DirectMessageApiSerializer

def inbox_view(request, *args, **kwargs):
  messages = Message.objects.filter(receiver=request.user)
  return render(request, 'message.html', context={'messages': messages, 'inbox': True})

def sent_view(request, *args, **kwargs):
  messages = Message.objects.filter(sender=request.user)
  return render(request, 'message.html', context={'messages': messages, 'inbox': False})

class FormView(View):
  def get(self, request, *args, **kwargs):
    form = MessageForm()
    return render(request, 'form.html', context={'form': form})

  def post(self, request, *args, **kwargs):
    form = MessageForm(request.POST)
    if form.is_valid():
      data = form.cleaned_data
      message = Message.objects.create(
        sender=request.user,
        receiver=data['receiver'],
        content=data['content']
      )
      print(message)
      message.save()
      return HttpResponseRedirect('/sentmessages/')

@api_view(['GET'])
def get_inbox(request, username, *args, **kwargs):
  user = CustomUser.objects.get(username=username)
  messages = Message.objects.filter(receiver=user)
  serializer = DirectMessageApiSerializer(messages, many=True)
  data = serializer.data
  if data:
    return Response(data, status=200)
  return Response({}, status=400)

@api_view(['GET'])
def get_outbox(request, username, *args, **kwargs):
  cleaned = []
  user = CustomUser.objects.get(username=username)
  messages = Message.objects.filter(sender=user).exclude(content__contains='SUGGESTION')
  # for message in messages:
    # if message.content.find('SUGGESTION'):
    #   del message
  serializer = DirectMessageApiSerializer(messages, many=True)
  data = serializer.data
  if data:
    return Response(data, status=200)
  return Response({}, status=400)

@api_view(['POST'])
def send_dm(request, recipient, *arg, **kwargs):
  recipient = CustomUser.objects.get(id=recipient)
  serializer = DirectMessageApiSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=201)
  return Response({}, status=400)