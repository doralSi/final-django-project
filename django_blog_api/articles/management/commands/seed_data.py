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

        # Regular user for testing
        reguser, created = User.objects.get_or_create(
            username='reg',
            defaults={
                'email': 'reg@example.com',
                'first_name': 'Regular',
                'last_name': 'User'
            }
        )
        if created:
            reguser.set_password('reg!1234')
            reguser.save()
            self.stdout.write(self.style.SUCCESS('✓ Regular user (reg) created'))
        else:
            self.stdout.write('  - Regular user (reg) already exists')

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
            {
                'title': 'React Hooks Deep Dive',
                'content': 'Understanding React Hooks from basics to advanced patterns. Learn useState, useEffect, useContext, and custom hooks with real-world examples.',
                'tags': 'react,hooks,frontend,javascript'
            },
            {
                'title': 'Microservices Architecture',
                'content': 'Building scalable applications with microservices. This article covers service design, communication patterns, and deployment strategies.',
                'tags': 'microservices,architecture,backend,scalability'
            },
            {
                'title': 'CI/CD Best Practices',
                'content': 'Implementing continuous integration and deployment pipelines. Learn about automated testing, deployment strategies, and monitoring.',
                'tags': 'cicd,devops,automation,testing'
            },
            {
                'title': 'TypeScript for JavaScript Developers',
                'content': 'Transition from JavaScript to TypeScript smoothly. Covers type systems, interfaces, generics, and advanced TypeScript patterns.',
                'tags': 'typescript,javascript,programming,types'
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
                {'article_idx': 0, 'author': reguser, 'content': 'I learned a lot from this article!'},
                {'article_idx': 1, 'author': testuser, 'content': 'This helped me set up PostgreSQL correctly.'},
                {'article_idx': 1, 'author': reguser, 'content': 'Very clear explanations, thank you!'},
                {'article_idx': 2, 'author': testuser, 'content': 'These best practices are excellent.'},
                {'article_idx': 3, 'author': admin, 'content': 'JavaScript has evolved so much in recent years.'},
                {'article_idx': 3, 'author': reguser, 'content': 'ES6 features are amazing!'},
                # תגובות לכתבות החדשות
                {'article_idx': 8, 'author': testuser, 'content': 'React Hooks changed the way I write components!'},
                {'article_idx': 8, 'author': admin, 'content': 'Totally agree! Hooks are game changers.'},
                {'article_idx': 8, 'author': reguser, 'content': 'Can you write more about custom hooks?'},
                {'article_idx': 9, 'author': testuser, 'content': 'Microservices can be complex but worth it for large projects.'},
                {'article_idx': 9, 'author': admin, 'content': 'Exactly! Start simple and scale as needed.'},
                {'article_idx': 9, 'author': reguser, 'content': 'What about service discovery?'},
                {'article_idx': 10, 'author': testuser, 'content': 'We implemented CI/CD last month, amazing results!'},
                {'article_idx': 10, 'author': admin, 'content': 'Great to hear! Which tools did you use?'},
                {'article_idx': 10, 'author': reguser, 'content': 'GitHub Actions and Docker mainly.'},
                {'article_idx': 11, 'author': testuser, 'content': 'TypeScript has a learning curve but improves code quality.'},
                {'article_idx': 11, 'author': admin, 'content': 'The type safety is worth the initial investment!'},
                {'article_idx': 11, 'author': reguser, 'content': 'Moving our project to TypeScript next month!'},
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
        self.stdout.write('  Regular User: reg / reg!1234')
        self.stdout.write('  Test User: testuser / testpass123')
