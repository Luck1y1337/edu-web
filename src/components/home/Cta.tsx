import { Link } from "react-router-dom";
import { FadeIn } from "../ui/Motion";

const Cta = () => {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-violet-700 p-7 text-white sm:gap-10 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <h2 className="font-manrope text-3xl font-bold leading-tight sm:text-4xl">
              Hoziroq o'z kelajagingizni boshlang
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100">
              Ro'yxatdan o'ting va bepul birinchi darsga taklif oling,
              o'qituvchilarimiz va kursimiz dasturi bilan tanishing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
              >
                Bepul ro'yxatdan o'tish
              </Link>
              <button className="rounded-lg border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                Konsultatsiya olish
              </button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=70"
            alt="Talabalar jamoasi"
            className="h-64 w-full rounded-2xl object-cover"
          />
        </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Cta;
