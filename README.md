# Django Blog Project - פרויקט בלוג מלא

פרויקט בלוג מלא עם Django REST Framework ו-React, כולל מערכת הרשאות, אימות JWT, וניהול תגובות.

---

## 📋 תוכן עניינים

- [דרישות מערכת](#דרישות-מערכת)
- [התקנה ראשונית](#התקנה-ראשונית)
- [הגדרת משתני סביבה](#הגדרת-משתני-סביבה)
- [הרצת הפרויקט](#הרצת-הפרויקט)
- [פרטי משתמשים](#פרטי-משתמשים)
- [תכונות עיקריות](#תכונות-עיקריות)
- [מבנה הפרויקט](#מבנה-הפרויקט)

---

## 🔧 דרישות מערכת

- **Python 3.10+**
- **Node.js 18+** ו-npm
- **PostgreSQL 14+**
- **Git**

---

## 📦 התקנה ראשונית

### 1. שכפול הפרויקט

```bash
git clone <repository-url>
cd final-Django-project
```

### 2. יצירת סביבה וירטואלית והתקנת תלויות Python

```bash
# יצירת סביבה וירטואלית
python -m venv .venv

# הפעלת הסביבה הוירטואלית
# ב-Windows:
.venv\Scripts\activate
# ב-Linux/Mac:
source .venv/bin/activate

# התקנת תלויות
cd django_blog_api
pip install -r requirements.txt
```

### 3. הגדרת PostgreSQL

צור מסד נתונים חדש בשם `blog_db`:

```sql
CREATE DATABASE blog_db;
```

---

## ⚙️ הגדרת משתני סביבה

### Backend (Django)

צור קובץ `.env` בתוך תיקיית `django_blog_api/` עם התוכן הבא:

```dotenv
# Django Settings
SECRET_KEY=**_p5#sdblbgf8yov%0kg)7@d=k3or4vcp*omeb06ri4)d#2$2
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Use SQLite for testing (set to False for PostgreSQL)
USE_SQLITE=False

# PostgreSQL Database
DB_NAME=blog_db
DB_USER=postgres
DB_PASSWORD=8888
DB_HOST=127.0.0.1
DB_PORT=5432

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

**שים לב:** עדכן את `DB_PASSWORD` לסיסמת PostgreSQL שלך.

### Frontend (React)

צור קובץ `.env` בתוך תיקיית `client/` עם התוכן הבא:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## 🚀 הרצת הפרויקט

### שלב 1: הגדרת מסד הנתונים

```bash
cd django_blog_api

# הרצת migrations
python manage.py migrate

# טעינת נתוני דוגמה (משתמשים, כתבות, תגובות)
python manage.py seed_data
```

### שלב 2: הפעלת שרת Django

```bash
# מתוך תיקיית django_blog_api
python manage.py runserver
```

השרת ירוץ על: **http://127.0.0.1:8000/**

- **Browsable API**: http://127.0.0.1:8000/api/
- **Admin Panel**: http://127.0.0.1:8000/admin/

### שלב 3: הפעלת React Client

פתח טרמינל חדש:

```bash
cd client

# התקנת תלויות (פעם ראשונה בלבד)
npm install

# הפעלת שרת הפיתוח
npm run dev
```

האפליקציה תרוץ על: **http://localhost:5173/**

---

## 👥 פרטי משתמשים

לאחר הרצת `python manage.py seed_data`, יווצרו המשתמשים הבאים:

### 🔑 מנהל (Admin)
- **שם משתמש:** `admin`
- **סיסמה:** `admin123`
- **הרשאות:** מלאות (יצירה/עריכה/מחיקה של כתבות, מחיקת תגובות)

### 👤 משתמש רגיל
- **שם משתמש:** `reg`
- **סיסמה:** `reg!1234`
- **הרשאות:** קריאה, כתיבת תגובות, עריכה/מחיקה של תגובות עצמיות

### 🧪 משתמש בדיקה
- **שם משתמש:** `testuser`
- **סיסמה:** `testpass123`
- **הרשאות:** קריאה, כתיבת תגובות, עריכה/מחיקה של תגובות עצמיות

---

## ✨ תכונות עיקריות

### Backend (Django REST Framework)

- ✅ **אימות JWT** - access token + refresh token
- ✅ **CRUD מלא** לכתבות (מנהלים בלבד)
- ✅ **CRUD מלא** לתגובות (משתמשים רשומים)
- ✅ **חיפוש ופילטור** - לפי כותרת, תוכן, תגיות, שם מחבר
- ✅ **מיון** - לפי תאריך, כותרת
- ✅ **Pagination** - עימוד אוטומטי
- ✅ **הרשאות מדורגות**:
  - כתבות: רק מנהלים יכולים ליצור/לערוך/למחוק
  - תגובות: כל משתמש רשום יכול לכתוב
  - עריכת תגובה: רק הבעלים
  - מחיקת תגובה: הבעלים או מנהל

### Frontend (React + Vite)

- ✅ **ממשק משתמש אדום** - עיצוב נקי ללא ספריות CSS
- ✅ **ניווט דינמי** - react-router-dom
- ✅ **ניהול state גלובלי** - Context API
- ✅ **Token Refresh אוטומטי** - עם מנגנון anti-loop
- ✅ **דפים**:
  - דף הבית - 3 כתבות אחרונות
  - רשימת כתבות - חיפוש, פילטור, מיון
  - פרטי כתבה - תוכן מלא + תגובות
  - התחברות/הרשמה - עם password toggle
  - פאנל ניהול - יצירה/עריכה/מחיקה של כתבות (מנהלים)

---

## 📁 מבנה הפרויקט

```
final-Django-project/
├── django_blog_api/              # Backend - Django REST API
│   ├── articles/                 # אפליקציית כתבות
│   │   ├── management/commands/
│   │   │   └── seed_data.py     # פקודת טעינת נתונים
│   │   ├── models.py            # מודל Article
│   │   ├── serializers.py       # Serializers
│   │   ├── views.py             # Views
│   │   └── permissions.py       # הרשאות מותאמות
│   ├── comments/                # אפליקציית תגובות
│   │   ├── models.py            # מודל Comment
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── permissions.py
│   ├── users/                   # אפליקציית משתמשים
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── blog_project/            # הגדרות פרויקט
│   │   ├── settings.py          # הגדרות Django
│   │   ├── urls.py
│   │   └── pagination.py        # Pagination מותאם
│   ├── manage.py
│   ├── requirements.txt
│   └── .env                     # משתני סביבה (לא במאגר)
│
├── client/                      # Frontend - React + Vite
│   ├── src/
│   │   ├── api/                 # קריאות API
│   │   │   ├── apiClient.js     # Axios instance + interceptors
│   │   │   └── endpoints.js     # פונקציות API
│   │   ├── components/          # קומפוננטות
│   │   │   ├── Navbar.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # ניהול אימות
│   │   ├── pages/               # דפים
│   │   │   ├── Home.jsx
│   │   │   ├── ArticlesList.jsx
│   │   │   ├── ArticleDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AdminArticles.jsx
│   │   ├── styles/              # CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env                     # משתני סביבה (לא במאגר)
│
└── README.md                    # המסמך הזה
```

---

## 🌐 נקודות קצה API

### Authentication
- `POST /api/register/` - הרשמת משתמש חדש
- `POST /api/token/` - התחברות (קבלת tokens)
- `POST /api/token/refresh/` - רענון access token
- `GET /api/me/` - פרטי המשתמש המחובר

### Articles
- `GET /api/articles/` - רשימת כל הכתבות
- `GET /api/articles/?search=<query>` - חיפוש
- `GET /api/articles/<id>/` - פרטי כתבה
- `POST /api/articles/` - יצירת כתבה (מנהל)
- `PUT /api/articles/<id>/` - עדכון כתבה (מנהל)
- `DELETE /api/articles/<id>/` - מחיקת כתבה (מנהל)

### Comments
- `GET /api/articles/<id>/comments/` - תגובות לכתבה
- `POST /api/articles/<id>/comments/` - הוספת תגובה (משתמש רשום)
- `PATCH /api/comments/<id>/` - עריכת תגובה (בעלים)
- `DELETE /api/comments/<id>/` - מחיקת תגובה (בעלים או מנהל)

---

## 🧪 בדיקת הפרויקט

### דרך ה-Browsable API

1. גש ל-http://127.0.0.1:8000/api/articles/
2. התחבר דרך הכפתור "Log in" בפינה השמאלית העליונה
3. השתמש בממשק הגרפי לבדיקת API

### דרך React Client

1. גש ל-http://localhost:5173/
2. התחבר עם אחד מהמשתמשים למעלה
3. נסה ליצור תגובות, לחפש כתבות, וכו'
4. התחבר כמנהל (admin) כדי לראות את פאנל הניהול

---

## 📝 פקודות שימושיות

### ניקוי מסד נתונים וטעינה מחדש

```bash
cd django_blog_api
python manage.py seed_data --clear
```

### יצירת superuser נוסף

```bash
python manage.py createsuperuser
```

### הרצת בדיקות

```bash
# Backend tests
python manage.py test

# Frontend tests
cd client
npm run test
```

---

## 🛠 טכנולוגיות

### Backend
- Django 4.2.9
- Django REST Framework 3.14.0
- djangorestframework-simplejwt 5.3.1
- django-filter 23.5
- django-cors-headers 4.3.1
- python-decouple 3.8
- psycopg2-binary 2.9.9

### Frontend
- React 19.2.0
- Vite 7.2.4
- react-router-dom 7.1.1
- axios 1.7.9

---

## 📧 תמיכה

לשאלות או בעיות, אנא פנה למפתח הפרויקט.

---

**תאריך:** פברואר 2026
