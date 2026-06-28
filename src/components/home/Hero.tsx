import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { heroFeatures } from "../../data/home.data";
import { FadeIn } from "../ui/Motion";

const Hero = () => {
  return (
    <div className="mx-auto grid max-w-360 items-center gap-12 px-4 pb-12 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <FadeIn direction="right">
        <span className="inline-flex items-center gap-x-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-xs font-medium text-blue-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
          Yangi guruhlar — 1 iyuldan
        </span>
        <h1 className="mt-6 font-manrope text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Kelajak kasbingizni{" "}
          <span className="text-blue-600">bugun boshlang.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
          Toshkentdagi yetakchi IT va dizayn ta'lim markazi. Tajribali
          o'qituvchilar, zamonaviy dasturlar va kafolatlangan natija. 5000+
          bitiruvchimiz IT sohada ishlamoqda.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Ro'yxatdan o'tish
            <Icon.arrowRight />
          </Link>
          <Link
            to="/courses"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Kurslarni ko'rish ↓
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {heroFeatures.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-x-2 text-sm text-gray-600"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                <Icon.check />
              </span>
              {feature}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn direction="left" delay={0.2}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=70"
          alt="Talabalar darsda"
          className="h-80 w-full rounded-2xl object-cover shadow-xl lg:h-96"
        />
      </FadeIn>
    </div>
  );
};

export default Hero;
