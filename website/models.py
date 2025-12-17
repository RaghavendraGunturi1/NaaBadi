from django.db import models

# 1. SCHOOLS (To show in Stats & "Our Work")
class School(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    students_impacted = models.IntegerField(default=0)
    image = models.ImageField(upload_to='schools/', blank=True)
    is_adopted = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# 2. PROGRAMS (The 4 cards in "Our Initiatives")
class Program(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # We store the FontAwesome icon class (e.g., 'fas fa-school')
    icon_class = models.CharField(max_length=50, default='fas fa-star') 
    
    def __str__(self):
        return self.title

# 3. VOLUNTEERS (People who fill the form)
class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField(blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# 4. SUCCESS STORIES (Replaces the YouTube JS Fetcher)
class SuccessStory(models.Model):
    title = models.CharField(max_length=100)
    person_name = models.CharField(max_length=100) # e.g. "Raju (Class 10)"
    story_text = models.TextField()
    thumbnail = models.ImageField(upload_to='stories/')
    video_url = models.URLField(blank=True, help_text="Optional YouTube Link")
    
    def __str__(self):
        return f"{self.person_name} - {self.title}"