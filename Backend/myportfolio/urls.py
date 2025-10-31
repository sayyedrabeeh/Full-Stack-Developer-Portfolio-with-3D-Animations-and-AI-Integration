from django.urls import path
 
from .views import signUp, login,create_project,project_counts,get_projects,toggle_like,add_comment 
 
 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', signUp, name='signup'),
    path('login/', login, name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_project/',create_project,name='create_project'),
    path('counts/',project_counts,name='project_counts'),
    path('projects/', get_projects),
    path('projects/<int:pk>/likes',toggle_like),
    path('projects/<int:pk>/comments',add_comment),

 
]
