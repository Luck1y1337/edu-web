import axios from "../../config/axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import type { RegisterForm } from "../../types/register.type";
export const useRegister = () => {
  const onRegister = async (payload: RegisterForm) => {
    const url = Endpoints.auth.register;
    return axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterForm) => await onRegister(data),
  });
  return { mutateAsync };
};
