import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode; // Use ReactNode for maximum compatibility
  role?: string;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  // Return the children. Wrapping in a fragment is good practice.
  return <>{children}</>;
};

export default ProtectedRoute;