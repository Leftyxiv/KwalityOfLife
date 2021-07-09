from django.forms import ModelForm, Form
from django import forms
from .models import Message

# class MessageForm(Form):
#   receiver = forms.CharField(max_length=250)
#   content = forms.CharField(widget=forms.Textarea)

class MessageForm(ModelForm):

  class Meta:
    model = Message
    fields = ['receiver', 'content']