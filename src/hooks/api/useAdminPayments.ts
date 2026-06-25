import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import type { UpdatePaymentStatusDto, RefundPaymentDto } from "../../types/api.type";

export const useAdminPayments = (params?: Record<string, unknown>) =>
  useQuery({ queryKey: ["admin", "payments", params], queryFn: () => adminApi.getPayments(params) });

export const useUpdatePaymentStatus = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdatePaymentStatusDto) => adminApi.updatePaymentStatus(id, body),
    onSuccess: () => { toast.success("To'lov holati yangilandi"); qc.invalidateQueries({ queryKey: ["admin", "payments"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Xatolik"),
  });
};

export const useRefundPayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RefundPaymentDto }) => adminApi.refundPayment(id, body),
    onSuccess: () => { toast.success("To'lov qaytarildi"); qc.invalidateQueries({ queryKey: ["admin", "payments"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Qaytarib bo'lmadi"),
  });
};
