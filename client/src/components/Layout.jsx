import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingBottom: 'var(--spacing-2xl)' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
