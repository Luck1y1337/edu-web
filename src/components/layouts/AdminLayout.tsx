import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";
import LogoutModal from "../LogoutModal";
import ErrorBoundary from "../ui/ErrorBoundary";
import { PageTransition } from "../ui/Motion";
import useUserStore from "../../store/user.store";

const AdminLayout = () => {
  const { isLogoutModalOpen, setLogoutModalOpen } = useUserStore();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ErrorBoundary>
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </ErrorBoundary>
          </div>
        </main>
      </div>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
};

export default AdminLayout;
