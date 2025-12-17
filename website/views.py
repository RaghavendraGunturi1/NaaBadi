from django.shortcuts import render
from django.db.models import Sum
from .models import School, Program

from django.shortcuts import render, redirect
from django.db.models import Sum
from .models import School, Program
from .forms import VolunteerForm # Import the new form

from django.shortcuts import render, redirect
from django.db.models import Sum
from django.contrib import messages  # <--- NEW: For pop-up messages
from .models import School, Program, Volunteer, SuccessStory
from .forms import VolunteerForm

def home(request):
    # --- FORM HANDLING ---
    if request.method == 'POST':
        form = VolunteerForm(request.POST)
        if form.is_valid():
            form.save()
            # Add a success message that will show up on the frontend
            messages.success(request, "Welcome to the Squad! We will contact you soon.")
            return redirect('home')
    else:
        form = VolunteerForm()

    # --- DATA FETCHING ---
    programs = Program.objects.all()
    # Fetch stories (Newest first)
    stories = SuccessStory.objects.all().order_by('-id')[:3] 
    
    total_schools = School.objects.count()
    total_students = School.objects.aggregate(Sum('students_impacted'))['students_impacted__sum'] or 0

    context = {
        'form': form,
        'programs': programs,
        'stories': stories, # <--- Sending stories to HTML
        'schools_count': total_schools,
        'students_count': total_students,
    }
    
    return render(request, 'website/index.html', context)