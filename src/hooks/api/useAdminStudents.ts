import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import { queryKeys } from "../../config/queryKeys";
import type {
  CreateAdminStudentDto,
  UpdateAdminStudentDto,
} from "../../types/api.type";

export const useAdminStudents = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.admin.students(params),
    queryFn: () => adminApi.getStudents(params),
  });
};

export const useAdminStudent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.admin.student(id),
    queryFn: () => adminApi.getStudent(id),
    enabled: Boolean(id),
    retry: false,
  });
};

export const useAdminStudentEnrollments = (id: string) => {
  return useQuery({
    queryKey: queryKeys.admin.studentEnrollments(id),
    queryFn: () => adminApi.getStudentEnrollments(id),
    enabled: Boolean(id),
    retry: false,
  });
};

export const useAdminStudentPayments = (id: string) => {
  return useQuery({
    queryKey: queryKeys.admin.studentPayments(id),
    queryFn: () => adminApi.getStudentPayments(id),
    enabled: Boolean(id),
    retry: false,
  });
};

export const useCreateAdminStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "student", "create"],
    mutationFn: async (body: CreateAdminStudentDto) => adminApi.createStudent(body),
    onSuccess: () => {
      toast.success("Talaba qo'shildi");
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.students() });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Talabani qo'shib bo'lmadi");
    },
  });
};

export const useUpdateAdminStudent = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "student", "update", id],
    mutationFn: async (body: UpdateAdminStudentDto) => adminApi.updateStudent(id, body),
    onSuccess: () => {
      toast.success("Ma'lumotlar yangilandi");
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.students() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.student(id) });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Yangilab bo'lmadi");
    },
  });
};

export const useDeleteAdminStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "student", "delete"],
    mutationFn: async (id: string) => adminApi.deleteStudent(id),
    onSuccess: (_data, id) => {
      toast.success("Talaba o'chirildi");
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.students() });
      queryClient.removeQueries({ queryKey: queryKeys.admin.student(id) });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "O'chirib bo'lmadi");
    },
  });
};
