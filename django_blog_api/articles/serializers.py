"""
Article serializers
"""
from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    """Serializer for Article model"""
    author = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'author', 'created_at', 'tags']
        read_only_fields = ['id', 'created_at']
