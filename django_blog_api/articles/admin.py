from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Admin configuration for Article model"""
    list_display = ['title', 'author', 'created_at', 'tags']
    list_filter = ['created_at', 'author']
    search_fields = ['title', 'content', 'tags']
    date_hierarchy = 'created_at'
