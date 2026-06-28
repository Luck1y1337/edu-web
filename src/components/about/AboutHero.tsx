import { FadeIn } from "../ui/Motion";

const AboutHero = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <FadeIn direction="right" className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
              Biz haqimizda
            </span>
            <h1 className="font-manrope text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
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
          </FadeIn>

          {/* Image */}
          <FadeIn direction="left" delay={0.15}>
            <img
              src="/images/about/hero.jpg"
              alt="Online o'quv platformasi jamoasi"
              className="h-72 w-full rounded-2xl object-cover shadow-lg sm:h-96 lg:h-120"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop";
              }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
