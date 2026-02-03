"""
Article views
"""
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsStaffOrReadOnly


class ArticleListCreateView(generics.ListCreateAPIView):
    """
    GET: List all articles (public access)
    POST: Create a new article (admin only)
    Supports search via ?search=query on title, content, tags
    Supports ordering via ?ordering=created_at or ?ordering=-title
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsStaffOrReadOnly]
    search_fields = ['title', 'content', 'tags']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']  # default ordering
    
    def perform_create(self, serializer):
        """Set the author to the current user when creating an article"""
        serializer.save(author=self.request.user)


class ArticleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a single article (public access)
    PUT/PATCH: Update an article (admin only)
    DELETE: Delete an article (admin only)
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsStaffOrReadOnly]
