import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { studentApi } from "../../services/api";
import { queryKeys } from "../../config/queryKeys";

export const useCertificates = () => {
  return useQuery({
    queryKey: queryKeys.student.certificates,
    queryFn: studentApi.getCertificates,
  });
};

export const useClaimCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "certificate", "claim"],
    mutationFn: async (courseId: string) => studentApi.claimCertificate(courseId),
    onSuccess: () => {
      toast.success("Sertifikat olindi");
      queryClient.invalidateQueries({ queryKey: queryKeys.student.certificates });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Sertifikatni olib bo'lmadi");
    },
  });
};
