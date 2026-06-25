import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import type { CreateInstructorDto, UpdateInstructorDto } from "../../types/api.type";

export const useAdminInstructors = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["admin", "instructors", params],
    queryFn: () => adminApi.getInstructors(params),
  });
};

export const useAdminInstructor = (id: string) => {
  return useQuery({
    queryKey: ["admin", "instructor", id],
    queryFn: () => adminApi.getInstructor(id),
    enabled: Boolean(id),
    retry: false,
  });
};

export const useCreateAdminInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "instructor", "create"],
    mutationFn: async (body: CreateInstructorDto) => adminApi.createInstructor(body),
    onSuccess: () => {
      toast.success("O'qituvchi qo'shildi");
      queryClient.invalidateQueries({ queryKey: ["admin", "instructors"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "O'qituvchini qo'shib bo'lmadi");
    },
  });
};

export const useUpdateAdminInstructor = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "instructor", "update", id],
    mutationFn: async (body: UpdateInstructorDto) => adminApi.updateInstructor(id, body),
    onSuccess: () => {
      toast.success("Ma'lumotlar yangilandi");
      queryClient.invalidateQueries({ queryKey: ["admin", "instructors"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "instructor", id] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Yangilab bo'lmadi");
    },
  });
};

export const useDeleteAdminInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "instructor", "delete"],
    mutationFn: async (id: string) => adminApi.deleteInstructor(id),
    onSuccess: () => {
      toast.success("O'qituvchi o'chirildi");
      queryClient.invalidateQueries({ queryKey: ["admin", "instructors"] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "O'chirib bo'lmadi");
    },
  });
};
