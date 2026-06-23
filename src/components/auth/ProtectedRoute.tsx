import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../../utils/localstorage";
import { useMe } from "../../hooks/api/useMe";
import useUserStore from "../../store/user.store";
import GlobalSpinner from "../ui/GlobalSpinner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const token = getItem();
  const { user, setUser } = useUserStore();
  
  // Only fetch if we have a token but no user data in store
  const { data, isLoading, isSuccess } = useMe(!!token && !user);

  useEffect(() => {
    if (isSuccess && data) {
      // The API might return user nested or directly
      const userObj = data.user || data;
      setUser(userObj);
    }
  }, [isSuccess, data, setUser]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading && !user) {
    return <GlobalSpinner />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
