import { Link } from "react-router-dom";

const StudentProfile = () => {
  return (
    <div className="space-y-6">

      {/* ── Profile Hero ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-blue-200 p-8"
        style={{ background: "linear-gradient(96.42deg, #EFF6FF 0%, #F5F3FF 100%)" }}
      >
        <div className="flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/112?img=47"
            alt="Bobur Tojiev"
            className="h-28 w-28 rounded-full object-cover ring-4 ring-white"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="font-manrope text-2xl font-bold text-gray-900">Bobur Tojiev</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
                Aktiv
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Talaba ID: ST-0123 · 2025-yil sentyabrdan beri
            </p>
            <div className="flex flex-wrap gap-5 pt-2 text-sm text-gray-700">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                bobur@example.uz
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +998 90 123 45 67
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Toshkent, Chilonzor tumani
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Profilni tahrirlash
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {[
          { value: "87%", label: "O'rtacha natija",  bg: "#ECFDF5", color: "#059669", icon: "chart" },
          { value: "47",  label: "O'rganilgan soat", bg: "#EFF6FF", color: "#2563EB", icon: "clock" },
          { value: "3",   label: "Jami kurslar",     bg: "#EFF6FF", color: "#2563EB", icon: "book"  },
          { value: "2",   label: "Sertifikat",       bg: "#FFFBEB", color: "#D97706", icon: "cert"  },
        ].map((s) => (
          <article key={s.label} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: s.bg }}>
              {s.icon === "chart" && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              {s.icon === "clock" && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              {s.icon === "book"  && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
              {s.icon === "cert"  && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
            </span>
            <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </article>
        ))}
      </div>

      {/* ── 2-col grid ── */}
      <div className="grid gap-5 xl:grid-cols-2">

        {/* Left col */}
        <div className="space-y-5">

          {/* Shaxsiy ma'lumotlar */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Shaxsiy ma'lumotlar</h3>
            </div>
            <dl className="divide-y divide-gray-50 px-5">
              {[
                ["Ism",           "Bobur"],
                ["Familiya",      "Tojiev"],
                ["Tug'ilgan sana","14-mart, 2004"],
                ["Jins",          "Erkak"],
                ["Email",         "bobur@example.uz"],
                ["Telefon",       "+998 90 123 45 67"],
                ["Manzil",        "Toshkent sh., Chilonzor tumani, 18-mavze"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-3 text-sm">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mening kurslarim */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Mening kurslarim</h3>
              <Link to="/dashboard/courses" className="text-sm font-semibold text-blue-600 hover:underline">
                Hammasi →
              </Link>
            </div>
            <div className="divide-y divide-gray-50 px-5">
              {[
                { title: "React.js — zamonaviy frontend", mentor: "Akmal Karimov", progress: 62,  status: "active" },
                { title: "Python asoslari",               mentor: "Dilnoza Yusupova", progress: 33,  status: "active" },
                { title: "JavaScript asoslari",           mentor: "Akmal Karimov", progress: 100, status: "done"   },
              ].map((c) => (
                <div key={c.title} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{c.title}</p>
                    <p className="text-xs text-gray-400">Mentor: {c.mentor} · {c.progress}%</p>
                  </div>
                  {c.status === "active" ? (
                    <span className="shrink-0 rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Davom etmoqda
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Tugallangan
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-5">

          {/* Kasbiy ma'lumotlar */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Kasbiy ma'lumotlar</h3>
            </div>
            <dl className="divide-y divide-gray-50 px-5">
              {[
                ["Yo'nalish",    "Frontend dasturlash"],
                ["Joriy daraja", "O'rta"],
                ["Maqsad",       "Frontend dasturchi bo'lib ishga joylashish"],
                ["Github",       "github.com/boburdev"],
                ["LinkedIn",     "linkedin.com/in/bobur"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-3 text-sm">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
            {/* Info note */}
            <div className="mx-5 mb-5 mt-1 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Olingan sertifikatlaringiz LinkedIn profilingizga qo'shig — shl beruvchilari e'tiborga tushasin.
            </div>
          </div>

          {/* Hisob holati */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Hisob holati</h3>
            </div>
            <dl className="divide-y divide-gray-50 px-5">
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-gray-400">Holat</dt>
                <dd><span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">Aktiv</span></dd>
              </div>
              {[
                ["Ro'yxatdan o'tgan",    "2-sentyabr, 2025"],
                ["Sotib olingan kurslar", "3 ta"],
                ["Sertifikatlar",         "2 ta"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-3 text-sm">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-2 px-5 pb-5 pt-2">
              <Link to="/dashboard/payments" className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50">
                To'lovlar tarixi
              </Link>
              <Link to="/dashboard/settings" className="flex-1 rounded-lg border border-gray-200 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50">
                Sozlamalar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
