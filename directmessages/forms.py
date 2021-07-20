from django.forms import ModelForm, Form
from django import forms
from .models import Message

class MessageForm(ModelForm):

  class Meta:
    model = Message
    fields = ['receiver', 'content']

class SuggestionModelForm(ModelForm):
  class Meta:
    model = Message
    fields = ['content']