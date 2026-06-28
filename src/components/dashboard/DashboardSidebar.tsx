import { Link, NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { dashboardNav } from "../../data/dashboard.data";
import useUserStore from "../../store/user.store";

const DashboardSidebar = () => {
  const { user, setLogoutModalOpen } = useUserStore();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Talaba";
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "T";

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-100 bg-white lg:flex">
      <Link
        to="/"
        className="flex h-16 items-center gap-x-2.5 border-b border-gray-100 px-6 transition-colors hover:bg-gray-50"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Icon.graduationCap />
        </span>
        <span className="text-base font-semibold">O'quv Markaz</span>
      </Link>

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

      <div className="border-t border-gray-100 px-3 py-4 space-y-3">
        <div className="flex items-center gap-x-3 rounded-lg px-2 py-2">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={fullName}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              {initials}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{fullName}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || "Online talaba"}</p>
          </div>
        </div>
        <Link
          to="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Icon.home />
          Bosh sahifa
        </Link>
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:border-red-200 hover:bg-red-50"
        >
          <Icon.logout />
          Chiqish
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
