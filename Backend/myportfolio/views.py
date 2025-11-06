from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.parsers import MultiPartParser,FormParser
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Project,ProjectImage,ProjectVideo,ProjectComment,ProjectLike,ProjectBookmark,JourneyMilestone,JourneyAchievement
from django.shortcuts import get_object_or_404
from django.utils.timezone import localtime
import json
import os
import requests
  
from decouple import config
 


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
    offset = int(request.GET.get('offset', 0))
    limit = int(request.GET.get('limit', 10))

    if project_type:
        projects = Project.objects.filter(project_type= project_type)
    else:
        projects = Project.objects.all()
 
    user = request.user if request.user.is_authenticated else None
    total_count = projects.count()
    project_batch = projects[offset:offset + limit]
 
    data = []
    for p in project_batch:
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
            'images':[{'image':img.image.url}for img in p.images.all()],
            "likes": p.likes.count(),
            "comments": p.comments.count(),
            "userLiked": True if user and p.likes.filter(user=user).exists() else False,
            "is_bookmarked": True if user and p.bookmarks.filter(user=user).exists() else False
    }
        if hasattr(p,'video') and p.video:
            item['video'] = {'video': p.video.video.url}
        else:
            item['video'] = None


        data.append(item)
    return Response({
        'projects': data,
        'hasMore': (offset + limit) < total_count,
        'total': total_count
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request,pk):
    user = request.user
    project = get_object_or_404(Project,id =pk)
    existing_like = ProjectLike.objects.filter(project = project,user=user).first()
    if existing_like:
        existing_like.delete()
        liked =False
    else:
        ProjectLike.objects.create(project=project,user=user)
        liked = True
    
    like_count = ProjectLike.objects.filter(project=project).count()
    return Response({
        'liked':liked,
        'likes':like_count
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request,pk):
    user = request.user
    project = get_object_or_404(Project,id=pk)
    text = request.data.get('text')
    if not text:
        return Response({'error':'Comment text required'},status=status.HTTP_400_BAD_REQUEST)
    comment = ProjectComment.objects.create(project=project,user=user,text=text)
    comment_count = ProjectComment.objects.filter(project=project).count()
    return Response({
        'message':'Comment Added Successfully',
        'comments':comment_count,
        'new_comment': {
            "id": comment.id,
            "user": user.username,
            "text": text,
            "created_at": localtime(comment.created_at).isoformat()
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request,pk):

    project = get_object_or_404(Project,id = pk)
    comments = ProjectComment.objects.filter(project=project).order_by('-created_at')
    data = []
    for c in comments:
        data.append({
            'id':c.id,
            'user':c.user.username,
            'text':c.text,
            'created_at':localtime(c.created_at).isoformat()
        })
    return Response({"comments": data})





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_bookmark(request, pk):
    project = get_object_or_404(Project, id=pk)
    user = request.user

    bookmark, created = ProjectBookmark.objects.get_or_create(
        user=user, project=project
    )

    if not created:  
        bookmark.delete()
        status = "removed"
    else:
        status = "added"

  

    return Response({
        "status": status,
       
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def saved_projects(request):
    offset = int(request.GET.get('offset', 0))
    limit = int(request.GET.get('limit', 10))
    user = request.user
    bookmarks = ProjectBookmark.objects.filter(user=user).select_related('project')
    data = []
    total_count = bookmarks.count()
    bookmarks_batch = bookmarks[offset:offset+limit]
    
    for bookmark in bookmarks_batch:
        p = bookmark.project  
        item = {
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'live_link': p.live_link,
            'github_link': p.github_link,
            'tech_stack': p.tech_stack,
            'project_type': p.project_type,
            'time_spent': p.time_spent,
            'media_type': p.media_type,
            'created_at': p.created_at,
            'images': [{'image': img.image.url} for img in p.images.all()],
            "likes": p.likes.count(),
            "comments": p.comments.count(),
            "userLiked": p.likes.filter(user=user).exists(),
            "is_bookmarked": True  
        }
        
        if hasattr(p, 'video') and p.video:
            item['video'] = {'video': p.video.video.url}
        else:
            item['video'] = None
            
        data.append(item)
    
    return Response({
        'projects': data,
        'hasMore': (offset + limit) < total_count,
        'total': total_count
    })



 
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_project(request, pk):
    if not request.user.is_superuser:
        return Response({"error": "Not allowed"}, status=403)

    project = get_object_or_404(Project, id=pk)
    project.delete()

    return Response({"message": "Project deleted successfully"})




 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_journey(request):
    if not request.user.is_superuser:
        return Response({'error': 'You are not allowed'}, status=status.HTTP_403_FORBIDDEN)

    data = request.data

    milestone = JourneyMilestone.objects.create(
        year=data.get('year'),
        date=data.get('date'),
        title=data.get('title'),
        description=data.get('description')
    )

    achievement_data_list = request.data.getlist('achievements', [])

    for i, ach_json in enumerate(achievement_data_list):
        try:
            ach_obj = json.loads(ach_json)  
        except json.JSONDecodeError as e:
            return Response({
                'error': f'Invalid JSON in achievement {i}: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)

        img = request.FILES.get(f'achievement_image_{i}')

        JourneyAchievement.objects.create(
            milestone=milestone,
            name=ach_obj.get('name'),
            github_link=ach_obj.get('github_link'),
            image=img
        )

    return Response({'message': 'Milestone created successfully'})


@api_view(['GET'])
def get_journey(request):
    milestones = JourneyMilestone.objects.all().order_by('date')

    data = []
    for m in milestones:
        data.append({
            'id':m.id,
            'year':m.year,
            'date':m.date,
            'title':m.title,
            'description':m.description,
            'Achievements':[
                {
                    'name':a.name,
                    'github_link':a.github_link,
                    'image':request.build_absolute_uri(a.image.url) if a.image else None
                    
                } for a in m.Achievements.all()
            ]
        })
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_journey(request,pk):
    if not request.user.is_superuser:
        return Response({'error':'you are not allowed '})
    m = get_object_or_404(JourneyMilestone,id=pk)
    m.delete()
    return Response({'message':'milestone deleted'})

 

 
 

 

@api_view(['POST'])
@permission_classes([AllowAny])
def open_router_response(request):
    user_input = request.data.get('inputs', '').strip()
    if not user_input:
 
        return Response({'error': 'input not provided'}, status=400)

    try: 
        OPENROUTER_KEY = config('OPENROUTER_KEY')
      
        if not OPENROUTER_KEY:
            raise Exception("OPENROUTER_KEY not found")
        model_name = "mistralai/mistral-7b-instruct:free"
        payload = {
            "model": model_name,
            "messages": [
                {"role": "system", "content": "You are RabiBot, a smart, friendly, and helpful assistant. Always provide detailed and clear answers."},
                {"role": "user", "content": user_input}
            ],
            "max_tokens": 300,
            "temperature": 0.7,
            "top_p": 0.9,
        }
        headers = {
            "Authorization": f"Bearer {OPENROUTER_KEY}",
            "Content-Type": "application/json",
            # "Referer": "https://your-site-name.com",   
            "X-Title": "RabiBot Django API"
        }
        resp = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
 
        )

        print(f"OpenRouter Status: {resp.status_code}")

        if resp.status_code != 200:
            print("OpenRouter Error:", resp.text)
            raise Exception(f"OpenRouter API error {resp.status_code}")

        data = resp.json()
        print("Full OpenRouter response:", data)
        message = (
            data.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "")
        )
        cleaned_message = message.replace("[OUT]", "").replace("<s>", "").strip()
        if not cleaned_message.strip():
            cleaned_message = "🤖 Hmm… I'm not sure how to respond to that right now."

        print("Model reply:", cleaned_message[:200])
        return Response({'generated_text': cleaned_message})

    except Exception as e:
 
        print("OpenRouter Proxy Error:", str(e))
        fallback_message = (
            "😎 Hey there! Great question! I'm currently in training (learning all the cool stuff about Sayyed), "
            "so I might not get it 100% right just yet. After I finish my training, I promise to give a proper answer! "
            "If it's urgent, you can reach out at 📞 9207286895 — my boss will pick up. "
            "Meanwhile, you can still ask me about skills, projects, hobbies, or anything fun! 😄"
        )
        return Response({'generated_text': fallback_message}, status=200)

 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment_id):
    try:
        comment = ProjectComment.objects.get(id=comment_id)
    except ProjectComment.DoesNotExist:
        return Response({"detail": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
 
    if request.user.is_superuser or comment.user == request.user:
        comment.delete()
        return Response({"detail": "Comment deleted"}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Not authorized to delete this comment"}, status=status.HTTP_403_FORBIDDEN)