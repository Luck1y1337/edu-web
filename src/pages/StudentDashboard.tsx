import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ContinueBanner from "../components/dashboard/ContinueBanner";
import DashboardStats from "../components/dashboard/DashboardStats";
import ActiveCourses from "../components/dashboard/ActiveCourses";
import WeeklyGoal from "../components/dashboard/WeeklyGoal";
import RecommendedCourses from "../components/dashboard/RecommendedCourses";
import Skeleton, { SkeletonCard } from "../components/ui/Skeleton";
import { useEnrollments } from "../hooks/api/useEnrollments";
import { useCertificates } from "../hooks/api/useCertificates";
import { publicApi } from "../services/api";
import { queryKeys } from "../config/queryKeys";
import useUserStore from "../store/user.store";

const StudentDashboard = () => {
  const user = useUserStore((state) => state.user);
  const enrollmentsQuery = useEnrollments();
  const certificatesQuery = useCertificates();
  const recommendedQuery = useQuery({
    queryKey: queryKeys.public.courses("recommended"),
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

  const avgProgress = enrollments.length
    ? Math.round(
        enrollments.reduce((sum, e) => sum + (e.progressPercent ?? 0), 0) / enrollments.length
      )
    : 0;

  const stats = [
    {
      iconBg: "#EFF6FF",
      iconColor: "#2563EB",
      svgPath: (
        <>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </>
      ),
      value: String(activeEnrollments.length),
      label: "Faol online kurslar",
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
      value: `${avgProgress}%`,
      label: "O'rtacha progress",
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
      value: String(completedEnrollments.length),
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
      value: String(certificates.length),
      label: "Sertifikatlar",
    },
  ];

  if (enrollmentsQuery.isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-manrope text-2xl font-bold text-gray-900">
            Salom, {user?.firstName || "Talaba"}! <span aria-hidden="true">&#x1F44B;</span>
          </h2>
          <p className="text-sm text-gray-500">
            Online o'qishingizni davom ettiring. Bugun yangi narsa o'rganish uchun ajoyib kun!
          </p>
        </div>
        <div>
          <Link
            to="/dashboard/catalog"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Yangi kurs tanlash
          </Link>
        </div>
      </header>

      {/* Continue learning banner */}
      {inProgress && <ContinueBanner enrollment={inProgress} />}

      {/* Stats */}
      <DashboardStats items={stats} />

      {/* Active courses + Weekly goal (2fr / 1fr) */}
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <ActiveCourses items={activeEnrollments.slice(0, 4)} />
        <WeeklyGoal
          avgProgress={avgProgress}
          completed={completedEnrollments.length}
          total={enrollments.length}
          activeCount={activeEnrollments.length}
        />
      </div>

      {/* Recommended courses */}
      <RecommendedCourses items={recommendedFiltered} />
    </div>
  );
};

export default StudentDashboard;
