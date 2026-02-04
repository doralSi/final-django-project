"""
Django management command to seed the database with initial data.
This command is idempotent and safe to run multiple times.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from articles.models import Article
from comments.models import Comment


class Command(BaseCommand):
    help = 'Seed database with initial users, articles, and comments'

    def handle(self, *args, **options):
        self.stdout.write('Starting database seeding...\n')

        # Create admin superuser
        admin, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@example.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin.set_password('admin123')
            admin.save()
            self.stdout.write('Created admin superuser')
        else:
            # Ensure admin has correct permissions even if already exists
            if not admin.is_superuser or not admin.is_staff:
                admin.is_staff = True
                admin.is_superuser = True
                admin.save()
            self.stdout.write('Admin user already exists')

        # Create regular test user
        testuser, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'first_name': 'Test',
                'last_name': 'User'
            }
        )
        if created:
            testuser.set_password('testpass123')
            testuser.save()
            self.stdout.write('Created testuser')
        else:
            self.stdout.write('Test user already exists')

        # Article data
        articles_data = [
            {
                'title': 'Getting Started with Django REST Framework',
                'content': '''Django REST Framework is a powerful toolkit for building Web APIs. 
                
This comprehensive guide will walk you through the essential concepts including serializers, viewsets, routers, and authentication. Whether you are a beginner or experienced developer, this tutorial covers everything you need to know to build robust REST APIs with Django.

Key topics covered:
- Setting up Django REST Framework
- Creating serializers for your models
- Building API views and viewsets
- Implementing authentication and permissions
- Testing your API endpoints

By the end of this guide, you will have a solid foundation for building production-ready APIs.''',
                'tags': 'django,rest,api,python,tutorial'
            },
            {
                'title': 'PostgreSQL Best Practices for Django',
                'content': '''PostgreSQL is a powerful open-source relational database that works exceptionally well with Django.

This article explores best practices for using PostgreSQL with your Django applications including database configuration, query optimization, indexing strategies, and migration management.

Topics covered:
- Configuring PostgreSQL for Django
- Using database indexes effectively
- Query optimization techniques
- Managing database migrations
- Backup and restore strategies
- Connection pooling

Follow these practices to ensure your Django application performs optimally with PostgreSQL.''',
                'tags': 'postgresql,django,database,optimization'
            },
        ]

        # Create articles (only if they don't exist)
        created_articles = []
        for data in articles_data:
            article, created = Article.objects.get_or_create(
                title=data['title'],
                defaults={
                    'content': data['content'],
                    'tags': data['tags'],
                    'author': admin
                }
            )
            if created:
                created_articles.append(article)
                self.stdout.write(f'Created article: {article.title}')
            else:
                created_articles.append(article)
                self.stdout.write(f'Article already exists: {article.title}')

        # Create comments for each article
        for article in created_articles:
            # Check how many comments already exist for this article
            existing_comments = Comment.objects.filter(article=article).count()
            
            if existing_comments >= 2:
                self.stdout.write(f'Article "{article.title}" already has {existing_comments} comments')
                continue

            # Create comments from testuser
            comments_from_testuser = [
                f'Great article! This really helped me understand {article.title.split()[0].lower()}.',
                f'Thanks for sharing this detailed guide. The examples are very clear and practical.',
            ]

            for i, content in enumerate(comments_from_testuser):
                # Only create if we need more comments
                if existing_comments + i < 2:
                    Comment.objects.create(
                        article=article,
                        author=testuser,
                        content=content
                    )
                    self.stdout.write(f'Created comment by testuser on: {article.title}')

            # Optionally add a comment from admin
            if existing_comments < 3:
                Comment.objects.create(
                    article=article,
                    author=admin,
                    content='Thank you for the positive feedback! Glad it was helpful.',
                )
                self.stdout.write(f'Created comment by admin on: {article.title}')

        # Print summary
        total_users = User.objects.count()
        total_articles = Article.objects.count()
        total_comments = Comment.objects.count()

        self.stdout.write('\n' + '=' * 60)
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully'))
        self.stdout.write('=' * 60)
        self.stdout.write(f'Total users in database: {total_users}')
        self.stdout.write(f'Total articles in database: {total_articles}')
        self.stdout.write(f'Total comments in database: {total_comments}')
        self.stdout.write('\nTest credentials:')
        self.stdout.write('  Admin: admin / admin123')
        self.stdout.write('  User: testuser / testpass123')
