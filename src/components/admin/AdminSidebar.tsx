import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import useUserStore from "../../store/user.store";

interface NavItem {
  label: string;
  path: string;
  icon: keyof typeof Icon;
  end?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const adminNav: NavGroup[] = [
  {
    title: "Asosiy",
    items: [
      { label: "Dashboard", path: "/admin", icon: "home", end: true },
      { label: "Kurslar", path: "/admin/courses", icon: "book" },
      { label: "O'qituvchilar", path: "/admin/instructors", icon: "user" },
      { label: "Talabalar", path: "/admin/students", icon: "user" },
    ],
  },
  {
    title: "Moliya",
    items: [
      { label: "To'lovlar", path: "/admin/payments", icon: "creditCard" },
    ],
  },
  {
    title: "Kontent",
    items: [
      { label: "Sertifikatlar", path: "/admin/certificates", icon: "award" },
      { label: "Sharhlar", path: "/admin/reviews", icon: "star" },
      { label: "Blog", path: "/admin/blog", icon: "book" },
      { label: "Xabarlar", path: "/admin/contact", icon: "mail" },
    ],
  },
  {
    title: "Tizim",
    items: [
      { label: "Sozlamalar", path: "/admin/settings", icon: "settings" },
    ],
  },
];

const AdminSidebar = () => {
  const { user, setLogoutModalOpen } = useUserStore();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";

  return (
    <aside className="hidden w-65 shrink-0 flex-col border-r border-gray-100 bg-white dark:bg-slate-900 dark:border-slate-700 lg:flex">
      {/* Logo */}
      <header className="flex h-18 items-center gap-3 border-b border-gray-100 dark:border-slate-700 px-6">
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="9" fill="#2563EB" />
          <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
          <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-manrope text-base font-bold text-gray-900 dark:text-white">O'quv Markaz</span>
      </header>

      {/* Nav sections */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {adminNav.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = Icon[item.icon];
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-blue-600" />
                          )}
                          <IconComponent />
                          <span className="flex-1">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <footer className="flex items-center gap-3 border-t border-gray-100 dark:border-slate-700 px-4 py-4">
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {fullName.charAt(0).toUpperCase()}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{fullName}</p>
          <p className="truncate text-xs text-gray-400 dark:text-slate-500">{user?.role === "super_admin" ? "Super admin" : "Admin"}</p>
        </div>
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          aria-label="Chiqish"
        >
          <Icon.logout />
        </button>
      </footer>
    </aside>
  );
};

export default AdminSidebar;
