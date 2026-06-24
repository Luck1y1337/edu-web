import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { authApi } from "../../services/api";
import { setItem, setRefreshToken } from "../../utils/localstorage";
import useUserStore from "../../store/user.store";
import type { RegisterDto } from "../../types/api.type";

export const useRegister = () => {
  const setUser = useUserStore((state) => state.setUser);

  const { mutateAsync, isSuccess, data, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload: RegisterDto) => authApi.register(payload),
    onSuccess: (result) => {
      if (result?.tokens?.accessToken) setItem(result.tokens.accessToken);
      if (result?.tokens?.refreshToken) setRefreshToken(result.tokens.refreshToken);
      if (result?.user) setUser(result.user);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    },
  });

  return { mutateAsync, isSuccess, data, isPending };
};
