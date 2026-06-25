import { Icon } from "../ui/Icon";
import useUserStore from "../../store/user.store";
import useThemeStore from "../../store/theme.store";

const AdminTopbar = () => {
  const { user, setLogoutModalOpen } = useUserStore();
  const { isDark, toggle } = useThemeStore();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";

  return (
    <header className="flex h-18 shrink-0 items-center border-b border-gray-100 bg-white dark:bg-slate-900 dark:border-slate-700 px-4 sm:px-6 lg:px-10">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="9" fill="#2563EB" />
          <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
          <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-manrope text-base font-bold text-gray-900 dark:text-white">O'quv Markaz</span>
      </div>

      {/* Search */}
      <div className="ml-4 hidden flex-1 lg:block">
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="search"
            placeholder="Kurs, o'quvchi qidirish…"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800">
          {isDark ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        <span className="mx-1 hidden h-6 w-px bg-gray-200 dark:bg-slate-700 sm:block" />
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {fullName.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="hidden min-w-0 max-w-50 sm:block">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{fullName}</p>
          <p className="truncate text-xs text-gray-400 dark:text-slate-500">
            {user?.role === "super_admin" ? "Super admin" : "Admin"}
          </p>
        </div>
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 lg:hidden"
          aria-label="Chiqish"
        >
          <Icon.logout />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
