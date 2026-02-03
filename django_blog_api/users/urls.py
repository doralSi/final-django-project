"""
URL patterns for users app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('me/', views.MeView.as_view(), name='me'),
]
