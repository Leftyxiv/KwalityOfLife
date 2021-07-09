from django.shortcuts import render, HttpResponseRedirect
from django.views import View

from .models import Message
from .forms import MessageForm

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


