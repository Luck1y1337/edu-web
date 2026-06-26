import axios from "axios";
import { toast } from "react-toastify";
import { getItem, getRefreshToken, setItem, clearTokens } from "../utils/localstorage";
import useUserStore from "../store/user.store";
import Endpoints from "./endpoints";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "/api/v1",
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

let refreshPromise: Promise<string | null> | null = null;

const doRefresh = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await axios.post(
      `${instance.defaults.baseURL}${Endpoints.auth.refresh}`,
      { refreshToken }
    );
    const newAccessToken =
      res.data?.data?.tokens?.accessToken || res.data?.data?.accessToken;
    return newAccessToken || null;
  } catch {
    return null;
  }
};

const forceLogout = () => {
  clearTokens();
  useUserStore.getState().logout();
  window.location.replace("/login");
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403) {
      toast.error("Ruxsat yo'q — sizda bu amalni bajarish huquqi mavjud emas");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      if (newAccessToken) {
        setItem(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      }

      forceLogout();
    }

    return Promise.reject(error);
  }
);

export default instance;
