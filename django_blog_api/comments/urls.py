"""
Comment URL patterns
"""
from django.urls import path
from .views import ArticleCommentListCreateView, CommentDestroyView

urlpatterns = [
    path('articles/<int:article_id>/comments/', ArticleCommentListCreateView.as_view(), name='article-comments'),
    path('comments/<int:pk>/', CommentDestroyView.as_view(), name='comment-delete'),
]
