import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import { toast } from "react-toastify";

// Types can be extracted to a separate file later if needed
export interface SessionData {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
  location?: string;
}

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.user.sessions);
      return (data?.data || data) as SessionData[];
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(Endpoints.user.session(id));
    },
    onSuccess: () => {
      toast.success("Sessiya muvaffaqiyatli yakunlandi");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: () => {
      toast.error("Sessiyani yakunlashda xatolik yuz berdi");
    },
  });
};
