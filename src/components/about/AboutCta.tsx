import { Link } from "react-router-dom";

const AboutCta = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-14 text-center text-white sm:px-12 sm:py-16">
          <h2 className="font-manrope text-3xl font-bold sm:text-4xl">
            Bizning oilamizga qo'shiling
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-blue-100">
            5000+ bitiruvchi qo'shildi. Endi navbat sizniki.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-white px-7 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Ro'yxatdan o'tish
            </Link>
            <Link
              to="/courses"
              className="rounded-lg border border-white/40 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Kurslarni ko'rish
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
