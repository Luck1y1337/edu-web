import axios from "../../config/axios";
import { useMutation } from "@tanstack/react-query";
import type { LoginForm } from "../../types/login.type";
import Endpoints from "../../config/endpoints";
import { toast } from "react-toastify";

export const useLogin = () => {
  const onLogin = async (payload: LoginForm) => {
    try {
      const url = Endpoints.auth.login;
      const response = await axios.post(url, {
        identifier: payload.email,
        password: payload.password
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Kirishda xatolik yuz berdi");
      throw error;
    }
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginForm) => await onLogin(data),
  });
  
  return { mutateAsync };
};
