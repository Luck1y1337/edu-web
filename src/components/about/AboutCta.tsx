import { Link } from "react-router-dom";

const AboutCta = () => {
  return (
    <section className="pb-20 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-10 py-16 text-center text-white">
          <h2 className="font-manrope text-3xl font-bold sm:text-4xl">
            Bizning oilamizga qo'shiling
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-blue-100">
            O'zingizni rivojlantiring, yangi ko'nikmalar oling va kelajagingizni
            bugun boshlang. Birinchi qadam — ro'yxatdan o'tish.
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
