import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { authApi } from "../../services/api";
import { setItem, setRefreshToken } from "../../utils/localstorage";
import useUserStore from "../../store/user.store";
import type { LoginDto } from "../../types/api.type";

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);

  const { mutateAsync, isPending, data, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: LoginDto) => authApi.login(payload),
    onSuccess: (result) => {
      if (result?.tokens?.accessToken) setItem(result.tokens.accessToken);
      if (result?.tokens?.refreshToken) setRefreshToken(result.tokens.refreshToken);
      if (result?.user) setUser(result.user);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message;
      toast.error(message || "Email yoki parol noto'g'ri");
    },
  });

  return { mutateAsync, data, isPending, isSuccess };
};
