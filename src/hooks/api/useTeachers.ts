import axios from "../../config/axios";
import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";

export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.public.teachers);
      return data;
    },
  });
};
