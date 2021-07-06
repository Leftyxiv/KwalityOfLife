from django import forms

class AddComment(forms.Form):
    body = forms.CharField(widget=forms.Textarea)
