import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/ui/Motion";

/* ── Data ── */
const plans = [
  {
    name: "Boshlovchi",
    tagline: "Noldan boshlovchilar uchun kurslar",
    price: "390 000",
    featured: false,
    features: [
      "Barcha video darslarga to'liq kirish",
      "Online chat orqali qo'llab-quvvatlash",
      "Uyga vazifalar tekshiruvi",
      "Video darslar arxivi",
      "Kurs sertifikati",
    ],
  },
  {
    name: "Mashhur",
    tagline: "Eng ko'p tanlanadigan kasbiy kurslar",
    price: "590 000",
    featured: true,
    badge: "Eng mashhur",
    features: [
      "Barcha video darslar + bonus materiallar",
      "Haftalik jonli online sessiyalar",
      "Shaxsiy mentor (haftada 1 soat, online)",
      "Portfolio loyihalari ustida ishlash",
      "Ishga joylashishda yordam",
      "Kurs sertifikati",
    ],
  },
  {
    name: "Kasbiy",
    tagline: "Kasb egallash uchun to'liq dasturlar",
    price: "890 000",
    featured: false,
    features: [
      "Haftasiga 3 ta individual online dars",
      "Moslashuvchan dars jadvali",
      "Shaxsiy o'quv dasturi",
      "24/7 mentor bilan aloqa",
      "Ishga joylashishda yordam",
      "Kurs sertifikati",
    ],
  },
];

const discounts = [
  {
    percent: "−15%",
    title: "Oldindan to'lov",
    desc: "Kursning to'liq narxini bir martada to'lasangiz.",
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    percent: "−10%",
    title: "Aka-uka va opa-singillar",
    desc: "Bir oiladan ikki yoki undan ortiq talaba o'qisa.",
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    percent: "−10%",
    title: "Talabalar uchun",
    desc: "OTM talabasi ekanligingizni tasdiqlovchi hujjat bilan.",
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    percent: "−5%",
    title: "Do'stingni olib kel",
    desc: "Siz ham, do'stingiz ham birinchi oyga chegirma olasiz.",
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
];

const compareRows = [
  { feature: "Jonli online sessiyalar", starter: "—", popular: "Haftada 1", pro: "Haftada 3 (yozuvsiz)" },
  { feature: "Mentor-qayta aloqalash", starter: "Chatli", popular: "Bir soatli mentor", pro: "24/7 yakkaona yorliq" },
  { feature: "Bilim darslari arxivi", starter: true, popular: true, pro: true },
  { feature: "Shaxsiy loyiha", starter: true, popular: true, pro: true },
  { feature: "Portfolio loyihalari", starter: false, popular: true, pro: true },
  { feature: "Ishga joylashish yordami", starter: false, popular: false, pro: true },
  { feature: "Sertifikat", starter: true, popular: true, pro: true },
  { feature: "Narx (bir martalik)", starter: "390 000 so'mdan", popular: "590 000 so'mdan", pro: "890 000 so'mdan", isPrice: true },
];

/* ── Check icon ── */
const Check = () => (
  <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const Cross = () => (
  <svg className="h-4 w-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ── Page ── */
const Pricing = () => {
  return (
    <>
      {/* Hero */}
      <PageHero
        breadcrumb="Narxlar"
        title="Har bir kurs uchun adolatli narx"
        subtitle="Har kurs — bir martalik to'lov va umrbod kirish. Yashirin to'lovlar yo'q, demo darslar bepul. Quyida darajalar bo'yicha narxlar."
      />

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <StaggerItem
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.featured
                    ? "border-2 border-blue-600 bg-white shadow-xl lg:-translate-y-2"
                    : "border border-gray-200 bg-white"
                }`}
              >
                {/* Badge */}
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                    {plan.badge}
                  </span>
                )}

                {/* Header */}
                <div className="mb-5">
                  <h2 className="font-manrope text-xl font-bold text-gray-900">{plan.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-5 flex items-baseline gap-2 border-b border-gray-100 pb-5">
                  <span className="font-manrope text-3xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-400">so'mdan</span>
                </div>

                {/* Features */}
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/courses"
                  className={`flex items-center justify-center rounded-lg py-3 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Kurslarni ko'rish
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Note */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Har bir kurs alohida sotib olinadi —{" "}
            <strong className="text-gray-600">bir martalik to'lov, umrbod kirish.</strong>{" "}
            Narxlar darajaga qarab boshlang'ich qiymatdan; aniq narx kurs sahifasida ko'rsatilgan.
          </p>
        </div>
      </section>

      {/* Discounts */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Chegirmalar
            </span>
            <h2 className="font-manrope mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Kamroq to'lash yo'llari
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Chegirmalar bir-biri bilan qo'shilmaydi — eng kattasi qo'llanadi.
            </p>
          </div>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {discounts.map((d) => (
              <StaggerItem key={d.title} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  {d.icon}
                </span>
                <p className="font-manrope text-2xl font-extrabold text-emerald-600">{d.percent}</p>
                <h3 className="font-manrope text-lg font-bold text-gray-900">{d.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{d.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
              Darajalarni taqqoslash
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Har bir daraja haqida to'liq batafsil ko'ring.
            </p>
          </div>

          <FadeIn className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-4 pl-6 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Imkoniyat
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Boshlovchi
                  </th>
                  <th className="bg-blue-50 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-blue-700">
                    Mashhur
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Kasbiy
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} last:border-none`}
                  >
                    <td className="py-3.5 pl-6 pr-4 font-medium text-gray-700">{row.feature}</td>

                    {/* Starter */}
                    <td className="px-6 py-3.5 text-center text-gray-600">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? <Check /> : <Cross />
                      ) : (
                        <span className={row.isPrice ? "font-manrope font-bold text-gray-900" : ""}>{row.starter}</span>
                      )}
                    </td>

                    {/* Popular */}
                    <td className="bg-blue-50/60 px-6 py-3.5 text-center text-gray-600">
                      {typeof row.popular === "boolean" ? (
                        row.popular ? <Check /> : <Cross />
                      ) : (
                        <span className={row.isPrice ? "font-manrope font-bold text-blue-700" : "font-medium text-blue-700"}>{row.popular}</span>
                      )}
                    </td>

                    {/* Pro */}
                    <td className="px-6 py-3.5 text-center text-gray-600">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? <Check /> : <Cross />
                      ) : (
                        <span className={row.isPrice ? "font-manrope font-bold text-gray-900" : ""}>{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-blue-50 px-8 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-manrope text-xl font-bold text-gray-900">
                Qaysi kursni tanlashni bilmayapsizmi?
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Bepul demo darsni oling — Mentor siz bilan darslar bilan, o'zingizga mos kursni tanishib.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Bepul online darslari
              </Link>
              <Link
                to="/courses"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Kurs katalogiga o'tish
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Pricing;
