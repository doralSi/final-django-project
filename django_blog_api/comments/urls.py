"""
Comment URL patterns
"""
from django.urls import path
from .views import ArticleCommentListCreateView, CommentUpdateDestroyView

urlpatterns = [
    path('articles/<int:article_id>/comments/', ArticleCommentListCreateView.as_view(), name='article-comments'),
    path('comments/<int:pk>/', CommentUpdateDestroyView.as_view(), name='comment-detail'),
]
