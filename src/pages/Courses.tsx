import { useQuery } from "@tanstack/react-query";
import CoursesHero from "../components/courses/CoursesHero";
import CoursesGrid from "../components/courses/CoursesGrid";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { publicApi } from "../services/api";
import { mapApiCourseToCourse } from "../services/mappers";

const Courses = () => {
  const coursesQuery = useQuery({
    queryKey: ["public", "courses", "all"],
    queryFn: () => publicApi.getCourses({ limit: 100 }),
  });

  const visibleCourses = (coursesQuery.data?.items ?? []).map(mapApiCourseToCourse);

  return (
    <>
      <CoursesHero />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {coursesQuery.isLoading ? (
          <GlobalSpinner />
        ) : coursesQuery.isError ? (
          <p className="py-20 text-center text-sm text-red-600">
            Kurslarni yuklab bo'lmadi. Iltimos, keyinroq urinib ko'ring.
          </p>
        ) : visibleCourses.length === 0 ? (
          <p className="py-20 text-center text-sm text-gray-500">
            Hozircha kurslar e'lon qilinmagan.
          </p>
        ) : (
          <CoursesGrid items={visibleCourses} />
        )}
      </div>
    </>
  );
};

export default Courses;
