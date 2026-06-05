export interface IUserStore {
  user: {
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: { name: string; email: string }) => void;
  logout: () => void;
}
