import { useMutation } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ChangePasswordDto } from "../../types/api.type";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordDto) => {
      return axios.patch(Endpoints.user.changePassword, data);
    },
    onSuccess: () => {
      toast.success("Parolingiz muvaffaqiyatli o'zgartirildi");
    },
    onError: (error: AxiosError<{ message: string | string[] }>) => {
      const msgData = error.response?.data?.message;
      const message = Array.isArray(msgData) ? msgData.join(", ") : msgData;
      toast.error(message || "Parolni o'zgartirishda xatolik yuz berdi");
    },
  });
};
