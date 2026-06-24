import { Link } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollments } from "../hooks/api/useEnrollments";

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
  } catch {
    return "";
  }
};

const StudentPayments = () => {
  const enrollmentsQuery = useEnrollments();

  if (enrollmentsQuery.isLoading) return <GlobalSpinner />;
  const enrollments = enrollmentsQuery.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Mening to'lovlarim
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sotib olingan kurslar ro'yxati. Har bir kurs — bir martalik to'lov, umrbod kirish.
          </p>
        </div>
        <Link
          to="/dashboard/catalog"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Yangi kurs
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {enrollments.length === 0 ? (
          <p className="p-10 text-center text-sm text-gray-500">
            Hali to'lovlar yo'q. Katalogdan kursni tanlab boshlang.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                <tr>
                  <th className="px-5 py-3">Sana</th>
                  <th className="px-5 py-3">Kurs</th>
                  <th className="px-5 py-3">Holat</th>
                  <th className="px-5 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {enrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-gray-600">{formatDate(e.enrolledAt)}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">{e.course.name}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          e.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : e.status === "cancelled"
                            ? "bg-red-50 text-red-700"
                            : e.status === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{e.progressPercent}%</td>
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

export default StudentPayments;
