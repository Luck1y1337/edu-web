import axios from "axios";
import { getItem, getRefreshToken, setItem, clearTokens } from "../utils/localstorage";
import useUserStore from "../store/user.store";
import Endpoints from "./endpoints";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1",
});

instance.interceptors.request.use(
  (config) => {
    const token = getItem();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Use base axios to avoid infinite loops with interceptors
          const res = await axios.post(
            `${instance.defaults.baseURL}${Endpoints.auth.refresh}`,
            { refreshToken }
          );

          const newAccessToken = res.data?.data?.tokens?.accessToken || res.data?.data?.accessToken;
          
          if (newAccessToken) {
            setItem(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, logout
        }
      }

      // If no refresh token or refresh failed
      clearTokens();
      useUserStore.getState().logout();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default instance;
