from django.contrib import admin
from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """Admin configuration for Comment model"""
    list_display = ['id', 'author', 'article', 'content_preview', 'created_at']
    list_filter = ['created_at', 'author', 'article']
    search_fields = ['content', 'author__username', 'article__title']
    date_hierarchy = 'created_at'
    
    def content_preview(self, obj):
        """Show first 50 characters of content"""
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'
