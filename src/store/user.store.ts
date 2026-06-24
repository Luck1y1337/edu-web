import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrentUserDto } from "../types/api.type";
import type { IUserStore } from "../types/user.store.type";

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLogoutModalOpen: false,
      setLogoutModalOpen: (isOpen: boolean) => set({ isLogoutModalOpen: isOpen }),
      setUser: (user: CurrentUserDto) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, isLogoutModalOpen: false });
      },
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);
export default useUserStore;
