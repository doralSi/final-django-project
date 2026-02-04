#!/usr/bin/env python
"""
Quick check script for database status
"""
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_project.settings')
django.setup()

from django.contrib.auth.models import User
from articles.models import Article
from comments.models import Comment

print("=" * 50)
print("DATABASE STATUS")
print("=" * 50)

# Users
total_users = User.objects.count()
admin_users = User.objects.filter(is_staff=True).count()
print(f"\n👥 Users:")
print(f"   Total: {total_users}")
print(f"   Admins: {admin_users}")

if admin_users > 0:
    admins = User.objects.filter(is_staff=True)
    for admin in admins:
        print(f"   - {admin.username} (email: {admin.email})")

# Articles
total_articles = Article.objects.count()
print(f"\n📝 Articles: {total_articles}")

# Comments
total_comments = Comment.objects.count()
print(f"\n💬 Comments: {total_comments}")

print("\n" + "=" * 50)

if total_users == 0:
    print("\n⚠️  No users found! Run: python manage.py createsuperuser")
elif admin_users == 0:
    print("\n⚠️  No admin users! Run: python manage.py createsuperuser")
else:
    print("\n✅ Database looks good!")

if total_articles == 0:
    print("⚠️  No articles! Run: python manage.py seed")

print("=" * 50)
