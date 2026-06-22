import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardTopbar from "../dashboard/DashboardTopbar";
import LogoutModal from "../LogoutModal";
import useUserStore from "../../store/user.store";

const DashboardLayout = () => {
  const { isLogoutModalOpen, setLogoutModalOpen } = useUserStore();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
};

export default DashboardLayout;
