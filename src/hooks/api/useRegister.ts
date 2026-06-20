import axios from "../../config/axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import type { RegisterForm } from "../../types/register.type";
import { toast } from "react-toastify";

export const useRegister = () => {
  const onRegister = async (payload: RegisterForm) => {
    try {
      const url = Endpoints.auth.register;
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
      throw error;
    }
  };

  const { mutateAsync, isSuccess, data, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterForm) => await onRegister(data),
  });
  return { mutateAsync, isSuccess, data, isPending };
};
