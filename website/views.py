from django.shortcuts import render, redirect
from django.db.models import Sum
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required # <--- Key Import

from .models import School, Program, Volunteer, Donation, SuccessStory
from .forms import VolunteerForm, RegisterForm, DonationForm

# --- PUBLIC PAGES ---
def home(request):
    total_schools = School.objects.count()
    total_students = School.objects.aggregate(Sum('students_impacted'))['students_impacted__sum'] or 0
    return render(request, 'website/index.html', {'schools_count': total_schools, 'students_count': total_students})

def about(request):
    return render(request, 'website/about.html')

def programs(request):
    programs = Program.objects.all()
    return render(request, 'website/programs.html', {'programs': programs})

def resources(request):
    return render(request, 'website/resources.html')

def contact(request):
    if request.method == 'POST':
        form = VolunteerForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Welcome to the Squad! We will contact you soon.")
            return redirect('contact')
    else:
        form = VolunteerForm()
    return render(request, 'website/contact.html', {'form': form})

# --- AUTHENTICATION SYSTEM ---

def register_user(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
        
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) # Auto-login after signup
            messages.success(request, f"Welcome, {user.username}!")
            return redirect('dashboard')
    else:
        form = RegisterForm()
    return render(request, 'website/register.html', {'form': form})

def login_user(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, "Successfully logged in.")
                return redirect('dashboard')
    else:
        form = AuthenticationForm()
        # Add style to default Django login form
        for field in form.fields:
            form.fields[field].widget.attrs.update({'class': 'form-input'})
            
    return render(request, 'website/login.html', {'form': form})

def logout_user(request):
    logout(request)
    messages.info(request, "You have logged out.")
    return redirect('home')

# --- USER DASHBOARD & DONATION ---

@login_required(login_url='login') # <--- Redirects to login if not signed in
def donate(request):
    if request.method == 'POST':
        form = DonationForm(request.POST)
        if form.is_valid():
            donation = form.save(commit=False)
            donation.user = request.user # Attach current user
            donation.save()
            messages.success(request, f"Thank you for your donation of ₹{donation.amount}!")
            return redirect('dashboard')
    else:
        form = DonationForm()
    return render(request, 'website/donate.html', {'form': form})

@login_required(login_url='login')
def dashboard(request):
    # Get donations ONLY for this user
    user_donations = Donation.objects.filter(user=request.user).order_by('-date')
    return render(request, 'website/dashboard.html', {'donations': user_donations})