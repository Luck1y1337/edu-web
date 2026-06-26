import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { publicApi } from "../../services/api";
import type { CreateBlogCommentDto } from "../../types/api.type";
import { queryKeys } from "../../config/queryKeys";

export const useBlogPosts = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.public.blog(params),
    queryFn: () => publicApi.getBlogPosts(params),
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: queryKeys.public.blogCategories,
    queryFn: publicApi.getBlogCategories,
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.public.blogPost(slug),
    queryFn: () => publicApi.getBlogPost(slug),
    enabled: Boolean(slug),
    retry: false,
  });
};

export const useCreateBlogComment = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["public", "blog", "comment", slug],
    mutationFn: async (body: CreateBlogCommentDto) => publicApi.createBlogComment(slug, body),
    onSuccess: () => {
      toast.success("Izoh moderatsiyaga yuborildi");
      queryClient.invalidateQueries({ queryKey: queryKeys.public.blogPost(slug) });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Izoh yuborilmadi");
    },
  });
};
