import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () =>
        set((state) => {
          const next = !state.isDark;
          document.documentElement.classList.toggle("dark", next);
          return { isDark: next };
        }),
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.isDark) {
          document.documentElement.classList.add("dark");
        }
      },
    }
  )
);

export default useThemeStore;
