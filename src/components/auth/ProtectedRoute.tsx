import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthHydration } from "../../hooks/useAuthHydration";
import GlobalSpinner from "../ui/GlobalSpinner";

const ProtectedRoute = () => {
  const location = useLocation();
  const { token, isLoading } = useAuthHydration();

  if (!token) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (isLoading) return <GlobalSpinner />;

  return <Outlet />;
};

export default ProtectedRoute;
