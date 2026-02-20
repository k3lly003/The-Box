from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # 1. GET ALL USERS
    queryset = User.objects.all()
    # 2. USE THIS 'TRANSLATOR' TO TURN THEM INTO JSON
    serializer_class = UserSerializer
    # 3. ANYONE SEE THE LISTLet
    permission_classes = [AllowAny]