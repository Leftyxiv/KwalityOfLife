from django.shortcuts import render, HttpResponseRedirect
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response

# from .forms import SuggestionForm
from directmessages.models import Message
from directmessages.forms import SuggestionModelForm
from customuser.models import CustomUser
from directmessages.models import Message
from api.serializers import SuggestionSerializer

class SuggestionFormView(View):
  def get(self, request, *args, **kwargs):
    form = SuggestionModelForm()
    return render(request, 'form.html', context={'form': form})
  
  def post(self, request, *args, **kwargs):
    form = SuggestionModelForm(request.POST)
    if form.is_valid():
      data = form.cleaned_data
      users = CustomUser.objects.filter(is_staff=True)
      data['content'] = f"--- THIS IS A SUGGESTION --- " + data['content']  # noqa
      for user in users:
        Message.objects.create(sender=request.user, receiver=user, content=data['content'])
    return HttpResponseRedirect('/messages/outbox/')

@api_view(['POST'])
def send_suggestion(request, *args, **kwargs):
  users = CustomUser.objects.filter(is_staff=True)
  serializer = SuggestionSerializer(data=request.data)
  if serializer.is_valid():
    for user in users:
      # mess_obj = { 'sender': request.user, 'receiver': user, 'content': f"---SUGGESTION - BOX--- {serializer.data['content']} "}
      Message.objects.create(sender=request.user, receiver=user, content=f"---SUGGESTION - BOX--- {serializer.data['content']}")
  return Response(serializer.data)
