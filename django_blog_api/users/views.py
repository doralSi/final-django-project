"""User views for registration and authentication"""

from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import RegisterSerializer, MeSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user

    POST /api/register/
    Body: {"username": "user", "email": "user@example.com", "password": "password123"}

    Returns: {"id": 1, "username": "user", "email": "user@example.com"}
    """
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {"id": user.id, "username": user.username, "email": user.email},
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeView(generics.RetrieveUpdateAPIView):
    """
    GET /api/me/ - Retrieve authenticated user's profile
    PATCH /api/me/ - Update authenticated user's profile (email, first_name, last_name)
    """
    serializer_class = MeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        """Return the currently authenticated user"""
        return self.request.user
