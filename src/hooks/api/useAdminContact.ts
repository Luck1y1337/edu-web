import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import type { UpdateContactStatusDto } from "../../types/api.type";

export const useAdminContactMessages = (params?: Record<string, unknown>) =>
  useQuery({ queryKey: ["admin", "contact", params], queryFn: () => adminApi.getContactMessages(params) });

export const useUpdateContactStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateContactStatusDto }) => adminApi.updateContactStatus(id, body),
    onSuccess: () => { toast.success("Xabar holati yangilandi"); qc.invalidateQueries({ queryKey: ["admin", "contact"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Xatolik"),
  });
};
