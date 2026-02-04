import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';
import Alert from './Alert';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container">
        <Alert type="error" message="You do not have permission to access this page." />
        <Navigate to="/" replace />
      </div>
    );
  }

  return children;
};

export default AdminRoute;
