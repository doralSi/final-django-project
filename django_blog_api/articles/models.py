from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    """Article model for blog posts"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='articles'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.CharField(max_length=255, blank=True, default='')
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
