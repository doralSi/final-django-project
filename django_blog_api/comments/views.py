"""
Comment views
"""
from rest_framework import generics, permissions
from rest_framework.exceptions import NotFound
from .models import Comment
from .serializers import CommentSerializer
from .permissions import IsStaffOnly
from articles.models import Article


class ArticleCommentListCreateView(generics.ListCreateAPIView):
    """
    GET: List all comments for a specific article (public access)
    POST: Create a new comment for a specific article (authenticated users only)
    Supports ordering via ?ordering=created_at or ?ordering=-created_at
    """
    serializer_class = CommentSerializer
    ordering_fields = ['created_at']
    ordering = ['-created_at']  # default ordering
    
    def get_permissions(self):
        """
        GET requests: AllowAny
        POST requests: IsAuthenticated
        """
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        """Filter comments by article_id from URL"""
        article_id = self.kwargs.get('article_id')
        # Verify article exists
        if not Article.objects.filter(id=article_id).exists():
            raise NotFound(f"Article with id {article_id} not found.")
        return Comment.objects.select_related('author', 'article').filter(article_id=article_id)
    
    def perform_create(self, serializer):
        """Set the author and article when creating a comment"""
        article_id = self.kwargs.get('article_id')
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            raise NotFound(f"Article with id {article_id} not found.")
        
        serializer.save(author=self.request.user, article=article)


class CommentDestroyView(generics.DestroyAPIView):
    """
    DELETE: Delete a comment (admin only)
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsStaffOnly]
