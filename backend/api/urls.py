from django.urls import path
from .views import home, create_user, sign_in_user

urlpatterns = [
    path('', home),  # Default API route
    path('create-user/', create_user),
    path('sign-in-user/', sign_in_user),
]
