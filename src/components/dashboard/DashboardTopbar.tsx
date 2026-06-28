import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { dashboardNav } from "../../data/dashboard.data";
import useUserStore from "../../store/user.store";

const DashboardTopbar = () => {
  const { user, setLogoutModalOpen } = useUserStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Talaba";
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "T";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    navigate(term ? `/dashboard/catalog?search=${encodeURIComponent(term)}` : "/dashboard/catalog");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center gap-x-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-x-2.5 text-gray-600 lg:gap-x-3"
          aria-label="Dashboard"
        >
          <Icon.menu />
          <span className="text-base font-semibold text-gray-900">
            Online ta'lim
          </span>
        </NavLink>

        <form
          onSubmit={handleSearch}
          className="mx-auto hidden w-full max-w-md items-center gap-x-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-400 focus-within:border-blue-400 focus-within:bg-white md:flex"
        >
          <button type="submit" aria-label="Qidirish" className="shrink-0 transition-colors hover:text-blue-600">
            <Icon.search />
          </button>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Kurs qidirish..."
            className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-x-3 border-l border-gray-100 pl-4">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={fullName}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              {initials}
            </span>
          )}
          <div className="hidden text-right sm:block min-w-0 max-w-[150px] lg:max-w-[200px]">
            <p className="text-sm font-semibold text-gray-900 truncate">{fullName}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || "Online talaba"}</p>
          </div>
          <Link
            to="/faq"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 lg:hidden"
            aria-label="Yordam (FAQ)"
          >
            <Icon.helpCircle />
          </Link>
          <Link
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 lg:hidden"
            aria-label="Bosh sahifa"
          >
            <Icon.home />
          </Link>
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 lg:hidden"
            aria-label="Chiqish"
          >
            <Icon.logout />
          </button>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
        {dashboardNav.flatMap((group) => group.items).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default DashboardTopbar;
