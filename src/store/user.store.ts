import { create } from "zustand";
import type { IUserStore } from "../types/user.store.type";
const useUserStore = create<IUserStore>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user: { name: string; email: string }) => {
      set((state) => ({ ...state, user, isAuthenticated: true }));
    },
    logout: () => {
      set((state) => ({ ...state, user: null, isAuthenticated: false }));
    },
  };
});
export default useUserStore;
