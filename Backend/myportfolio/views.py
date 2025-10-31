from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Project,ProjectImage,ProjectVideo




# Create your views here.


@api_view(['POST'])
def signUp(request):
    
    email = request.data.get('email')
    password = request.data.get('password')
    confirmPassword = request.data.get('confirmPassword')

    if not email or not password or not confirmPassword:
      return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)


    if password != confirmPassword:
        return Response({'error':'Password not match'},status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username = email ).exists():
        return Response({'error':'user already exist '},status=status.HTTP_400_BAD_REQUEST)
    
    if len(password) < 6 :
        return Response({'error':'password must be six character '},status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username = email , email = email,password =  password)

    refresh = RefreshToken.for_user(user)

    return Response({
        'message':'User created Successfully',
        'refresh' : str(refresh),
        'access':str(refresh.access_token)
        },status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):

    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(username = email,password =  password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'refresh' : str(refresh),
            'access':str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff,
            }
        })
    else:
        return Response({'error':'Invalid credentials'},status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])
def create_project(request):
    if not request.data.get('name') or not request.data.get('description') or not request.data.get('github_link') or not request.data.get('tech_stack') or not request.data.get('project_type'):
        return Response({'error':'All Fields Are Required '},status=status.HTTP_400_BAD_REQUEST)
    projects = Project.objects.create(
        name = request.data.get('name'),
        description = request.data.get('description'),
        live_link = request.data.get('live_link',''),
        github_link = request.data.get('github_link',''),
        tech_stack = request.data.get('tech_stack'),
        project_type = request.data.get('project_type'),
        media_type  = request.data.get('media_type',''),
        time_spent  = request.data.get('time_spent',''),
        
    )

    if request.data.get('media_type') == 'image':
        for img in request.FILES.getlist('images'):
            ProjectImage.objects.create(project =projects,image = img )
    elif request.data.get('media_type') == 'video':
        ProjectVideo.objects.create(project = projects , video = request.FILES['video'])
    return Response({'message': 'Project Created Successfully'},status=status.HTTP_201_CREATED)



@api_view(['GET'])
def project_counts(request):
    user = request.user
    counts={
        'total':Project.objects.count(),
        'fullstack':Project.objects.filter(project_type = 'fullstack').count(),
        'django':Project.objects.filter(project_type = 'django').count(),
        'react':Project.objects.filter(project_type = 'react').count(),
        'opencv':Project.objects.filter(project_type = 'opencv').count(),
        'ai':Project.objects.filter(project_type = 'ai').count(),
        'miniprojects':Project.objects.filter(project_type = 'miniprojects').count(),
        'learning':Project.objects.filter(project_type = 'learning').count(),
    }
    return Response(counts)


 
@api_view(['GET'])
def get_projects(request):
    project_type = request.GET.get('project_type',None)

    if project_type:
        projects = Project.objects.filter(project_type= project_type)
    else:
        projects = Project.objects.all()
        
    
    data = []
    for p in projects:
        item ={
            'id':p.id,
            'name':p.name,
            'description':p.description,
            'live_link':p.live_link,
            'github_link':p.github_link,
            'tech_stack':p.tech_stack,
            'project_type':p.project_type,
            'time_spent':p.time_spent,
            'media_type':p.media_type,
            'created_at':p.created_at,
            'images':[{'image':img.image.url}for img in p.images.all()]
    }
    if hasattr(p,'video') and p.video:
        item['video'] = {'video': p.video.video.url}
    else:
        item['video'] = None


    data.append(item)
    return Response(data)
 
