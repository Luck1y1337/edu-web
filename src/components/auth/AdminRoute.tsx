import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getItem } from "../../utils/localstorage";
import { useMe } from "../../hooks/api/useMe";
import useUserStore from "../../store/user.store";
import GlobalSpinner from "../ui/GlobalSpinner";
import type { CurrentUserDto, UserRole } from "../../types/api.type";

const ADMIN_ROLES: UserRole[] = ["admin", "super_admin"];

const AdminRoute = () => {
  const location = useLocation();
  const token = getItem();
  const { user, setUser } = useUserStore();

  const { data, isLoading, isSuccess } = useMe(!!token && !user);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data as CurrentUserDto);
    }
  }, [isSuccess, data, setUser]);

  if (!token) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (isLoading && !user) return <GlobalSpinner />;
  if (user && !ADMIN_ROLES.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
