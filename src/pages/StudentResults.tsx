import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollments } from "../hooks/api/useEnrollments";

const StudentResults = () => {
  const enrollmentsQuery = useEnrollments();

  if (enrollmentsQuery.isLoading) return <GlobalSpinner />;
  const enrollments = enrollmentsQuery.data ?? [];

  const completed = enrollments.filter((e) => e.status === "completed");
  const inProgress = enrollments.filter((e) => e.progressPercent > 0 && e.progressPercent < 100);
  const avg = enrollments.length
    ? Math.round(enrollments.reduce((a, e) => a + e.progressPercent, 0) / enrollments.length)
    : 0;

  const stats = [
    { label: "O'rtacha progress", value: `${avg}%`, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Tugatilgan kurslar", value: String(completed.length), color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Davom etmoqda", value: String(inProgress.length), color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Jami yozilgan", value: String(enrollments.length), color: "text-violet-600", bg: "bg-violet-50" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Natijalarim</h2>
        <p className="mt-2 text-sm text-gray-500">
          Yozilgan kurslar bo'yicha umumiy progressingiz.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className={`${s.bg} flex h-11 w-11 items-center justify-center rounded-lg ${s.color} text-lg font-bold`}>
              %
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Kurslar bo'yicha progress</h3>
        </div>

        {enrollments.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">
            Hozircha yozilgan kurslar yo'q.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                <tr>
                  <th className="px-5 py-3">Kurs</th>
                  <th className="px-5 py-3">Progress</th>
                  <th className="px-5 py-3">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {enrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-semibold text-gray-900">{e.course.name}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full rounded-full bg-blue-600" style={{ width: `${e.progressPercent}%` }} />
                        </div>
                        <span className="font-semibold text-gray-700">{e.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          e.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : e.status === "cancelled"
                            ? "bg-gray-50 text-gray-500"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {e.status === "completed"
                          ? "Tugatildi"
                          : e.status === "cancelled"
                          ? "Bekor qilindi"
                          : "Davom etmoqda"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResults;
