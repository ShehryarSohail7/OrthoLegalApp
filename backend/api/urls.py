from django.urls import path
from .views import home, create_user

urlpatterns = [
    path('', home),  # Default API route
    path('create-user/', create_user),
]
