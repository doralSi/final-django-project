"""
API URL configuration
"""
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


@api_view(['GET'])
def health_check(request):
    """Simple health check endpoint to verify DRF is working"""
    return Response({'status': 'ok'})


urlpatterns = [
    # Health check
    path('health/', health_check, name='health-check'),
    
    # JWT authentication endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User registration and management
    path('', include('users.urls')),
    
    # Articles
    path('', include('articles.urls')),
    
    # Comments
    path('', include('comments.urls')),
]
