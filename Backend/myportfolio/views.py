from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status



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

    return Response({'message':'User created Successfully'},status=status.HTTP_201_CREATED)



