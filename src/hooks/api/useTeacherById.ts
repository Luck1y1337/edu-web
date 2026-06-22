import axios from "../../config/axios";
import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";

export const useTeacherById = (id: string) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.public.teacher(id));
      return data;
    },
    enabled: !!id,
  });
};
