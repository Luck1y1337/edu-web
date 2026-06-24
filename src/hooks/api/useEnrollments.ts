import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { studentApi } from "../../services/api";
import type { CheckoutDto } from "../../types/api.type";

export const useEnrollments = () => {
  return useQuery({
    queryKey: ["student", "enrollments"],
    queryFn: studentApi.getEnrollments,
  });
};

export const useEnrollment = (courseId: string) => {
  return useQuery({
    queryKey: ["student", "enrollment", courseId],
    queryFn: () => studentApi.getEnrollment(courseId),
    enabled: Boolean(courseId),
    retry: false,
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "checkout"],
    mutationFn: async (body: CheckoutDto) => studentApi.checkout(body),
    onSuccess: () => {
      toast.success("Kurs sotib olindi");
      queryClient.invalidateQueries({ queryKey: ["student", "enrollments"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "To'lov amalga oshmadi");
    },
  });
};

export const useMarkLessonProgress = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "lesson", "progress"],
    mutationFn: async (params: {
      lessonId: string;
      status: "in_progress" | "completed";
      watchedSeconds?: number;
    }) =>
      studentApi.markLessonProgress(params.lessonId, {
        status: params.status,
        watchedSeconds: params.watchedSeconds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "enrollment", courseId] });
      queryClient.invalidateQueries({ queryKey: ["student", "enrollments"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Progressni saqlab bo'lmadi");
    },
  });
};
