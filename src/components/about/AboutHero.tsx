import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
              Biz haqimizda
            </span>
            <h1 className="font-manrope text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Bizning hikoyamiz
            </h1>
            <p className="text-lg leading-relaxed text-gray-500">
              2015-yilda kichik bir auditoriyada boshlanib, bugun O'zbekistondagi
              eng yirik online IT va dizayn ta'lim platformalaridan biriga
              aylandik. 10 yil ichida 5000+ talabani bitirib, ularning hayotini
              o'zgartirishga ulush qo'shdik.
            </p>
            <p className="text-lg leading-relaxed text-gray-500">
              Bizning maqsad — har bir o'zbek yoshining zamonaviy mehnat
              bozorida muvaffaqiyatli o'rin egallashiga yordam berish.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Ro'yxatdan o'tish
              </Link>
              <Link
                to="/courses"
                className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Kurslarni ko'rish ↓
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/images/about/hero.jpg"
              alt="Online o'quv platformasi jamoasi"
              className="h-80 w-full rounded-3xl object-cover shadow-xl lg:h-[504px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
