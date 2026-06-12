import axios from "../../config/axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import type { RegisterForm } from "../../types/register.type";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
export const useRegister = () => {
  const onRegister = async (payload: RegisterForm) => {
    const url = Endpoints.auth.register;
    return axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { mutateAsync, isPending, data, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterForm) => await onRegister(data),
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        //@ts-ignore
        const message = error.response.data.message;
        toast.error(message);
      }
    },
  });
  return { mutateAsync, data, isPending, isSuccess };
};
