import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../../utils/localstorage";

const ProtectedRoute = () => {
  const token = getItem();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
