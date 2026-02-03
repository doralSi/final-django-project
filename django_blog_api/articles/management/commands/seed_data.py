"""
Management command to seed the database with sample data for testing and demonstration.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from articles.models import Article
from comments.models import Comment


class Command(BaseCommand):
    help = 'Seed database with sample users, articles, and comments'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write(self.style.WARNING('Clearing existing data...'))
            Comment.objects.all().delete()
            Article.objects.all().delete()
            User.objects.filter(is_superuser=False).delete()
            self.stdout.write(self.style.SUCCESS('✓ Data cleared'))

        # Create sample users
        self.stdout.write('Creating users...')
        
        # Admin user (if doesn't exist)
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
            self.stdout.write(self.style.SUCCESS('✓ Admin user created'))
        else:
            self.stdout.write('  - Admin user already exists')

        # Regular test user
        testuser, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'first_name': 'John',
                'last_name': 'Doe'
            }
        )
        if created:
            testuser.set_password('testpass123')
            testuser.save()
            self.stdout.write(self.style.SUCCESS('✓ Test user created'))
        else:
            self.stdout.write('  - Test user already exists')

        # Sample articles data
        articles_data = [
            {
                'title': 'Django REST Framework Tutorial',
                'content': 'This is a comprehensive guide to building REST APIs with Django. It covers authentication, permissions, and best practices for creating scalable web services.',
                'tags': 'django,rest,api,tutorial,python'
            },
            {
                'title': 'PostgreSQL Integration Guide',
                'content': 'Learn how to integrate PostgreSQL with your Django application. This guide covers database configuration, migrations, and query optimization.',
                'tags': 'postgresql,database,django'
            },
            {
                'title': 'Python Best Practices',
                'content': 'Learn the best practices for Python development including code style, testing, documentation, and project structure.',
                'tags': 'python,best-practices,coding'
            },
            {
                'title': 'JavaScript Essentials',
                'content': 'Everything you need to know about JavaScript including ES6 features, async programming, and modern frameworks.',
                'tags': 'javascript,web,programming'
            },
            {
                'title': 'Docker for Beginners',
                'content': 'Getting started with Docker containers. Learn how to containerize your applications and manage deployments.',
                'tags': 'docker,devops,containers'
            },
            {
                'title': 'Git Workflow Guide',
                'content': 'Master Git with this comprehensive guide covering branching strategies, merge conflicts, and collaboration workflows.',
                'tags': 'git,version-control,collaboration'
            },
            {
                'title': 'API Design Patterns',
                'content': 'Common patterns for designing RESTful APIs including resource naming, versioning, and error handling.',
                'tags': 'api,rest,design,architecture'
            },
            {
                'title': 'SQL Performance Tuning',
                'content': 'Optimize your SQL queries for better performance. Learn about indexes, query plans, and database optimization techniques.',
                'tags': 'sql,database,performance,optimization'
            },
        ]

        self.stdout.write('Creating articles...')
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
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(created_articles)} articles'))

        # Sample comments
        if created_articles:
            self.stdout.write('Creating comments...')
            comments_data = [
                {'article_idx': 0, 'author': testuser, 'content': 'Great tutorial! Very helpful for beginners.'},
                {'article_idx': 0, 'author': admin, 'content': 'Thanks for the feedback!'},
                {'article_idx': 1, 'author': testuser, 'content': 'This helped me set up PostgreSQL correctly.'},
                {'article_idx': 2, 'author': testuser, 'content': 'These best practices are excellent.'},
                {'article_idx': 3, 'author': admin, 'content': 'JavaScript has evolved so much in recent years.'},
            ]

            created_comments = 0
            for data in comments_data:
                if data['article_idx'] < len(created_articles):
                    Comment.objects.create(
                        article=created_articles[data['article_idx']],
                        author=data['author'],
                        content=data['content']
                    )
                    created_comments += 1
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {created_comments} comments'))

        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
        self.stdout.write(self.style.SUCCESS('='*50))
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Articles: {Article.objects.count()}')
        self.stdout.write(f'Comments: {Comment.objects.count()}')
        self.stdout.write('\nCredentials:')
        self.stdout.write('  Admin: admin / admin123')
        self.stdout.write('  User: testuser / testpass123')
