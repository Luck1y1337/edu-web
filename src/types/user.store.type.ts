import type { CurrentUserDto } from "./api.type";

export interface IUserStore {
  user: CurrentUserDto | null;
  isAuthenticated: boolean;
  isLogoutModalOpen: boolean;
  setLogoutModalOpen: (isOpen: boolean) => void;
  setUser: (user: CurrentUserDto) => void;
  logout: () => void;
}
