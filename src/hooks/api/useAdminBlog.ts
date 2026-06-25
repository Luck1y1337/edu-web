import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { adminApi } from "../../services/api";
import type { CreateBlogPostDto, UpdateBlogPostDto, CreateBlogCategoryDto, ModerateCommentDto } from "../../types/api.type";

export const useAdminBlogPosts = (params?: Record<string, unknown>) =>
  useQuery({ queryKey: ["admin", "blog", "posts", params], queryFn: () => adminApi.getBlogPosts(params) });

export const useCreateBlogPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateBlogPostDto) => adminApi.createBlogPost(body),
    onSuccess: () => { toast.success("Post yaratildi"); qc.invalidateQueries({ queryKey: ["admin", "blog", "posts"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Yaratib bo'lmadi"),
  });
};

export const useUpdateBlogPost = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateBlogPostDto) => adminApi.updateBlogPost(id, body),
    onSuccess: () => { toast.success("Post yangilandi"); qc.invalidateQueries({ queryKey: ["admin", "blog", "posts"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Yangilab bo'lmadi"),
  });
};

export const useDeleteBlogPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteBlogPost(id),
    onSuccess: () => { toast.success("Post o'chirildi"); qc.invalidateQueries({ queryKey: ["admin", "blog", "posts"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "O'chirib bo'lmadi"),
  });
};

export const usePublishBlogPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.publishBlogPost(id),
    onSuccess: () => { toast.success("Post nashr etildi"); qc.invalidateQueries({ queryKey: ["admin", "blog", "posts"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Nashr etib bo'lmadi"),
  });
};

export const useCreateBlogCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateBlogCategoryDto) => adminApi.createBlogCategory(body),
    onSuccess: () => { toast.success("Kategoriya yaratildi"); qc.invalidateQueries({ queryKey: ["admin", "blog"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Yaratib bo'lmadi"),
  });
};

export const useAdminBlogComments = (params?: Record<string, unknown>) =>
  useQuery({ queryKey: ["admin", "blog", "comments", params], queryFn: () => adminApi.getBlogComments(params) });

export const useModerateBlogComment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: ModerateCommentDto }) => adminApi.moderateBlogComment(id, body),
    onSuccess: () => { toast.success("Izoh moderatsiya qilindi"); qc.invalidateQueries({ queryKey: ["admin", "blog", "comments"] }); },
    onError: (e: AxiosError<{ message?: string }>) => toast.error(e.response?.data?.message || "Xatolik"),
  });
};
