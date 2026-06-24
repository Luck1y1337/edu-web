import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { dashboardNav } from "../../data/dashboard.data";
import useUserStore from "../../store/user.store";

const DashboardSidebar = () => {
  const { user, setLogoutModalOpen } = useUserStore();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-100 bg-white lg:flex">
      <div className="flex h-16 items-center gap-x-2.5 border-b border-gray-100 px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Icon.graduationCap />
        </span>
        <span className="text-base font-semibold">O'quv Markaz</span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {dashboardNav.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = Icon[item.icon];
                return item.path === "#" ? (
                  <a
                    key={item.label}
                    href="#"
                    className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  >
                    <IconComponent />
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <IconComponent />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-x-3 border-t border-gray-100 px-4 py-4">
        <img
          src="https://i.pravatar.cc/80?img=11"
          alt={[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Talaba"}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Talaba"}</p>
          <p className="text-xs text-gray-400 truncate">{user?.email || "Online talaba"}</p>
        </div>
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          aria-label="Chiqish"
        >
          <Icon.logout />
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
