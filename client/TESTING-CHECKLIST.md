# 🧪 Pre-Flight Checklist

## ✅ בדיקות שצריך לעשות ידנית בדפדפן

### 1️⃣ CORS & ENV (פתח קונסול בדפדפן)

```javascript
// הדפס את ה-API URL
console.log(import.meta.env.VITE_API_BASE_URL);
// צריך להדפיס: http://127.0.0.1:8000/api
```

### 2️⃣ בדיקת חיבור לשרת

פתח את הדפדפן ב: http://localhost:5173

בקונסול צריך לראות:
```
🔗 API Base URL: http://127.0.0.1:8000/api
```

### 3️⃣ בדיקת CORS (Network Tab)

1. פתח Network בדפדפן
2. נווט להום פייג׳
3. חפש request ל-`/articles/`
4. ודא שאין שגיאת CORS

### 4️⃣ בדיקת Authentication Flow

**הכנה:**
- צור משתמש admin אם אין:
```bash
cd django_blog_api
python manage.py createsuperuser
```

**בדיקה:**
1. לך ל-/login
2. התחבר
3. ב-Application > Local Storage צריך לראות:
   - `accessToken`
   - `refreshToken`
4. ב-Navbar צריך לראות: "Hello, [username]"

### 5️⃣ בדיקת Admin Access

1. התחבר כ-admin (is_staff=true)
2. בNavbar צריך לראות לינק "Admin"
3. לחץ עליו - צריך להגיע ל-`/admin/articles`
4. התנתק
5. התחבר כמשתמש רגיל
6. נסה להגיע ל-`/admin/articles` ישירות דרך ה-URL
7. צריך להיות redirect להום עם הודעת שגיאה

### 6️⃣ בדיקת Token Refresh

**סימולציה:**
1. התחבר
2. פתח Application > Local Storage
3. מחק את ה-`accessToken` (השאר רק refresh)
4. עשה רענון לדף
5. הסתכל ב-Network - צריך לראות:
   - קריאה ל-`/me/` (נכשלת עם 401)
   - קריאה ל-`/token/refresh/` (מצליחה)
   - קריאה ל-`/me/` שוב (מצליחה עם token חדש)

---

## 🐛 בעיות נפוצות ופתרונות

### CORS Error
```
Access to XMLHttpRequest at 'http://127.0.0.1:8000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**פתרון:** ✅ כבר תוקן - CORS_ALLOWED_ORIGINS עודכן ל-port 5173

### ENV לא נטען
```javascript
console.log(import.meta.env.VITE_API_BASE_URL); // undefined
```

**פתרון:**
1. ודא שקיים `.env` בשורש `client/`
2. שהשם מתחיל ב-`VITE_`
3. עצור את `npm run dev` והרץ שוב

### Infinite Refresh Loop
צריך לראות בקונסול המון קריאות ל-`/token/refresh/`

**פתרון:** ✅ כבר תוקן - הוספנו queue mechanism

### Navbar לא מתעדכן אחרי login
**בדוק:**
- AuthContext מעטף את כל האפליקציה ב-`main.jsx`
- `fetchUser()` נקרא אחרי login מוצלח

---

## 📋 מצב נוכחי

### ✅ גמור
- [x] Vite + React setup
- [x] Routing (react-router-dom)
- [x] Theme (CSS variables, red accent)
- [x] CORS (port 5173)
- [x] axios + interceptors (anti-loop)
- [x] AuthContext structure
- [x] Protected routes
- [x] Admin routes
- [x] Component library (Button, TextInput, Alert, Loader, etc.)

### 🟡 מוכן לבדיקה
- [ ] Login flow
- [ ] Register flow
- [ ] Logout
- [ ] Token refresh
- [ ] Admin detection

### 🔴 טרם הושלם
- [ ] Articles list (Home - 3 latest)
- [ ] Articles list (All with search/pagination)
- [ ] Article details
- [ ] Comments CRUD
- [ ] Admin CRUD panel

---

## 🎯 Next Steps

אחרי שכל הבדיקות למעלה עוברות:

1. **בדוק Login/Register** - האם Authentication באמת עובד
2. **בדוק Navigation** - Navbar משתנה בהתאם למצב
3. **בדוק Admin Route** - רק admin נכנס
4. רק אז תתחיל עם Articles/Comments

---

## 🚀 Quick Test Commands

```bash
# Terminal 1 - Django
cd c:\Users\maoz\final-Django-project\django_blog_api
python manage.py runserver

# Terminal 2 - React
cd c:\Users\maoz\final-Django-project\client
npm run dev

# Terminal 3 - Create admin user (if needed)
cd c:\Users\maoz\final-Django-project\django_blog_api
python manage.py createsuperuser

# Terminal 4 - Seed data (if needed)
cd c:\Users\maoz\final-Django-project\django_blog_api
python manage.py seed
```

---

**📌 זכור:** אל תתקדם ל-Phase 3 (Articles) לפני ש-Authentication עובד 100%!
