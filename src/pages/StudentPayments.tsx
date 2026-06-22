import { Link } from "react-router-dom";

interface PaymentRecord {
  id: string;
  date: string;
  course: string;
  amount: string;
  method: string;
  status: "paid";
}

const payments: PaymentRecord[] = [
  {
    id: "1",
    date: "14-noyabr, 2025",
    course: "React.js — zamonaviy frontend",
    amount: "790 000",
    method: "Payme",
    status: "paid",
  },
  {
    id: "2",
    date: "02-oktabr, 2025",
    course: "Python asoslari",
    amount: "590 000",
    method: "Uzcard",
    status: "paid",
  },
  {
    id: "3",
    date: "18-avgust, 2025",
    course: "UX/UI dizayn asoslari",
    amount: "490 000",
    method: "Click",
    status: "paid",
  },
];

const StudentPayments = () => {
  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Mening to'lovlarim
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sotib olingan kurslar va to'lov tarixi. Har bir kurs — bir martalik to'lov, umrbod kirish.
          </p>
        </div>
        <Link
          to="/dashboard/catalog"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Yangi kurs olish
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="grid gap-5 sm:grid-cols-3">
        {/* Stat 1 */}
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
            <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p className="text-3xl font-extrabold text-gray-900">1 870 000</p>
          <p className="text-sm text-gray-500">Jami sarflangan (so'm)</p>
        </article>

        {/* Stat 2 */}
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          <p className="text-3xl font-extrabold text-gray-900">3</p>
          <p className="text-sm text-gray-500">Sotib olingan kurslar</p>
        </article>

        {/* Stat 3 */}
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <p className="text-3xl font-extrabold text-gray-900">1 080 000</p>
          <p className="text-sm text-gray-500">Bu yil sarflangan (so'm)</p>
        </article>
      </div>

      {/* ── Main Content (2 cols) ── */}
      <div className="grid gap-5 xl:grid-cols-3">
        {/* Left Col: History Table (Spans 2 cols on xl) */}
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">To'lov tarixi</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Sana</th>
                    <th className="px-5 py-3 font-semibold">Kurs</th>
                    <th className="px-5 py-3 font-semibold">Summa</th>
                    <th className="px-5 py-3 font-semibold">Usul</th>
                    <th className="px-5 py-3 font-semibold">Holat</th>
                    <th className="px-5 py-3 text-right font-semibold">Chek</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-5 py-4">{p.date}</td>
                      <td className="px-5 py-4 font-semibold text-gray-900">{p.course}</td>
                      <td className="whitespace-nowrap px-5 py-4">{p.amount}</td>
                      <td className="whitespace-nowrap px-5 py-4">{p.method}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          To'langan
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Payment Method */}
        <div className="space-y-5">
          {/* Card info */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">To'lov usuli</h3>
            </div>
            <div className="p-5">
              {/* Saved card */}
              <div className="mb-4 flex items-center gap-4 rounded-xl border border-gray-200 p-4">
                <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="font-bold tracking-widest text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500">Amal qiladi: 08/27</p>
                </div>
              </div>

              <button className="mb-6 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Kartani o'zgartirish
              </button>

              {/* Providers */}
              <div className="flex flex-wrap justify-between gap-2 text-xs font-semibold text-gray-400">
                <span>Payme</span>
                <span>Click</span>
                <span>Uzcard</span>
                <span>Visa / Mastercard</span>
              </div>
            </div>
          </div>

          {/* Prompt card */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h4 className="font-manrope text-base font-bold text-blue-900">Yana kurs qo'shing</h4>
            <p className="mt-1 text-sm text-blue-800/80">
              Katalogdan yangi kurs tanlang — to'lovdan so'ng darrov kirish ochiladi.
            </p>
            <Link
              to="/dashboard/catalog"
              className="mt-4 block rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
            >
              Kurslar katalogi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPayments;
