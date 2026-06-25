import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { navLinks } from "../../data/home.data";
import useUserStore from "../../store/user.store";
import useThemeStore from "../../store/theme.store";

const Header = () => {
  const { isAuthenticated, user, setLogoutModalOpen } = useUserStore();
  const { isDark, toggle } = useThemeStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dashPath = user?.role === "admin" || user?.role === "super_admin" ? "/admin" : "/dashboard";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Foydalanuvchi";
  const initials = (user?.firstName?.[0] ?? "").toUpperCase();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 dark:border-slate-700">
      <div className="mx-auto flex h-18 max-w-360 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="9" fill="#2563EB" />
            <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
            <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-manrope text-base font-bold text-gray-900 dark:text-white">O'quv Markaz</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 sm:flex">
            <span className="text-base">🌐</span> O'zbek
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800">
            {isDark ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 rounded-lg border border-gray-200 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {initials}
                  </span>
                )}
                <span className="hidden text-sm font-medium text-gray-700 dark:text-slate-300 sm:block">{fullName}</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg dark:bg-slate-800 dark:border-slate-700">
                  <div className="border-b border-gray-100 dark:border-slate-700 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{fullName}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">{user?.email}</p>
                  </div>
                  <div className="py-1.5">
                    <Link
                      to={dashPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Icon.home />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Icon.user />
                      Profil
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <Icon.settings />
                      Sozlamalar
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 dark:border-slate-700 py-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setLogoutModalOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      <Icon.logout />
                      Chiqish
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white sm:block"
              >
                Kirish
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Ro'yxatdan o'tish
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 dark:border-slate-600 dark:text-slate-400 lg:hidden"
            aria-label="Menyu"
          >
            <Icon.menu />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 dark:bg-slate-900 dark:border-slate-700 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          {isAuthenticated ? (
            <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 dark:border-slate-700 pt-3">
              <Link
                to={dashPath}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => { setMobileOpen(false); setLogoutModalOpen(true); }}
                className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <div className="mt-3 flex gap-3 border-t border-gray-100 dark:border-slate-700 pt-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Kirish
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
