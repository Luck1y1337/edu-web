import axios from "../../config/axios";
import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.public.stats);
      return data;
    },
  });
};
