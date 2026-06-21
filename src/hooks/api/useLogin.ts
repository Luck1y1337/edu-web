import axios from "../../config/axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import type { LoginForm } from "../../types/login.type";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useLogin = () => {
  const onLogin = async (payload: LoginForm) => {
    const url = Endpoints.auth.login;
    return axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { mutateAsync, isPending, data, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginForm) => await onLogin(data),
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      toast.error(message || "Email yoki parol noto'g'ri");
    },
  });

  return { mutateAsync, data, isPending, isSuccess };
};
