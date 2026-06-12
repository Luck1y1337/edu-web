import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { navLinks } from "../../data/home.data";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Icon.graduationCap />
          </span>
          <span className="text-base font-semibold">O'quv Markaz</span>
        </div>

        <nav className="hidden items-center gap-x-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                link.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-x-4">
          <button className="hidden items-center gap-x-1.5 text-sm font-medium text-gray-600 sm:flex">
            <span className="text-base">🌐</span> O'zbek
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Kirish
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
