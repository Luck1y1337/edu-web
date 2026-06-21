import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { footerCourses, footerPages, socials } from "../../data/home.data";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-x-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Icon.graduationCap />
            </span>
            <span className="text-base font-semibold text-white">
              O'quv Markaz
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Toshkent shahridagi yetakchi IT va dizayn ta'lim markazi.
            2015-yildan beri faoliyat yuritamiz va 5000+ talabani bitirishga
            muvaffaq bo'lganmiz.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Sahifalar
          </h4>
          <ul className="mt-4 space-y-2.5">
            {footerPages.map((page) => (
              <li key={page.label}>
                <Link to={page.path} className="text-sm hover:text-white">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Kurslar
          </h4>
          <ul className="mt-4 space-y-2.5">
            {footerCourses.map((course) => (
              <li key={course.label}>
                <Link to={course.path} className="text-sm hover:text-white">
                  {course.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Aloqa
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-x-2.5">
              <span className="text-slate-400">📍</span> Amir Temur ko'chasi
              108, Toshkent
            </li>
            <li className="flex items-center gap-x-2.5">
              <span className="text-slate-400">
                <Icon.phone />
              </span>
              +998 71 123 45 67
            </li>
            <li className="flex items-center gap-x-2.5">
              <span className="text-slate-400">
                <Icon.mail />
              </span>
              info@oquv.uz
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">
            © 2026 O'quv Markaz. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-x-3">
            {socials.map((name) => (
              <a
                key={name}
                href="#"
                title={name}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
              >
                {name[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
