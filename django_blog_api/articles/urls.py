"""
Article URL patterns
"""
from django.urls import path
from .views import ArticleListCreateView, ArticleRetrieveUpdateDestroyView

urlpatterns = [
    path('articles/', ArticleListCreateView.as_view(), name='article-list-create'),
    path('articles/<int:pk>/', ArticleRetrieveUpdateDestroyView.as_view(), name='article-detail'),
]
