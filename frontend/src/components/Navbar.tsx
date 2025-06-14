// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const userHasRole = (roles: string[]) => {
    return user && roles.includes(user.role);
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Repair Shop</Link>
      </h1>
      <div>
        {user && (
          <div className="flex items-center space-x-4">
            {userHasRole(['ADMIN', 'MANAGER']) && <Link to="/dashboard">Dashboard</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'FRONT_DESK']) && <Link to="/customers">Customers</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'FRONT_DESK']) && <Link to="/estimates">Estimates</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'FRONT_DESK']) && <Link to="/invoices">Invoices</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'FRONT_DESK']) && <Link to="/appointments">Appointments</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'FRONT_DESK']) && <Link to="/support">Suport</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'FRONT_DESK']) && <Link to="/warranty">Warranty</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER']) && <Link to="/analytics">Analytics</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN', 'MANAGER', 'ACCOUNTANT']) && <Link to="/reports">Reports</Link>}&nbsp;|&nbsp;
            {userHasRole(['ADMIN']) && <Link to="/settings">Settings</Link>}
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};