import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import { queryKeys } from "../../config/queryKeys";

export const useAdminCertificates = (params?: Record<string, unknown>) =>
  useQuery({ queryKey: queryKeys.admin.certificates(params), queryFn: () => adminApi.getCertificates(params) });

export const useRevokeCertificate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.revokeCertificate(id),
    onSuccess: () => { toast.success("Sertifikat bekor qilindi"); qc.invalidateQueries({ queryKey: queryKeys.admin.certificates() }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Bekor qilib bo'lmadi"),
  });
};
