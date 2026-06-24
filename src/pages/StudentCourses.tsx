import { Link } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollments } from "../hooks/api/useEnrollments";
import { useCertificates } from "../hooks/api/useCertificates";
import type { StudentEnrollmentListItemDto } from "../types/api.type";

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

const StatTile = ({ label, value, iconColor, iconBg, path }: {
  label: string;
  value: number;
  iconColor: string;
  iconBg: string;
  path: string;
}) => (
  <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
    <span
      className="flex h-11 w-11 items-center justify-center rounded-lg"
      style={{ background: iconBg }}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={iconColor} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </span>
    <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </article>
);

const ActiveCourseCard = ({ e }: { e: StudentEnrollmentListItemDto }) => (
  <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div className="relative h-36 bg-gray-100">
      <img src={e.course.imageUrl || fallbackImage} alt={e.course.name} className="h-full w-full object-cover" />
      {e.course.category && (
        <span className="absolute left-2 top-2 rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-700">
          {e.course.category}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col gap-2 p-4">
      <h4 className="font-manrope font-bold text-gray-900 leading-tight">{e.course.name}</h4>
      <div className="mt-1">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-400">{e.course.lessonsCount || 0} dars</span>
          <span className="font-bold text-blue-700">{e.progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${e.progressPercent}%` }} />
        </div>
      </div>
      <Link
        to={`/dashboard/courses/${e.course.id}`}
        className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700"
      >
        Davom ettirish
      </Link>
    </div>
  </article>
);

const CompletedCourseCard = ({ e }: { e: StudentEnrollmentListItemDto }) => (
  <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div className="relative h-36 bg-gray-100">
      <img src={e.course.imageUrl || fallbackImage} alt={e.course.name} className="h-full w-full object-cover" />
      <span className="absolute left-2 top-2 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
        Tugallangan
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-2 p-4">
      <h4 className="font-manrope font-bold text-gray-900 leading-tight">{e.course.name}</h4>
      <Link
        to="/dashboard/certificates"
        className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
      >
        Sertifikatni yuklash
      </Link>
    </div>
  </article>
);

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
  const activeCourses = enrollments.filter((e) => e.status !== "completed" && e.status !== "cancelled");
  const completedCourses = enrollments.filter((e) => e.status === "completed");
  const inProgressCount = enrollments.filter((e) => e.progressPercent > 0 && e.progressPercent < 100).length;
  const certificatesCount = certificatesQuery.data?.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Mening online kurslarim
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Yozilgan barcha online kurslaringiz, progress va sertifikatlaringiz.
          </p>
        </div>
        <Link
          to="/dashboard/catalog"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Yangi kurs olish
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatTile label="Faol kurslar" value={activeCourses.length} iconColor="#2563EB" iconBg="#EFF6FF" path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
        <StatTile label="Davom etayotgan" value={inProgressCount} iconColor="#F59E0B" iconBg="#FEF3C7" path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatTile label="Tugatilgan" value={completedCourses.length} iconColor="#059669" iconBg="#ECFDF5" path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatTile label="Sertifikatlar" value={certificatesCount} iconColor="#8B5CF6" iconBg="#F5F3FF" path="M9 12l2 2 4-4" />
      </div>

      <section>
        <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">
          Davom etayotgan kurslar ({activeCourses.length})
        </h3>
        {activeCourses.length === 0 ? (
          <p className="text-sm text-gray-500">
            Hozircha faol kurslar yo'q.{" "}
            <Link to="/dashboard/catalog" className="font-medium text-blue-600 hover:underline">
              Katalogdan tanlash →
            </Link>
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activeCourses.map((e) => <ActiveCourseCard key={e.id} e={e} />)}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">
          Tugallangan kurslar ({completedCourses.length})
        </h3>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {completedCourses.map((e) => <CompletedCourseCard key={e.id} e={e} />)}

          <Link
            to="/dashboard/catalog"
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center transition-colors hover:border-blue-300 hover:bg-blue-50"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-200 text-blue-500 text-2xl">+</span>
            <div>
              <p className="font-manrope font-bold text-gray-900">Yangi online kurs olish</p>
              <p className="mt-1 text-xs text-gray-500">
                Katalogdan kurs tanlang va darrov o'qishni boshlang.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StudentCourses;
