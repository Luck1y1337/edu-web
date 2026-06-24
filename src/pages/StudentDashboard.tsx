import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ContinueBanner from "../components/dashboard/ContinueBanner";
import DashboardStats from "../components/dashboard/DashboardStats";
import ActiveCourses from "../components/dashboard/ActiveCourses";
import WeeklyGoal from "../components/dashboard/WeeklyGoal";
import RecommendedCourses from "../components/dashboard/RecommendedCourses";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { Icon } from "../components/ui/Icon";
import { useEnrollments } from "../hooks/api/useEnrollments";
import { useCertificates } from "../hooks/api/useCertificates";
import { publicApi } from "../services/api";
import useUserStore from "../store/user.store";

const StudentDashboard = () => {
  const user = useUserStore((state) => state.user);
  const enrollmentsQuery = useEnrollments();
  const certificatesQuery = useCertificates();
  const recommendedQuery = useQuery({
    queryKey: ["public", "courses", "recommended"],
    queryFn: () => publicApi.getCourses({ featured: true, limit: 4 }),
  });

  const enrollments = enrollmentsQuery.data ?? [];
  const certificates = certificatesQuery.data ?? [];
  const recommended = recommendedQuery.data?.items ?? [];

  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const completedEnrollments = enrollments.filter((e) => e.status === "completed");
  const inProgress = enrollments
    .filter((e) => e.progressPercent > 0 && e.progressPercent < 100)
    .sort((a, b) => b.progressPercent - a.progressPercent)[0];

  const enrolledIds = new Set(enrollments.map((e) => e.course.id));
  const recommendedFiltered = recommended.filter((c) => !enrolledIds.has(c.id));

  const stats = [
    { icon: "book" as const, color: "bg-blue-50 text-blue-600", label: "Faol kurslar", value: String(activeEnrollments.length) },
    { icon: "checkSquare" as const, color: "bg-emerald-50 text-emerald-600", label: "Tugatilgan", value: String(completedEnrollments.length) },
    { icon: "award" as const, color: "bg-amber-50 text-amber-600", label: "Sertifikatlar", value: String(certificates.length) },
    { icon: "barChart" as const, color: "bg-violet-50 text-violet-600", label: "Jami kurslar", value: String(enrollments.length) },
  ];

  if (enrollmentsQuery.isLoading) return <GlobalSpinner />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Salom, {user?.firstName || "Talaba"}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Online o'qishingizni davom ettiring. Bugun yangi narsa o'rganish uchun ajoyib kun!
          </p>
        </div>
        <Link
          to="/dashboard/catalog"
          className="inline-flex shrink-0 items-center gap-x-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Icon.search />
          Yangi kurs tanlash
        </Link>
      </div>

      {inProgress && <ContinueBanner enrollment={inProgress} />}
      <DashboardStats items={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActiveCourses items={activeEnrollments.slice(0, 4)} />
        </div>
        <WeeklyGoal />
      </div>

      <RecommendedCourses items={recommendedFiltered} />
    </div>
  );
};

export default StudentDashboard;
