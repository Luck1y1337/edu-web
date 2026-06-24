import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";
import useUserStore from "../../store/user.store";
import { clearTokens } from "../../utils/localstorage";

export const useLogout = (onClose?: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout: storeLogout } = useUserStore();

  const finalize = () => {
    clearTokens();
    storeLogout();
    queryClient.clear();
    if (onClose) onClose();
    navigate("/login");
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => authApi.logout(),
    onSuccess: () => {
      finalize();
      toast.success("Tizimdan muvaffaqiyatli chiqdingiz");
    },
    onError: () => {
      // Even if API fails (e.g. token expired), still clean up local state
      finalize();
    },
  });

  return { mutateAsync, isPending };
};
