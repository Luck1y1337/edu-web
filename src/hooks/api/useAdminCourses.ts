import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import { queryKeys } from "../../config/queryKeys";
import type { CreateCourseDto, UpdateCourseDto } from "../../types/api.type";

export const useAdminCourses = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.admin.courses(params),
    queryFn: () => adminApi.getCourses(params),
  });
};

export const useAdminCourse = (id: string) => {
  return useQuery({
    queryKey: queryKeys.admin.course(id),
    queryFn: () => adminApi.getCourse(id),
    enabled: Boolean(id),
    retry: false,
  });
};

export const useCreateAdminCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "course", "create"],
    mutationFn: async (body: CreateCourseDto) => adminApi.createCourse(body),
    onSuccess: () => {
      toast.success("Kurs yaratildi");
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.courses() });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Kursni yaratib bo'lmadi");
    },
  });
};

export const useUpdateAdminCourse = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "course", "update", id],
    mutationFn: async (body: UpdateCourseDto) => adminApi.updateCourse(id, body),
    onSuccess: () => {
      toast.success("Kurs yangilandi");
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.courses() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.course(id) });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Yangilab bo'lmadi");
    },
  });
};

export const useDeleteAdminCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "course", "delete"],
    mutationFn: async (id: string) => adminApi.deleteCourse(id),
    onSuccess: () => {
      toast.success("Kurs o'chirildi");
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.courses() });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "O'chirib bo'lmadi");
    },
  });
};
