from django.urls import path
from .views import signUp, login

urlpatterns = [
    path('signup/', signUp, name='signup'),
    path('login/', login, name='login'),
]
