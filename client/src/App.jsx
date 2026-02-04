import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import ArticlesList from './pages/ArticlesList';
import ArticleDetails from './pages/ArticleDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminArticles from './pages/AdminArticles';
import TestConnection from './pages/TestConnection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<TestConnection />} />
        <Route path="articles" element={<ArticlesList />} />
        <Route path="articles/:id" element={<ArticleDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route 
          path="admin/articles" 
          element={
            <AdminRoute>
              <AdminArticles />
            </AdminRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;
