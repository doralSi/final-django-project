"""
Comment serializers
"""
from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for Comment model"""
    author = serializers.CharField(source='author.username', read_only=True)
    article = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'article', 'author', 'content', 'created_at']
        read_only_fields = ['id', 'created_at']
