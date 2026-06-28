import { Outlet, useLocation } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import LogoutModal from "../LogoutModal";
import ErrorBoundary from "../ui/ErrorBoundary";
import { PageTransition } from "../ui/Motion";
import useUserStore from "../../store/user.store";

const RootLayout = () => {
  const { isLogoutModalOpen, setLogoutModalOpen } = useUserStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </ErrorBoundary>
      </main>
      <Footer />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
};

export default RootLayout;
