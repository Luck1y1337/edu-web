import { Link } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import useUserStore from "../store/user.store";
import { useEnrollments } from "../hooks/api/useEnrollments";
import { useCertificates } from "../hooks/api/useCertificates";

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const StudentProfile = () => {
  const user = useUserStore((s) => s.user);
  const enrollmentsQuery = useEnrollments();
  const certificatesQuery = useCertificates();

  if (!user || enrollmentsQuery.isLoading) return <GlobalSpinner />;

  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");
  const enrollments = enrollmentsQuery.data ?? [];
  const certificates = certificatesQuery.data ?? [];
  const activeCount = enrollments.filter((e) => e.status !== "completed" && e.status !== "cancelled").length;
  const completedCount = enrollments.filter((e) => e.status === "completed").length;

  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progressPercent, 0) / enrollments.length)
    : 0;

  const avatar = user.avatarUrl || `https://i.pravatar.cc/112?u=${user.id}`;
  const statusLabel = user.status === "active" ? "Aktiv" : user.status === "banned" ? "Bloklangan" : "Nofaol";

  return (
    <div className="space-y-6">
      <div
        className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-blue-200 p-8"
        style={{ background: "linear-gradient(96.42deg, #EFF6FF 0%, #F5F3FF 100%)" }}
      >
        <div className="flex items-center gap-6">
          <img
            src={avatar}
            alt={fullName}
            className="h-28 w-28 rounded-full object-cover ring-4 ring-white"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="font-manrope text-2xl font-bold text-gray-900">{fullName}</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
                {statusLabel}
              </span>
            </div>
            <p className="text-sm text-gray-500">Talaba ID: {user.id.slice(0, 8)}</p>
            <div className="flex flex-wrap gap-5 pt-2 text-sm text-gray-700">
              <span className="flex items-center gap-1.5">✉ {user.email}</span>
              {user.phone && <span className="flex items-center gap-1.5">📞 {user.phone}</span>}
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Profilni tahrirlash
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-3xl font-extrabold text-gray-900">{avgProgress}%</p>
          <p className="text-sm text-gray-500">O'rtacha progress</p>
        </article>
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-3xl font-extrabold text-gray-900">{activeCount}</p>
          <p className="text-sm text-gray-500">Faol kurslar</p>
        </article>
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-3xl font-extrabold text-gray-900">{completedCount}</p>
          <p className="text-sm text-gray-500">Tugatilgan</p>
        </article>
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-3xl font-extrabold text-gray-900">{certificates.length}</p>
          <p className="text-sm text-gray-500">Sertifikatlar</p>
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">Shaxsiy ma'lumotlar</h3>
          </div>
          <dl className="divide-y divide-gray-50 px-5">
            {[
              ["Ism", user.firstName],
              ["Familiya", user.lastName],
              ["Otasining ismi", user.middleName || "—"],
              ["Email", user.email],
              ["Telefon", user.phone || "—"],
              ["Email tasdiqlangan", user.emailVerifiedAt ? formatDate(user.emailVerifiedAt) : "Yo'q"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3 text-sm">
                <dt className="text-gray-400">{label}</dt>
                <dd className="font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">Mening kurslarim</h3>
            <Link to="/dashboard/courses" className="text-sm font-semibold text-blue-600 hover:underline">
              Hammasi →
            </Link>
          </div>
          {enrollments.length === 0 ? (
            <p className="p-5 text-sm text-gray-500">
              Hozircha yozilgan kurslar yo'q.
            </p>
          ) : (
            <div className="divide-y divide-gray-50 px-5">
              {enrollments.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{e.course.name}</p>
                    <p className="text-xs text-gray-400">{e.progressPercent}%</p>
                  </div>
                  {e.status === "completed" ? (
                    <span className="shrink-0 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Tugallangan
                    </span>
                  ) : (
                    <Link
                      to={`/dashboard/courses/${e.course.id}`}
                      className="shrink-0 rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Davom etmoqda
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
