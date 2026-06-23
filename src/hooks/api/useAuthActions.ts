import { useMutation } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return axios.post(Endpoints.auth.forgotPassword, { email });
    },
    onSuccess: () => {
      toast.success("Parolni tiklash bo'yicha ko'rsatmalar pochtangizga yuborildi");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Xatolik yuz berdi";
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: { token: string; newPassword: string }) => {
      return axios.post(Endpoints.auth.resetPassword, data);
    },
    onSuccess: () => {
      toast.success("Parolingiz muvaffaqiyatli yangilandi");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Xatolik yuz berdi";
      toast.error(message);
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      return axios.post(Endpoints.auth.verifyEmail, { token });
    },
  });
};
