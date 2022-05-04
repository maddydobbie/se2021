from .models import Review
from django import forms
from django.forms import ModelForm, Textarea
from django import forms

class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'comment']
        widgets = {
		    'rating': forms.Select(attrs={'style': 'cursor: pointer; border-radius:4px; border:0px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);'}),
            'comment': Textarea(attrs={'cols': 80, 'rows': 9, 'style': 'border-radius:10px; border:0px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);'})
        }
