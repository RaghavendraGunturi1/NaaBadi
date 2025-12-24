from django import forms
from .models import Volunteer

class VolunteerForm(forms.ModelForm):
    class Meta:
        model = Volunteer
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your Name', 'class': 'form-input'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Your Email', 'class': 'form-input'}),
            'phone': forms.TextInput(attrs={'placeholder': 'Phone Number', 'class': 'form-input'}),
            'message': forms.Textarea(attrs={'placeholder': 'Why do you want to join?', 'class': 'form-input', 'rows': 3}),
        }

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Volunteer, Donation

# ... (Keep VolunteerForm) ...

# 1. USER REGISTRATION FORM
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True) # Force email requirement

    class Meta:
        model = User
        fields = ['username', 'email'] # Password is handled automatically by parent class
    
    # Add styling to match your site
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-input'})

# 2. DONATION FORM
class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = ['amount']
        widgets = {
            'amount': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'Enter Amount (₹)'}),
        }