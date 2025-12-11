import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MasterLayout } from "../layouts/MasterLayout";

export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated }: any = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <MasterLayout>{children}</MasterLayout>;
};
