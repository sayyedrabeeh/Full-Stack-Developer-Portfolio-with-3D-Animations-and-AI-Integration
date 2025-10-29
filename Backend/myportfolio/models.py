from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):

    MEDIA_TYPE_CHOICES =[
            ('image','image'),
            ('video','video')
        ]
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='projects')
    name =models.CharField(max_length=200)
    description = models.TextField()
    live_link = models.URLField(blank=True,null=True)
    github_link = models.URLField(blank=True,null=True)
    tech_stack = models.CharField(max_length=300 ,help_text= 'Comma-separated technologies')
    time_spent = models.CharField(max_length=100,help_text="Example: '2 weeks', '30 hours'")
    media_type = models.CharField(max_length=10 ,choices=MEDIA_TYPE_CHOICES)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class ProjectImage(models.Model):

    project = models.ForeignKey(Project,on_delete=models.CASCADE,related_name='images')
    image = models.ImageField(upload_to='project_images/')

    def __str__(self):
        return f'image for {self.project.name}'
    


class ProjectVideo(models.Model):

    project = models.OneToOneField(Project,on_delete=models.CASCADE,related_name='video')
    video = models.FileField(upload_to='project_video/')

    def __str__(self):
        return f'video for {self.project.name}'
    




    