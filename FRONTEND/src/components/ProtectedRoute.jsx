import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return (<p>Loading...</p>);

  if (!user) return (<Navigate to="/login" />);

  const userRole = user.role?.name;

  // console.log('Protected route: Role ->', userRole)
  if (!userRole) return <p>Verifying access...</p>;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // optional: use fallback route
    // Or: return <p>Unauthorized - You don't have access to this page</p>;
  }


  return <>{children}</>;
};

export default ProtectedRoute;
