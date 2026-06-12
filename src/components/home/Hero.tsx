import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { heroFeatures } from "../../data/home.data";

const Hero = () => {
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-12 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <span className="inline-flex items-center gap-x-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-xs font-medium text-blue-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Yangi guruhlar — 1 iyuldan
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
          Kelajak kasbingizni{" "}
          <span className="text-blue-600">bugun boshlang.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-500">
          Toshkentdagi yetakchi IT va dizayn ta'lim markazi. Tajribali
          o'qituvchilar, zamonaviy dasturlar va kafolatlangan natija. 5000+
          bitiruvchimiz IT sohada ishlamoqda.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Ro'yxatdan o'tish
          </Link>
          <a
            href="#kurslar"
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Kurslarni ko'rish ↓
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {heroFeatures.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-x-2 text-sm text-gray-600"
            >
              <span className="text-emerald-500">
                <Icon.check />
              </span>
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=70"
          alt="Talabalar darsda"
          className="h-80 w-full rounded-2xl object-cover shadow-xl lg:h-96"
        />
      </div>
    </div>
  );
};

export default Hero;
