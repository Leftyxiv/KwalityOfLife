from django.shortcuts import render, HttpResponseRedirect
from django.views import View

# from .forms import SuggestionForm
from directmessages.forms import SuggestionModelForm
from customuser.models import CustomUser
from directmessages.models import Message

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
