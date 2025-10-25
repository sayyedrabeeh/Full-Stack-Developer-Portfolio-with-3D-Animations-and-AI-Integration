from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from google.oauth2 import id_token
from google.auth.transport import requests




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
    
    user = User.objects.create(username = email , email = email,password =  password)

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

    user = authenticate(username = email)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'refresh' : str(refresh),
            'access':str(refresh.access_token)
        })
    else:
        return Response({'error':'Invalid credentials'},status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['POST'])
def google_login(request):

    token = request.data.get('token')
    if not token:
        return Response({'error':'token is required '},status=status.HTTP_400_BAD_REQUEST)
    try:
        idinfo = id_token.verify_oauth2_token(token,requests.Request())

        email = idinfo.get('email')
        name = idinfo.get('name')
        if not email:
            return Response({'error':'invalid google token '},status=status.HTTP_400_BAD_REQUEST)
        user,created =User.objects.get_or_create(username= email,defaults={'email':email,'first_name':name or ''})
        refresh = RefreshToken.for_user(user)
        return Response({
            'message':'google login successfull',
            'refresh': str(refresh),
            'access':str(refresh.access_token)
        },status=status.HTTP_200_OK)
    except ValueError:
        return Response({'error':'invalid or expired google token '},status=status.HTTP_400_BAD_REQUEST)
    