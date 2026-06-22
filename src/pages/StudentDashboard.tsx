import { Link } from "react-router-dom";
import ContinueBanner from "../components/dashboard/ContinueBanner";
import DashboardStats from "../components/dashboard/DashboardStats";
import ActiveCourses from "../components/dashboard/ActiveCourses";
import WeeklyGoal from "../components/dashboard/WeeklyGoal";
import RecommendedCourses from "../components/dashboard/RecommendedCourses";
import { Icon } from "../components/ui/Icon";
import useUserStore from "../store/user.store";

const StudentDashboard = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salom, {user?.name || "Talaba"}! 👋</h1>
          <p className="mt-1 text-sm text-gray-500">
            Online o'qishingizni davom ettiring. Bugun yangi narsa o'rganish
            uchun ajoyib kun!
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

      <ContinueBanner />
      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActiveCourses />
        </div>
        <WeeklyGoal />
      </div>

      <RecommendedCourses />
    </div>
  );
};

export default StudentDashboard;
