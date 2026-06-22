import axios from "../../config/axios";
import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";

export const useCourseBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.public.course(slug));
      return data;
    },
    enabled: !!slug,
  });
};
