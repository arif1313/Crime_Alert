import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";


// Wrapper for protected routes
const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render child routes if logged in
};

export default ProtectedRoute;
