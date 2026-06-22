import axios from "../../config/axios";
import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.public.courses);
      return data;
    },
  });
};
