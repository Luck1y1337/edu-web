import { useQuery } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import { queryKeys } from "../../config/queryKeys";

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const { data } = await axios.get(Endpoints.auth.me);
      return data?.data || data;
    },
    enabled,
    retry: false, // Don't retry on 401, axios interceptor will handle it
  });
};
