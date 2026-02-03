# Django Blog API

A complete RESTful API for a blog application built with Django REST Framework, featuring JWT authentication, PostgreSQL database, and comprehensive CRUD operations.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Authentication Flow](#authentication-flow)
- [API Endpoints](#api-endpoints)
- [Pagination & Ordering](#pagination--ordering)
- [Permissions](#permissions)
- [Database Schema](#database-schema)

---

## 🛠 Tech Stack

- **Backend Framework**: Django 4.2.9
- **API Framework**: Django REST Framework 3.14.0
- **Authentication**: Simple JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL
- **Other Tools**:
  - django-filter (filtering support)
  - django-cors-headers (CORS handling)
  - python-decouple (environment variables)
  - psycopg2-binary (PostgreSQL adapter)

---

## ✨ Features

- ✅ **JWT Authentication** (access + refresh tokens)
- ✅ **User Registration** and profile management
- ✅ **Articles CRUD** with admin-only write permissions
- ✅ **Comments System** linked to articles
- ✅ **Search Functionality** (articles: title, content, tags)
- ✅ **Pagination** (customizable page size, max 50)
- ✅ **Ordering** (articles, comments by various fields)
- ✅ **Role-Based Permissions** (admin via `is_staff`, no Groups)
- ✅ **PostgreSQL Integration** with optimized queries
- ✅ **Admin Panel** for content management

---

## 🚀 Installation & Setup

### Prerequisites

- Python 3.12+
- PostgreSQL database
- Virtual environment tool

### Steps

1. **Clone the repository**
   ```bash
   cd C:\Users\maoz\final-Django-project
   ```

2. **Create and activate virtual environment**
   ```powershell
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

3. **Install dependencies**
   ```powershell
   cd django_blog_api
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create/edit `.env` file in `django_blog_api/` directory:
   ```env
   # Django Settings
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   
   # Database
   USE_SQLITE=False
   DB_NAME=blog_db
   DB_USER=postgres
   DB_PASSWORD=your-db-password
   DB_HOST=127.0.0.1
   DB_PORT=5432
   
   # CORS
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

5. **Run migrations**
   ```powershell
   python manage.py migrate
   ```

6. **Create superuser** (admin)
   ```powershell
   python manage.py createsuperuser
   # Or use the Python snippet approach to avoid terminal issues
   ```

7. **Run development server**
   ```powershell
   python manage.py runserver
   ```

8. **Access the API**
   - API Base URL: `http://127.0.0.1:8000/api/`
   - Admin Panel: `http://127.0.0.1:8000/admin/`

---

## 🔐 Authentication Flow

### 1. Register a new user
```http
POST /api/register/
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### 2. Obtain JWT token
```http
POST /api/token/
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Use access token in requests
```http
GET /api/me/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Refresh token (when access expires)
```http
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📡 API Endpoints

### **Authentication & Users**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register/` | ❌ | Register new user |
| POST | `/api/token/` | ❌ | Obtain JWT tokens |
| POST | `/api/token/refresh/` | ❌ | Refresh access token |
| GET | `/api/me/` | ✅ | Get current user profile |
| PATCH | `/api/me/` | ✅ | Update profile (email, first_name, last_name) |

### **Articles**

| Method | Endpoint | Auth | Permission | Description |
|--------|----------|------|------------|-------------|
| GET | `/api/articles/` | ❌ | Public | List all articles (paginated) |
| POST | `/api/articles/` | ✅ | Admin only | Create new article |
| GET | `/api/articles/{id}/` | ❌ | Public | Retrieve specific article |
| PUT/PATCH | `/api/articles/{id}/` | ✅ | Admin only | Update article |
| DELETE | `/api/articles/{id}/` | ✅ | Admin only | Delete article |

### **Comments**

| Method | Endpoint | Auth | Permission | Description |
|--------|----------|------|------------|-------------|
| GET | `/api/articles/{article_id}/comments/` | ❌ | Public | List comments for article |
| POST | `/api/articles/{article_id}/comments/` | ✅ | Authenticated | Add comment to article |
| DELETE | `/api/comments/{id}/` | ✅ | Admin only | Delete any comment |

### **Health Check**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health/` | ❌ | API health check |

---

## 📄 Pagination & Ordering

### Pagination

All list endpoints return paginated results with the following structure:

```json
{
  "count": 25,
  "next": "http://127.0.0.1:8000/api/articles/?page=2",
  "previous": null,
  "results": [...]
}
```

**Default**: 10 items per page  
**Customizable**: Add `?page_size=20` (max: 50)  
**Navigate**: Use `?page=2` for specific pages

#### Examples:
```http
GET /api/articles/?page=2
GET /api/articles/?page_size=20
GET /api/articles/?page=3&page_size=5
```

### Ordering

Control the order of results using the `ordering` parameter.

#### Articles Ordering:
- `?ordering=title` - Alphabetical (A-Z)
- `?ordering=-title` - Reverse alphabetical (Z-A)
- `?ordering=created_at` - Oldest first
- `?ordering=-created_at` - Newest first (default)

#### Comments Ordering:
- `?ordering=created_at` - Oldest first
- `?ordering=-created_at` - Newest first (default)

#### Examples:
```http
GET /api/articles/?ordering=title
GET /api/articles/?ordering=-created_at&page_size=5
GET /api/articles/1/comments/?ordering=created_at
```

### Search

Search articles by title, content, or tags:

```http
GET /api/articles/?search=django
GET /api/articles/?search=python&ordering=title&page_size=10
```

### Combining Parameters

```http
GET /api/articles/?search=api&ordering=-created_at&page=1&page_size=5
```

---

## 🔒 Permissions

### Permission Model

**No Django Groups are used.** Permissions are based solely on user attributes:

- **Public** - No authentication required
- **Authenticated** - Any logged-in user (JWT required)
- **Admin** - User must have `is_staff=True` (staff/superuser)

### Permission Matrix

| Action | Endpoint Pattern | Required Permission |
|--------|------------------|---------------------|
| **Read** articles/comments | `GET /api/articles/...` | Public |
| **Create** article | `POST /api/articles/` | Admin (`is_staff`) |
| **Update** article | `PUT/PATCH /api/articles/{id}/` | Admin (`is_staff`) |
| **Delete** article | `DELETE /api/articles/{id}/` | Admin (`is_staff`) |
| **Create** comment | `POST /api/articles/{id}/comments/` | Authenticated |
| **Delete** comment | `DELETE /api/comments/{id}/` | Admin (`is_staff`) |
| **View/Update** own profile | `/api/me/` | Authenticated (owner) |

### Creating Admin Users

**Via Python (recommended):**
```python
from django.contrib.auth.models import User
User.objects.create_superuser(
    username='admin',
    email='admin@example.com',
    password='admin123'
)
```

**Via Management Command:**
```powershell
python manage.py createsuperuser
```

---

## 🗄 Database Schema

### Models

#### **User** (Django built-in)
- `id` (PK)
- `username` (unique)
- `email` (unique)
- `first_name`, `last_name`
- `is_staff`, `is_superuser`

#### **Article**
- `id` (PK)
- `title` (CharField, max 200)
- `content` (TextField)
- `author` (FK → User)
- `created_at` (DateTimeField, auto)
- `tags` (CharField, comma-separated)

#### **Comment**
- `id` (PK)
- `article` (FK → Article)
- `author` (FK → User)
- `content` (TextField)
- `created_at` (DateTimeField, auto)

### Relationships

```
User
 ├── articles (1:N) → Article
 └── comments (1:N) → Comment

Article
 └── comments (1:N) → Comment
```

---

## 🧪 Testing Examples

### PowerShell Testing Script

```powershell
# 1. Register user
$regBody = @{ username = "testuser"; email = "test@example.com"; password = "TestPass123!" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/register/" -Method Post -Body $regBody -ContentType "application/json"

# 2. Get token
$loginBody = @{ username = "testuser"; password = "TestPass123!" } | ConvertTo-Json
$token = (Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/token/" -Method Post -Body $loginBody -ContentType "application/json").access

# 3. View profile
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/me/" -Method Get -Headers $headers

# 4. Get articles (paginated)
$articles = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/articles/?page_size=5"
Write-Host "Total: $($articles.count), Retrieved: $(($articles.results).Count)"

# 5. Search articles
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/articles/?search=django"

# 6. Add comment (authenticated user)
$commentBody = @{ content = "Great article!" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/articles/1/comments/" -Method Post -Body $commentBody -ContentType "application/json" -Headers $headers
```

---

## 📝 Notes

### Query Optimization
- **N+1 Prevention**: Comments use `select_related('author', 'article')`
- **Default Ordering**: Defined in model Meta classes
- **Global Filter Backends**: Configured in `settings.py`

### Security
- JWT tokens expire after 60 minutes (configurable)
- Passwords validated using Django's built-in validators
- Email uniqueness enforced at serializer level
- CORS configured for frontend integration

### Development Tips
- Use separate terminals: one for `runserver`, one for testing
- Check `.env` for database configuration
- Admin panel available at `/admin/`
- Use `?format=json` for pretty JSON in browser

---

## 📦 Project Structure

```
django_blog_api/
├── articles/          # Article model, views, serializers
├── comments/          # Comment model, views, serializers
├── users/             # User registration, authentication
├── blog_project/      # Main project settings
│   ├── settings.py    # Django configuration
│   ├── urls.py        # Root URL config
│   ├── api_urls.py    # API URL patterns
│   └── pagination.py  # Custom pagination class
├── manage.py
├── requirements.txt
├── .env              # Environment variables (not in git)
└── db.sqlite3        # Dev database (if USE_SQLITE=True)
```

---

## 🎓 Development Notes

**Created by**: Maoz  
**Course Project**: Django REST Framework Blog API  
**Date**: February 2026  
**Python Version**: 3.12.6  
**Django Version**: 4.2.9

---

## 📄 License

Educational project - feel free to use for learning purposes.
