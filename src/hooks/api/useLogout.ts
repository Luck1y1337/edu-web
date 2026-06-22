import axios from "../../config/axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import { toast } from "react-toastify";
import useUserStore from "../../store/user.store";
import { useNavigate } from "react-router-dom";

export const useLogout = (onClose?: () => void) => {
  const navigate = useNavigate();
  const { logout: storeLogout } = useUserStore();

  const onLogout = async () => {
    return axios.post(Endpoints.auth.logout);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: onLogout,
    onSuccess: () => {
      localStorage.removeItem("token");
      storeLogout();
      if (onClose) onClose();
      navigate("/login");
      toast.success("Tizimdan muvaffaqiyatli chiqdingiz");
    },
    onError: () => {
      // Even if API fails (e.g. token expired), we still want to clean up local state
      localStorage.removeItem("token");
      storeLogout();
      if (onClose) onClose();
      navigate("/login");
    },
  });

  return { mutateAsync, isPending };
};
