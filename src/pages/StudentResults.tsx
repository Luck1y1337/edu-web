interface ResultRow {
  id: number;
  test: string;
  course: string;
  date: string;
  score: number;
  status: "passed" | "retry";
}

const stats = [
  { value: "87%",  label: "O'rtacha natija",  iconBg: "#ECFDF5", iconColor: "#059669", type: "chart" },
  { value: "11",   label: "Yechilgan testlar", iconBg: "#EFF6FF", iconColor: "#2563EB", type: "cert"  },
  { value: "10",   label: "O'tilgan",          iconBg: "#ECFDF5", iconColor: "#059669", type: "check" },
  { value: "95",   label: "Eng yuqori ball",   iconBg: "#F5F3FF", iconColor: "#7C3AED", type: "bolt"  },
];

const results: ResultRow[] = [
  { id: 1, test: "Modul 4 testi: Hooklar",        course: "React.js — zamonaviy frontend", date: "12-noyabr, 2025",  score: 88, status: "passed" },
  { id: 2, test: "Amaliyot: Komponentlar",         course: "React.js — zamonaviy frontend", date: "28-oktabr, 2025",  score: 95, status: "passed" },
  { id: 3, test: "Funksiyalar va siklar testi",    course: "Python asoslari",               date: "15-oktabr, 2025",  score: 64, status: "retry"  },
  { id: 4, test: "Yakuniy loyiha: Figma maket",    course: "UX/UI dizayn asoslari",         date: "03-oktabr, 2025",  score: 92, status: "passed" },
  { id: 5, test: "Boshlang'ich test: JS asoslari", course: "Python asoslari",               date: "21-sentabr, 2025", score: 78, status: "passed" },
];

/* ── Icons ── */
const Icon = ({ type, color }: { type: string; color: string }) => {
  const cls = `h-5 w-5`;
  if (type === "chart")
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
  if (type === "cert")
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
  if (type === "check")
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
};

/* ── Score colour ── */
const scoreColor = (s: number) =>
  s >= 80 ? "text-emerald-700" : s >= 65 ? "text-amber-600" : "text-red-600";

/* ── Status badge ── */
const Badge = ({ status }: { status: "passed" | "retry" }) =>
  status === "passed" ? (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
      O'tdi
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-700">
      Qayta topshirish mumkin
    </span>
  );

/* ── Page ── */
const StudentResults = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">Natijalarim</h2>
      <p className="mt-1 text-sm text-gray-500">
        Kurs testlari va amaliy topshiriqlar bo'yicha natijalaringiz.
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {stats.map((s) => (
        <article key={s.label} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: s.iconBg }}>
            <Icon type={s.type} color={s.iconColor} />
          </span>
          <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
          <p className="text-sm text-gray-500">{s.label}</p>
        </article>
      ))}
    </div>

    {/* Results table */}
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Card header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h3 className="font-manrope text-lg font-bold text-gray-900">Test va topshiriq natijalari</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-3 text-left">Test / Topshiriq</th>
              <th className="px-5 py-3 text-left">Kurs</th>
              <th className="px-5 py-3 text-left">Sana</th>
              <th className="px-5 py-3 text-left">Natija</th>
              <th className="px-5 py-3 text-left">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-semibold text-gray-900">{row.test}</td>
                <td className="px-5 py-4 text-gray-600">{row.course}</td>
                <td className="px-5 py-4 text-gray-600">{row.date}</td>
                <td className={`px-5 py-4 font-semibold ${scoreColor(row.score)}`}>{row.score}%</td>
                <td className="px-5 py-4"><Badge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default StudentResults;
