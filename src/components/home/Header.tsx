import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../ui/Icon";
import { navLinks } from "../../data/home.data";
import useUserStore from "../../store/user.store";

const Header = () => {
  const { isAuthenticated, user, setLogoutModalOpen } = useUserStore();
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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="9" fill="#2563EB" />
            <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
            <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-manrope text-base font-bold text-gray-900">O'quv Markaz</span>
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
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 rounded-lg border border-gray-200 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-gray-50"
              >
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {initials}
                  </span>
                )}
                <span className="hidden text-sm font-medium text-gray-700 sm:block">{fullName}</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">{fullName}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="py-1.5">
                    <Link
                      to={dashPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Icon.home />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Icon.user />
                      Profil
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <Icon.settings />
                      Sozlamalar
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setLogoutModalOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
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
                className="hidden rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:block"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 lg:hidden"
            aria-label="Menyu"
          >
            <Icon.menu />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="px-4 pb-4 pt-2">
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
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              {isAuthenticated ? (
                <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
                  <Link
                    to={dashPath}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setMobileOpen(false); setLogoutModalOpen(true); }}
                    className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Chiqish
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex gap-3 border-t border-gray-100 pt-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
