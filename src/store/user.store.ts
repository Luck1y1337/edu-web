import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUserStore } from "../types/user.store.type";

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: { name: string; email: string }) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);
export default useUserStore;
