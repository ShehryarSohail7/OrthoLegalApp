from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.


def home(request):
    return JsonResponse({"message": "Hello from Django Backend!"})


@csrf_exempt  # Disables CSRF protection for this API
def create_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON data from request
            print("Received Data:", data)  # Print in terminal
            return JsonResponse({"message": "User data received", "data": data}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
