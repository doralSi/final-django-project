import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/">Blog</Link>
          </div>
          
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
            
            {isAdmin && (
              <Link to="/admin/articles">Admin</Link>
            )}
          </div>

          <div className="navbar-auth">
            {isAuthenticated ? (
              <>
                <span className="navbar-user">Hello, {user?.username}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
