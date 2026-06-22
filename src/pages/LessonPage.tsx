import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";

const LessonPage = () => {
  const [activeTab, setActiveTab] = useState("tavsif");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── TOPBAR ── */}
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-5 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/courses"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kurslarim
          </Link>
          <div className="h-5 w-[1px] bg-gray-200"></div>
          <h1 className="font-manrope text-lg font-bold tracking-tight text-gray-900">
            React.js — zamonaviy frontend
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-700">62%</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[62%] rounded-full bg-blue-600"></div>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Chiqish
          </button>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 items-start gap-6 pt-24 pb-12 px-6">
        
        {/* LEFT COLUMN: Player & Content */}
        <div className="flex flex-1 flex-col gap-5">
          {/* Video Player */}
          <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-900 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="React video poster"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <button className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl transition hover:scale-105 hover:bg-blue-50">
              <svg className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute bottom-3 right-3 rounded bg-gray-900/80 px-2 py-0.5 text-xs font-semibold text-white">
              18:24
            </div>
          </div>

          {/* Lesson Header */}
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Modul 4 · 12-dars
            </span>
            <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
              useState va useEffect hooklari
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                18 daqiqa
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                14 / 32 dars
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Akmal Karimov"
                  className="h-6 w-6 rounded-full bg-blue-100 object-cover"
                />
                Akmal Karimov
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Oldingi dars
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition shadow-sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Tugatdim
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm">
                Keyingi dars
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-2 w-full">
            <div className="flex gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("tavsif")}
                className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === "tavsif"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Tavsif
              </button>
              <button
                onClick={() => setActiveTab("materiallar")}
                className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === "materiallar"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Materiallar
              </button>
              <button
                onClick={() => setActiveTab("izohlar")}
                className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === "izohlar"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Izohlar (8)
              </button>
            </div>

            <div className="py-6">
              {activeTab === "tavsif" && (
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    Bu darsda React'ning eng muhim ikki hookasi — <strong>useState</strong> va{" "}
                    <strong>useEffect</strong> bilan ishlashni o'rganamiz. Komponent holatini (state) qanday
                    saqlash, yangilash va yon ta'sirlarni (side effects) boshqarishni amaliy misollarda ko'rib
                    chiqamiz.
                  </p>
                  <p>
                    Dars oxiriga borib siz holatga ega interaktiv komponent yaratishni va ma'lumotlarni API'dan
                    yuklab, ekranda ko'rsatishni bilib olasiz.
                  </p>
                  <p className="font-semibold text-gray-900 pt-2">Ushbu darsda:</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>useState bilan holatni boshqarish</li>
                    <li>useEffect va bog'liqliklar massivi (dependency array)</li>
                    <li>Komponent hayot sikli (lifecycle)</li>
                    <li>Keng tarqalgan xatolar va ulardan qochish</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Curriculum Sidebar */}
        <aside className="w-[380px] shrink-0 sticky top-24 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-gray-100 bg-white">
            <h3 className="font-manrope text-lg font-bold text-gray-900">Kurs dasturi</h3>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-500">14 / 32 dars tugallandi</span>
              <span className="font-bold text-blue-700">62%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[62%] rounded-full bg-blue-600"></div>
            </div>
          </div>

          {/* Modules List (Scrollable) */}
          <div className="flex-1 overflow-y-auto bg-white">
            
            {/* Modul 3 (Completed) */}
            <div className="border-b border-gray-100">
              <button className="flex w-full items-center justify-between px-5 py-4 hover:bg-gray-50 transition">
                <div className="flex flex-col items-start gap-1 text-left">
                  <span className="font-semibold text-gray-900 text-sm">Modul 3 · Komponentlar</span>
                  <span className="text-xs text-gray-500">8 dars · tugallandi</span>
                </div>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Modul 4 (Current, Expanded) */}
            <div className="border-b border-gray-100">
              <button className="flex w-full items-center justify-between px-5 py-4 bg-gray-50">
                <div className="flex flex-col items-start gap-1 text-left">
                  <span className="font-semibold text-gray-900 text-sm">Modul 4 · Hooklar</span>
                  <span className="text-xs text-gray-500">6 dars · 2 tugallandi</span>
                </div>
                <svg className="h-5 w-5 text-gray-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Lessons list */}
              <ul className="flex flex-col text-sm bg-white">
                <li className="flex items-center gap-3 border-t border-gray-50 px-5 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <svg className="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="flex-1 font-medium text-gray-900">Hooklarga kirish</span>
                  <span className="text-xs font-medium text-gray-400">10:05</span>
                </li>
                <li className="flex items-center gap-3 border-t border-gray-50 px-5 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <svg className="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="flex-1 font-medium text-gray-900">useRef asoslari</span>
                  <span className="text-xs font-medium text-gray-400">09:30</span>
                </li>
                {/* Active Lesson */}
                <li className="flex items-center gap-3 border-t border-gray-50 px-5 py-3 bg-blue-50 cursor-pointer">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 shrink-0">
                    <svg className="h-3 w-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="flex-1 font-semibold text-blue-700">useState va useEffect hooklari</span>
                  <span className="text-xs font-medium text-gray-400">18:24</span>
                </li>
                <li className="flex items-center gap-3 border-t border-gray-50 px-5 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="flex-1 text-gray-500">useContext va Context API</span>
                  <span className="text-xs font-medium text-gray-400">16:00</span>
                </li>
                <li className="flex items-center gap-3 border-t border-gray-50 px-5 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="flex-1 text-gray-500">Custom hook yaratish</span>
                  <span className="text-xs font-medium text-gray-400">14:20</span>
                </li>
                <li className="flex items-center gap-3 border-t border-gray-50 px-5 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="flex-1 text-gray-500">Amaliyot: To-do ilovasi</span>
                  <span className="text-xs font-medium text-gray-400">22:15</span>
                </li>
              </ul>
            </div>

            {/* Modul 5 (Locked) */}
            <div className="border-b border-gray-100">
              <button className="flex w-full items-center justify-between px-5 py-4 hover:bg-gray-50 transition cursor-not-allowed">
                <div className="flex flex-col items-start gap-1 text-left opacity-60">
                  <span className="font-semibold text-gray-900 text-sm">Modul 5 · Router va Redux</span>
                  <span className="text-xs text-gray-500">7 dars · qulflangan</span>
                </div>
                <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
          </div>
        </aside>

      </main>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </div>
  );
};

export default LessonPage;
