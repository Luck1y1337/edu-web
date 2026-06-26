import { useEffect } from "react";
import { getItem } from "../utils/localstorage";
import { useMe } from "./api/useMe";
import useUserStore from "../store/user.store";
import type { CurrentUserDto } from "../types/api.type";

export const useAuthHydration = () => {
  const token = getItem();
  const { user, setUser } = useUserStore();

  const { data, isLoading, isSuccess } = useMe(!!token && !user);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data as CurrentUserDto);
    }
  }, [isSuccess, data, setUser]);

  return { token, user, isLoading: isLoading && !user };
};
