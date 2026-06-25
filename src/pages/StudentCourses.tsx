import { Link } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import StatTileGrid from "../components/ui/StatTile";
import type { StatTileItem } from "../components/ui/StatTile";
import { useEnrollments } from "../hooks/api/useEnrollments";
import { useCertificates } from "../hooks/api/useCertificates";
import type { StudentEnrollmentListItemDto } from "../types/api.type";

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

/* ───────── Active course card ───────── */
const ActiveCourseCard = ({ e }: { e: StudentEnrollmentListItemDto }) => {
  const completedLessons = e.course.lessonsCount
    ? Math.round((e.progressPercent / 100) * e.course.lessonsCount)
    : 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
      {/* Image */}
      <div className="relative h-36 bg-gray-100">
        {e.course.category && (
          <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
            {e.course.category}
          </span>
        )}
        <img
          src={e.course.imageUrl || fallbackImage}
          alt={e.course.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h4 className="font-manrope font-bold leading-tight text-gray-900">
          {e.course.name}
        </h4>

        {/* Progress */}
        <div className="mt-1 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{completedLessons} / {e.course.lessonsCount || 0} dars</span>
            <span className="font-bold text-blue-700">{e.progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${e.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto pt-3">
          <Link
            to={`/dashboard/courses/${e.course.id}`}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Davom ettirish
          </Link>
        </div>
      </div>
    </article>
  );
};

/* ───────── Completed course card ───────── */
const CompletedCourseCard = ({ e }: { e: StudentEnrollmentListItemDto }) => (
  <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white opacity-95 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
    {/* Image */}
    <div className="relative h-36 bg-gray-100">
      <span className="absolute left-2 top-2 rounded-full bg-gray-500 px-3 py-0.5 text-xs font-semibold text-white">
        Tugallangan
      </span>
      <img
        src={e.course.imageUrl || fallbackImage}
        alt={e.course.name}
        className="h-full w-full object-cover opacity-85"
      />
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col gap-2 p-4">
      <h4 className="font-manrope font-bold leading-tight text-gray-900">
        {e.course.name}
      </h4>
      <p className="text-sm text-gray-500">
        Yakuniy natija: <strong className="text-emerald-700">100% (A'lo)</strong>
      </p>

      {/* Button */}
      <div className="mt-auto pt-3">
        <Link
          to="/dashboard/certificates"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          Sertifikatni yuklash
        </Link>
      </div>
    </div>
  </article>
);

/* ───────── Page ───────── */
const StudentCourses = () => {
  const enrollmentsQuery = useEnrollments();
  const certificatesQuery = useCertificates();

  if (enrollmentsQuery.isLoading) return <GlobalSpinner />;
  if (enrollmentsQuery.isError) {
    return (
      <p className="py-20 text-center text-sm text-red-600">
        Kurslarni yuklab bo'lmadi.
      </p>
    );
  }

  const enrollments = enrollmentsQuery.data ?? [];
  const activeCourses = enrollments.filter(
    (e) => e.status !== "completed" && e.status !== "cancelled"
  );
  const completedCourses = enrollments.filter((e) => e.status === "completed");
  const inProgressCount = enrollments.filter(
    (e) => e.progressPercent > 0 && e.progressPercent < 100
  ).length;
  const certificatesCount = certificatesQuery.data?.length ?? 0;

  return (
    <div className="space-y-7">
      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Mening online kurslarim
          </h2>
          <p className="text-sm text-gray-500">
            Yozilgan barcha online kurslaringiz, progress va sertifikatlaringiz.
          </p>
        </div>
        <div>
          <Link
            to="/dashboard/catalog"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Yangi kurs olish
          </Link>
        </div>
      </header>

      {/* Stats */}
      <StatTileGrid
        columns={4}
        items={
          [
            {
              iconBg: "#EFF6FF",
              iconColor: "#2563EB",
              svgPath: (
                <>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </>
              ),
              value: String(inProgressCount || activeCourses.length),
              label: "Davom etayotgan",
            },
            {
              iconBg: "#ECFDF5",
              iconColor: "#059669",
              svgPath: (
                <>
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </>
              ),
              value: String(completedCourses.length),
              label: "Tugallangan",
            },
            {
              iconBg: "#F5F3FF",
              iconColor: "#8B5CF6",
              svgPath: (
                <>
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </>
              ),
              value: String(certificatesCount),
              label: "Sertifikatlar",
            },
            {
              iconBg: "#FEF3C7",
              iconColor: "#F59E0B",
              svgPath: (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </>
              ),
              value: String(enrollments.length),
              label: "O'rganilgan soat",
            },
          ] satisfies StatTileItem[]
        }
      />

      {/* In-progress courses */}
      <section>
        <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
          Davom etayotgan kurslar ({activeCourses.length})
        </h3>
        {activeCourses.length === 0 ? (
          <p className="text-sm text-gray-500">
            Hozircha faol kurslar yo'q.{" "}
            <Link
              to="/dashboard/catalog"
              className="font-medium text-blue-600 hover:underline"
            >
              Katalogdan tanlash
            </Link>
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activeCourses.map((e) => (
              <ActiveCourseCard key={e.id} e={e} />
            ))}
          </div>
        )}
      </section>

      {/* Completed courses */}
      <section>
        <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
          Tugallangan kurslar ({completedCourses.length})
        </h3>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {completedCourses.map((e) => (
            <CompletedCourseCard key={e.id} e={e} />
          ))}

          {/* Add course CTA card */}
          <Link
            to="/dashboard/catalog"
            className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <span className="font-manrope font-bold text-gray-900">
              Yangi online kurs olish
            </span>
            <span className="text-sm">
              Katalogdan kurs tanlang va darrov o'qishni boshlang.
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StudentCourses;
