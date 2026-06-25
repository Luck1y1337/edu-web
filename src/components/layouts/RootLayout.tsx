import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import LogoutModal from "../LogoutModal";
import useUserStore from "../../store/user.store";

const RootLayout = () => {
  const { isLogoutModalOpen, setLogoutModalOpen } = useUserStore();

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
};

export default RootLayout;
