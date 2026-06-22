import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { getCourseDetail, getRelatedCourses } from "../data/courseDetail.data";
import CourseBanner from "../components/courseDetail/CourseBanner";
import CourseTabs from "../components/courseDetail/CourseTabs";
import CourseSidebar from "../components/courseDetail/CourseSidebar";
import CourseRelated from "../components/courseDetail/CourseRelated";
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

  const course = courseQuery.data ? mapApiCourseToDetail(courseQuery.data) : getCourseDetail(slug);
  const related = getRelatedCourses(slug, course.category);

  return (
    <>
      {/* Banner */}
      <CourseBanner course={course} />

      {/* Tabs + Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <CourseTabs course={course} />
          </div>

          {/* Sidebar */}
          <CourseSidebar course={course} />
        </div>
      </div>

      {/* Related courses */}
      <CourseRelated courses={related} />
    </>
  );
};

export default CourseDetail;
