import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import CourseBanner from "../components/courseDetail/CourseBanner";
import CourseTabs from "../components/courseDetail/CourseTabs";
import CourseSidebar from "../components/courseDetail/CourseSidebar";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { publicApi } from "../services/api";
import { mapApiCourseToDetail } from "../services/mappers";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const courseSlug = slug || "";

  const courseQuery = useQuery({
    queryKey: ["public", "course", courseSlug],
    queryFn: () => publicApi.getCourse(courseSlug),
    enabled: Boolean(courseSlug),
    retry: false,
  });

  if (!slug) return <Navigate to="/courses" replace />;

  if (courseQuery.isLoading) return <GlobalSpinner />;
  if (courseQuery.isError || !courseQuery.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Kurs topilmadi</h2>
        <p className="mt-2 text-sm text-gray-500">
          Bu kurs olib tashlangan yoki manzili noto'g'ri kiritilgan.
        </p>
      </div>
    );
  }

  const course = mapApiCourseToDetail(courseQuery.data);

  return (
    <>
      <CourseBanner course={course} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <CourseTabs course={course} />
          </div>
          <CourseSidebar course={course} />
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
