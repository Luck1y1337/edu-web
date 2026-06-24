import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { publicApi } from "../../services/api";
import type { ContactFormDto } from "../../types/api.type";

export const useSendContact = () => {
  return useMutation({
    mutationKey: ["public", "contact"],
    mutationFn: async (body: ContactFormDto) => publicApi.sendContact(body),
    onSuccess: () => {
      toast.success("Xabaringiz qabul qilindi. Tez orada javob beramiz.");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Xabar yuborilmadi");
    },
  });
};
