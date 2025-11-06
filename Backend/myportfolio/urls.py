from django.urls import path
 
from .views import signUp, login,create_project,project_counts,get_projects,toggle_like,add_comment,get_comments,toggle_bookmark,saved_projects,delete_project,add_journey,get_journey,delete_journey,open_router_response 
 
 
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
    path('projects/<int:pk>/get_comments/', get_comments, name='get_comments'),
    path('projects/<int:pk>/bookmark/', toggle_bookmark),
    path('projects/saved',saved_projects,name='saved'),
    path("projects/<int:pk>/delete/", delete_project, name="delete_project"),
    path('journey/',get_journey),
    path('journey/add/',add_journey),
    path('journey/delete/<int:id>/',delete_journey),
    path('api/open_router/', open_router_response, name='open_router'),



 
]
