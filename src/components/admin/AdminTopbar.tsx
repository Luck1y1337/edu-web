import { Icon } from "../ui/Icon";
import useUserStore from "../../store/user.store";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  const { user, setLogoutModalOpen } = useUserStore();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";

  return (
    <header className="flex h-18 shrink-0 items-center border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-10">
      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Menyuni ochish"
        className="mr-1 flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
      >
        <Icon.menu />
      </button>

      {/* Mobile logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="9" fill="#2563EB" />
          <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
          <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-manrope text-base font-bold text-gray-900">O'quv Markaz</span>
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
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-3">
        <span className="mx-1 hidden h-6 w-px bg-gray-200 sm:block" />
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {fullName.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="hidden min-w-0 max-w-50 sm:block">
          <p className="truncate text-sm font-semibold text-gray-900">{fullName}</p>
          <p className="truncate text-xs text-gray-400">
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
