import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required for this route...
  if (role) {
    // ...and if the user is NOT an ADMIN AND their role does NOT match the required one...
    if (user.role !== 'ADMIN' && user.role !== role) {
      // ...then deny access.
      return <Navigate to="/unauthorized" />;
    }
  }

  // Allow access if no role is required, if the user is an ADMIN, or if the user's role matches.
  return <>{children}</>;
};

export default ProtectedRoute;
