import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/ui/Motion";

/* ── FAQ Data ── */
const faqData: Record<string, { q: string; a: string }[]> = {
  Umumiy: [
    {
      q: "O'qish uchun oldindan bilim kerakmi?",
      a: "Yo'q. Boshlovchi kurslarimiz nolinchi darajadan mo'ljallangan — kompyuterda ishlashning oddiy ko'nikmalari yetarli. O'rta va yuqori darajadagi kurslar uchun esa kirish testi o'tkazamiz va sizga mos kursni tavsiya qilamiz.",
    },
    {
      q: "Yosh chegarasi bormi?",
      a: "Yo'q, yosh chegarasi yo'q. 14 yoshdan 60 yoshgacha bo'lgan o'quvchilarimiz mavjud. Muhimi — o'rganishga ishtiyoq.",
    },
    {
      q: "Darslar qanday formatda o'tadi?",
      a: "Darslar asosan video formatda bo'lib, platformamizda onlayn o'qiladi. Mashhur va Kasbiy paketlarda haftalik jonli sessiyalar ham mavjud.",
    },
    {
      q: "O'z sur'atimda o'qiy olamanmi?",
      a: "Ha, albatta. Video darslar istalgan vaqtda ko'rish uchun mavjud. Siz o'zingizga qulay vaqtda, qulay sur'atda o'qishingiz mumkin.",
    },
    {
      q: "Bepul demo darslar bormi?",
      a: "Ha, har bir kursning birinchi 2–3 darsi bepul ochiq. Kursga yozilishdan oldin uning sifatini tekshirishingiz mumkin.",
    },
  ],
  "Kurslar va darslar": [
    {
      q: "Bir vaqtning o'zida bir nechta kursga yozilish mumkinmi?",
      a: "Ha, bir nechta kursga bir vaqtda yozilishingiz mumkin. Ammo sifatli o'rganish uchun bittadan boshlashni tavsiya qilamiz.",
    },
    {
      q: "Kurs materiallari qancha vaqt ochiq qoladi?",
      a: "Barcha kurs materiallari umrbod ochiq qoladi. Bir martalik to'lovdan so'ng materiallarga istalgan vaqtda kira olasiz.",
    },
    {
      q: "Darslar qanday tilda?",
      a: "Barcha darslar o'zbek tilida olib boriladi. Texnik atamalar kerak bo'lganda ingliz tilida ham tushuntiriladi.",
    },
    {
      q: "Kursni o'rtada to'xtatib, keyinroq davom ettirish mumkinmi?",
      a: "Ha, albatta. Platforma sizning qaysi darsda to'xtab qolganingizni eslab qoladi va keyingi safar shu joydan davom ettirishingiz mumkin.",
    },
  ],
  "To'lov": [
    {
      q: "Qanday to'lov usullari mavjud?",
      a: "Uzcard, Humo, Visa/Mastercard kartalar orqali to'lash mumkin. Shuningdek, Click va Payme orqali ham to'lov qilish imkoni bor.",
    },
    {
      q: "Muddatli to'lov (bo'lib to'lash) bormi?",
      a: "Ha, ayrim kurslar uchun 3 oylik muddatli to'lov imkoniyati mavjud. Batafsil ma'lumot uchun biz bilan bog'laning.",
    },
    {
      q: "Pul qaytarish imkoniyati bormi?",
      a: "Kursga yozilgandan so'ng 7 kun ichida, agar birorta darsni tugatmagan bo'lsangiz, to'liq pul qaytaramiz.",
    },
    {
      q: "Chegirmalar bir-biri bilan qo'shiladi?",
      a: "Yo'q, chegirmalar birlashmaydi — eng katta chegirma qo'llanadi. Masalan, 15% oldindan to'lov va 10% talaba chegirmasi bir vaqtda ishlamaydi.",
    },
  ],
  Sertifikat: [
    {
      q: "Sertifikat qachon beriladi?",
      a: "Kursning barcha darslarini tugatib, yakuniy testdan 70% va undan yuqori ball olganingizdan so'ng sertifikat avtomatik ravishda beriladi.",
    },
    {
      q: "Sertifikat qaysi formatda beriladi?",
      a: "Sertifikat PDF formatida yuklab olinadi va LinkedIn profilingizga qo'shish uchun maxsus havola bilan birga taqdim etiladi.",
    },
    {
      q: "Sertifikat xalqaro miqyosda tan olinadi?",
      a: "Sertifikatimiz O'zbekiston IT sohasi va ko'pgina mahalliy kompaniyalar tomonidan e'tirof etilgan. Xalqaro tan olinish uchun AWS, Google kabi qo'shimcha sertifikatlarni tavsiya qilamiz.",
    },
    {
      q: "Sertifikat yo'qolsa, qayta olish mumkinmi?",
      a: "Ha, sertifikatingiz shaxsiy kabinetingizda doim saqlangan bo'ladi. Istalgan vaqtda qayta yuklab olishingiz mumkin.",
    },
  ],
};

const TABS = Object.keys(faqData);

/* ── Accordion Item ── */
const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-base font-semibold text-gray-900">{q}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-5 pb-5 pt-4">
              <p className="text-base leading-relaxed text-gray-500">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Page ── */
const FaqPage = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [search, setSearch] = useState("");

  const items = faqData[activeTab].filter(
    (item) =>
      search.trim() === "" ||
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(99.79deg, #EFF6FF 0%, #F5F3FF 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">
              Bosh sahifa
            </Link>
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-gray-900">FAQ</span>
          </nav>

          <h1 className="font-manrope text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Ko'p so'raladigan savollar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
            Kurslar, to'lov va sertifikatlar haqidagi eng ko'p so'raladigan savollarga javoblar.
          </p>

          {/* Search */}
          <div className="mx-auto mt-6 flex max-w-lg items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Savolingizni qidiring…"
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Pill Tabs */}
          <div className="mb-8 flex items-center gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearch(""); }}
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <StaggerContainer key={activeTab + search} className="flex flex-col gap-2">
            {items.length > 0 ? (
              items.map((item) => (
                <StaggerItem key={item.q}>
                  <AccordionItem q={item.q} a={item.a} />
                </StaggerItem>
              ))
            ) : (
              <p className="py-8 text-center text-gray-400">
                Hech narsa topilmadi. Boshqa kalit so'z bilan qidiring.
              </p>
            )}
          </StaggerContainer>

          {/* CTA Card */}
          <FadeIn
            className="relative mt-16 overflow-hidden rounded-3xl border border-blue-100 p-10 text-center"
            style={{ background: "linear-gradient(108.3deg, #EFF6FF 0%, #F5F3FF 100%)" }}
          >
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
              <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            <h2 className="font-manrope text-2xl font-bold text-gray-900">
              Javob topa olmadingizmi?
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-lg leading-relaxed text-gray-500">
              Bizga yozing yoki qo'ng'iroq qiling — har qanday savolingizga javob beramiz.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Xabar yozish
              </Link>
              <a
                href="tel:+998711234567"
                className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                +998 71 123 45 67
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
