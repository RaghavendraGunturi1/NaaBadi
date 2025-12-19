from django.shortcuts import render, redirect
from django.db.models import Sum
from django.contrib import messages
from .models import School, Program, Volunteer
from .forms import VolunteerForm

def home(request):
    total_schools = School.objects.count()
    total_students = School.objects.aggregate(Sum('students_impacted'))['students_impacted__sum'] or 0
    return render(request, 'website/index.html', {
        'schools_count': total_schools,
        'students_count': total_students
    })

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