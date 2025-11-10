from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.

class Project(models.Model):

    MEDIA_TYPE_CHOICES =[
            ('image','image'),
            ('video','video')
        ]
    PROJECT_TYPE_CHOICES =[
        ('fullstack','Fullstack'),
        ('django','Django'),
        ('react','React'),
        ('opencv','OpenCv'),
        ('ai','AI'),
        ('miniprojects','MiniProjects'),
        ('learning','Learning')
    ]
     
    name =models.CharField(max_length=200)
    description = models.TextField()
    live_link = models.URLField(blank=True,null=True)
    github_link = models.URLField(blank=True,null=True)
    tech_stack = models.CharField(max_length=300 ,help_text= 'Comma-separated technologies')
    project_type = models.CharField(max_length=20,choices=PROJECT_TYPE_CHOICES,null=True,blank=True)
    time_spent = models.CharField(max_length=100,help_text="Example: '2 weeks', '30 hours'",null=True,blank=True)
    youtube_link = models.URLField(blank=True, null=True, help_text="YouTube video link for project demo")
    linkedin_link = models.URLField(blank=True, null=True, help_text="Project LinkedIn post or profile link")
    media_type = models.CharField(max_length=10 ,choices=MEDIA_TYPE_CHOICES)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProjectCustomLink(models.Model):
    project = models.ForeignKey(Project, related_name='custom_links', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    url = models.URLField()

    def __str__(self):
        return f"{self.name}: {self.url}"


class ProjectImage(models.Model):

    project = models.ForeignKey(Project,on_delete=models.CASCADE,related_name='images')
    image = CloudinaryField('image') 

    def __str__(self):
        return f'image for {self.project.name}'
    
    


class ProjectVideo(models.Model):

    project = models.OneToOneField(Project,on_delete=models.CASCADE,related_name='video')
    video = CloudinaryField('video') 

    def __str__(self):
        return f'video for {self.project.name}'
    

class ProjectLike(models.Model):

    project = models.ForeignKey(Project,on_delete=models.CASCADE,related_name='likes')
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    liked_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('project','user')
    
    def __str__(self):
        return f' {self.user.username} liked {self.project.name}'
    

    
class ProjectComment(models.Model):

    project = models.ForeignKey(Project,on_delete=models.CASCADE,related_name='comments')
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    media = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'comment by {self.user.username} on {self.project.name}'
    
    
class ProjectBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'project')

    def __str__(self):
        return f"{self.user.username} bookmarked {self.project.name}"






class JourneyMilestone(models.Model):
 
    year = models.CharField(max_length=50)
    date = models.DateField()
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return f'{self.year} - { self.title }'
    
class JourneyAchievement(models.Model):
    milestone = models.ForeignKey(JourneyMilestone,related_name='Achievements' ,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    github_link = models.URLField(blank=True,null=True)
    image = models.ImageField(upload_to='achievements/', blank=True, null=True)
 
 
    def __str__(self):
        return f'{self.name}'