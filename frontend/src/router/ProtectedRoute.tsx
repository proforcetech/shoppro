import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  // First, wait for the initial token check to complete.
  // While loading is true, don't render anything or redirect.
  if (loading) {
    return <div>Loading session...</div>; // Or a spinner component
  }

  // After loading is false, now check for authentication.
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the requested component (e.g., Dashboard).
  return children;
};

export default ProtectedRoute;
