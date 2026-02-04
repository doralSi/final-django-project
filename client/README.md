# Blog React Client

A complete React frontend application for the Django REST Blog API.

## Tech Stack

- **Vite** - Build tool and dev server
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - State management for authentication
- **Plain CSS** - Styling with red theme

## Features

### Public Features
- View latest 3 articles on homepage
- Browse all articles with search, pagination, and ordering
- Read full article details
- View comments on articles
- User registration and login

### Authenticated User Features
- Post comments on articles
- Edit own comments
- Delete own comments

### Admin Features (is_staff=true)
- Full CRUD operations on articles
- Delete any comment
- Access to admin panel at `/admin/articles`

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Django backend running at `http://127.0.0.1:8000`

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` if your backend URL is different:
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser to:
   ```
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── api/
│   ├── apiClient.js      # Axios instance with interceptors
│   └── endpoints.js      # API endpoint functions
├── components/
│   ├── AdminRoute.jsx    # Protected route for admins
│   ├── Alert.jsx         # Alert/notification component
│   ├── ArticleCard.jsx   # Article preview card
│   ├── Button.jsx        # Reusable button component
│   ├── CommentForm.jsx   # Comment submission form
│   ├── CommentItem.jsx   # Individual comment with edit/delete
│   ├── Layout.jsx        # Main layout wrapper
│   ├── Loader.jsx        # Loading spinner
│   ├── Navbar.jsx        # Navigation bar
│   ├── Pagination.jsx    # Pagination controls
│   ├── ProtectedRoute.jsx # Protected route for auth users
│   └── TextInput.jsx     # Form input component
├── context/
│   └── AuthContext.jsx   # Authentication state management
├── pages/
│   ├── AdminArticles.jsx # Admin CRUD interface
│   ├── ArticleDetails.jsx # Single article view
│   ├── ArticlesList.jsx  # All articles list
│   ├── Home.jsx          # Homepage with latest articles
│   ├── Login.jsx         # Login page
│   └── Register.jsx      # Registration page
├── styles/
│   ├── components.css    # Component styles
│   ├── navbar.css        # Navbar styles
│   └── theme.css         # CSS variables and theme
├── utils/
│   └── date.js           # Date formatting utilities
├── App.jsx               # Main app component with routes
└── main.jsx              # App entry point
```

## Authentication

The app uses JWT token-based authentication:

1. **Login**: User credentials are sent to `/api/token/`
2. **Token Storage**: Access and refresh tokens stored in localStorage
3. **Auto-refresh**: Axios interceptor automatically refreshes expired tokens
4. **Protected Routes**: Routes check authentication status before rendering

### Token Flow
- Access token attached to all authenticated requests
- On 401 error, refresh token is used to get new access token
- If refresh fails, user is logged out and redirected to login

## API Integration

### Backend Endpoints Used

**Authentication:**
- `POST /api/register/` - User registration
- `POST /api/token/` - Login (get tokens)
- `POST /api/token/refresh/` - Refresh access token
- `GET /api/me/` - Get current user info

**Articles:**
- `GET /api/articles/` - List articles (supports search, ordering, pagination)
- `GET /api/articles/:id/` - Get single article
- `POST /api/articles/` - Create article (admin only)
- `PUT /api/articles/:id/` - Update article (admin only)
- `DELETE /api/articles/:id/` - Delete article (admin only)

**Comments:**
- `GET /api/articles/:id/comments/` - List article comments
- `POST /api/articles/:id/comments/` - Create comment (auth required)
- `PATCH /api/comments/:id/` - Update comment (owner only)
- `DELETE /api/comments/:id/` - Delete comment (owner or admin)

## Testing Flows

### 1. Public User Flow
1. Visit homepage - see 3 latest articles
2. Click "Articles" - browse all articles
3. Use search bar to find specific articles
4. Change ordering (newest/oldest/A-Z/Z-A)
5. Adjust page size (5/10/20 per page)
6. Click article to view details and comments

### 2. Registration & Login
1. Click "Register"
2. Fill in username, email, password
3. Submit form
4. Redirected to login page
5. Enter credentials and login
6. Redirected to homepage
7. See "Hello, username" in navbar

### 3. Authenticated User - Comments
1. Login first
2. Navigate to any article
3. Scroll to comments section
4. Add a new comment
5. Edit your own comment (Edit button appears)
6. Delete your own comment (Delete button with confirmation)

### 4. Admin User Flow
1. Login with admin account (is_staff=true)
2. See "Admin" link in navbar
3. Click "Admin" to access admin panel
4. **Create Article:**
   - Click "Create New Article"
   - Fill title, content, tags
   - Submit form
5. **Edit Article:**
   - Click "Edit" on any article
   - Modify fields
   - Save changes
6. **Delete Article:**
   - Click "Delete" button
   - Confirm deletion
7. **Search/Filter:**
   - Use search bar to find articles
   - Change ordering
   - Paginate through results

### 5. Comment Permissions Test
1. **As regular user:**
   - Can only edit/delete own comments
   - Cannot edit others' comments
2. **As admin:**
   - Can delete any comment
   - Cannot edit others' comments (only delete)

## Styling

The app uses a consistent red theme with CSS variables:

- **Primary Color**: Red (`#dc2626`)
- **Buttons**: Red primary, outlined secondary
- **Forms**: Consistent styling with validation states
- **Cards**: White background with shadows
- **Responsive**: Mobile-friendly layout

## Environment Variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Common Issues

### Backend Connection
- Ensure Django backend is running on `http://127.0.0.1:8000`
- Check CORS settings in Django allow requests from `http://localhost:5173`

### Authentication Issues
- Clear localStorage if experiencing token issues
- Check browser console for API errors
- Verify backend `/api/me/` endpoint returns `is_staff` field

### Admin Access
- User must have `is_staff=true` in Django database
- Create superuser with: `python manage.py createsuperuser`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## License

This project is part of a Django REST API course assignment.
