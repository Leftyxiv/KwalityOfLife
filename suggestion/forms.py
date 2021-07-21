from django import forms

class SuggestionForm(forms.Form):
    content = forms.Textarea
