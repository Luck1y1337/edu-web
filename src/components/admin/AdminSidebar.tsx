import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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

/* ── Shared sidebar content (used by desktop aside + mobile drawer) ── */
const SidebarBody = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { user, setLogoutModalOpen } = useUserStore();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";

  return (
    <>
      {/* Logo */}
      <Link
        to="/"
        onClick={onNavigate}
        className="flex h-18 items-center gap-3 border-b border-gray-100 px-6 transition-colors hover:bg-gray-50"
      >
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="9" fill="#2563EB" />
          <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
          <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-manrope text-base font-bold text-gray-900">O'quv Markaz</span>
      </Link>

      {/* Nav sections */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {adminNav.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
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
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
      <footer className="space-y-3 border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {fullName.charAt(0).toUpperCase()}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">{fullName}</p>
            <p className="truncate text-xs text-gray-400">{user?.role === "super_admin" ? "Super admin" : "Admin"}</p>
          </div>
        </div>
        <Link
          to="/"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Icon.home />
          Bosh sahifa
        </Link>
        <button
          onClick={() => {
            onNavigate?.();
            setLogoutModalOpen(true);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:border-red-200 hover:bg-red-50"
        >
          <Icon.logout />
          Chiqish
        </button>
      </footer>
    </>
  );
};

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ mobileOpen = false, onClose }: AdminSidebarProps) => {
  // Escape to close + lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen, onClose]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-65 shrink-0 flex-col border-r border-gray-100 bg-white lg:flex">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-gray-900/50 transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigatsiya"
          className={`absolute inset-y-0 left-0 flex w-72 max-w-[80%] flex-col bg-white shadow-xl transition-transform duration-200 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="absolute right-3 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <SidebarBody onNavigate={onClose} />
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
