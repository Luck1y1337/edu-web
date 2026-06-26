import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import LogoutModal from "../LogoutModal";
import ErrorBoundary from "../ui/ErrorBoundary";
import useUserStore from "../../store/user.store";

const RootLayout = () => {
  const { isLogoutModalOpen, setLogoutModalOpen } = useUserStore();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
};

export default RootLayout;
