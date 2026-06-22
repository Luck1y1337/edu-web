export interface IUserStore {
  user: {
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  isLogoutModalOpen: boolean;
  setLogoutModalOpen: (isOpen: boolean) => void;
  setUser: (user: { name: string; email: string }) => void;
  logout: () => void;
}
