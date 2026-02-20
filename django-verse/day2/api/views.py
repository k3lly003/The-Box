from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.CreateAPIView):
    serializers_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
#         TO GET THE USER'S DATA DO 14 LINE CODE
        user = self.request.user
        return Note.object.filter(author=user)

    def perform_create(self, serializers):
        if serializers.is_valid():
            serializers.save(author=self.request.user)
        else:
            print(serializers.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.object.filter(author=user)


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # 1. GET ALL USERS
    queryset = User.objects.all()
    # 2. USE THIS 'TRANSLATOR' TO TURN THEM INTO JSON
    serializer_class = UserSerializer
    # 3. ANYONE SEE THE LISTLet
    permission_classes = [AllowAny]