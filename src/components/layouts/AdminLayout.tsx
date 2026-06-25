import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";
import LogoutModal from "../LogoutModal";
import useUserStore from "../../store/user.store";

const AdminLayout = () => {
  const { isLogoutModalOpen, setLogoutModalOpen } = useUserStore();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-slate-100">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
};

export default AdminLayout;
