import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthHydration } from "../../hooks/useAuthHydration";
import GlobalSpinner from "../ui/GlobalSpinner";
import type { UserRole } from "../../types/api.type";

const ADMIN_ROLES: UserRole[] = ["admin", "super_admin"];

const AdminRoute = () => {
  const location = useLocation();
  const { token, user, isLoading } = useAuthHydration();

  if (!token) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (isLoading) return <GlobalSpinner />;
  if (user && !ADMIN_ROLES.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
