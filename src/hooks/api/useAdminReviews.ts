import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import type { ModerateReviewDto } from "../../types/api.type";

export const useAdminReviews = (params?: Record<string, unknown>) =>
  useQuery({ queryKey: ["admin", "reviews", params], queryFn: () => adminApi.getReviews(params) });

export const useModerateReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: ModerateReviewDto }) => adminApi.moderateReview(id, body),
    onSuccess: () => { toast.success("Sharh moderatsiya qilindi"); qc.invalidateQueries({ queryKey: ["admin", "reviews"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Xatolik"),
  });
};
