import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { footerCourses, footerPages } from "../../data/home.data";

const socialLinks = [
  { name: "Telegram", url: "https://t.me/oquvmarkaz", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
  { name: "Instagram", url: "https://instagram.com/oquvmarkaz", icon: "M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm4.5 6a4 4 0 100 8 4 4 0 000-8zm5-1.5a1 1 0 100-2 1 1 0 000 2z" },
  { name: "Facebook", url: "https://facebook.com/oquvmarkaz", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { name: "YouTube", url: "https://youtube.com/@oquvmarkaz", icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <svg className="h-9 w-9 shrink-0" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#2563EB" />
              <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
              <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-manrope text-base font-bold text-white">O'quv Markaz</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Toshkent shahridagi yetakchi IT va dizayn ta'lim markazi.
            2015-yildan beri faoliyat yuritamiz va 5000+ talabani bitirishga
            muvaffaq bo'lganmiz.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Sahifalar
          </h4>
          <ul className="mt-4 space-y-2.5">
            {footerPages.map((page) => (
              <li key={page.label}>
                <Link to={page.path} className="text-sm text-gray-400 transition-colors hover:text-white">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Kurslar
          </h4>
          <ul className="mt-4 space-y-2.5">
            {footerCourses.map((course) => (
              <li key={course.label}>
                <Link to={course.path} className="text-sm text-gray-400 transition-colors hover:text-white">
                  {course.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Aloqa
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-gray-500"><Icon.location /></span>
              <span>Amir Temur ko'chasi 108, Toshkent</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-gray-500"><Icon.phone /></span>
              <span>+998 71 123 45 67</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-gray-500"><Icon.mail /></span>
              <span>info@oquv.uz</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-gray-500"><Icon.clock /></span>
              <span>Dush–Shan, 09:00–18:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            © 2026 O'quv Markaz. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
