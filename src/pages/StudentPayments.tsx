import { Link } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import StatTileGrid from "../components/ui/StatTile";
import type { StatTileItem } from "../components/ui/StatTile";
import { useEnrollments } from "../hooks/api/useEnrollments";

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
  } catch {
    return "";
  }
};

/* ── SVG icons ── */
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

/* ── Status badge helper ── */
const statusConfig: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  completed: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", label: "To'langan" },
  active: { dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", label: "Faol" },
  pending: { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", label: "Kutilmoqda" },
  cancelled: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700", label: "Bekor qilingan" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = statusConfig[status] ?? { dot: "bg-gray-500", bg: "bg-gray-50", text: "text-gray-700", label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

/* ═══════════════════════════════════════════════════
   Main page component
   ═══════════════════════════════════════════════════ */
const StudentPayments = () => {
  const enrollmentsQuery = useEnrollments();

  if (enrollmentsQuery.isLoading) return <GlobalSpinner />;
  const enrollments = enrollmentsQuery.data ?? [];

  const totalCourses = enrollments.length;
  // These are display-only stats derived from available enrollment data
  const completedCount = enrollments.filter((e) => e.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Mening to'lovlarim
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sotib olingan kurslar va to'lov tarixi. Har bir kurs — bir martalik to'lov, umrbod kirish.
          </p>
        </div>
        <Link
          to="/dashboard/catalog"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <PlusIcon />
          Yangi kurs olish
        </Link>
      </div>

      {/* ── Stats tiles ── */}
      <StatTileGrid
        columns={3}
        items={
          [
            {
              iconBg: "#ECFDF5",
              iconColor: "#059669",
              svgPath: (
                <>
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </>
              ),
              value: String(totalCourses),
              label: "Jami to'lovlar",
            },
            {
              iconBg: "#EFF6FF",
              iconColor: "#2563EB",
              svgPath: (
                <>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </>
              ),
              value: String(totalCourses),
              label: "Sotib olingan kurslar",
            },
            {
              iconBg: "#F5F3FF",
              iconColor: "#8B5CF6",
              svgPath: (
                <>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                </>
              ),
              value: String(completedCount),
              label: "Tugatilgan kurslar",
            },
          ] satisfies StatTileItem[]
        }
      />

      {/* ── Two-column: Table + Payment method ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">

        {/* Payment history table */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <header className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-base font-semibold text-gray-900">To'lov tarixi</h3>
          </header>

          {enrollments.length === 0 ? (
            <p className="p-10 text-center text-sm text-gray-500">
              Hali to'lovlar yo'q. Katalogdan kursni tanlab boshlang.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Sana</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Kurs</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Usul</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Holat</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Progress</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Chek</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollments.map((e) => (
                    <tr key={e.id} className="transition-colors hover:bg-gray-50">
                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">{formatDate(e.enrolledAt)}</td>
                      <td className="px-5 py-4 font-semibold text-gray-900">{e.course.name}</td>
                      <td className="px-5 py-4 text-gray-600">Online</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={e.status} />
                      </td>
                      <td className="px-5 py-4 text-gray-600">{e.progressPercent}%</td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                          <DownloadIcon />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        {/* Right column: payment method + CTA */}
        <div className="flex flex-col gap-5">
          {/* Payment method card */}
          <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <header className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-base font-semibold text-gray-900">To'lov usuli</h3>
            </header>
            <div className="p-5">
              {/* Saved card */}
              <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-200 p-4">
                <span className="flex h-7.5 w-11 items-center justify-center rounded-md bg-blue-600 text-[11px] font-bold text-white">
                  VISA
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">---- ---- ---- 4242</div>
                  <div className="text-xs text-gray-500">Amal qiladi: 08/27</div>
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Kartani o'zgartirish
              </button>

              {/* Supported methods */}
              <div className="mt-3.5 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Payme</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Click</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Uzcard</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Visa / Mastercard</span>
              </div>
            </div>
          </article>

          {/* CTA: add more courses */}
          <article className="rounded-xl border border-blue-200 bg-blue-50 shadow-sm">
            <div className="p-5">
              <div className="mb-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CreditCardIcon />
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900">Yana kurs qo'shing</h3>
              <p className="mt-1.5 text-sm text-gray-600">
                Katalogdan yangi kurs tanlang — to'lovdan so'ng darrov kirish ochiladi.
              </p>
              <Link
                to="/dashboard/catalog"
                className="mt-3.5 flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Kurslar katalogi
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default StudentPayments;
