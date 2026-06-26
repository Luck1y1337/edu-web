import { useQuery } from "@tanstack/react-query";
import CoursesHero from "../components/courses/CoursesHero";
import CoursesGrid from "../components/courses/CoursesGrid";
import { publicApi } from "../services/api";
import { mapApiCourseToCourse } from "../services/mappers";
import { SkeletonCard } from "../components/ui/Skeleton";

const Courses = () => {
  const coursesQuery = useQuery({
    queryKey: ["public", "courses", "all"],
    queryFn: () => publicApi.getCourses({ limit: 100 }),
  });

  const visibleCourses = (coursesQuery.data?.items ?? []).map(mapApiCourseToCourse);

  return (
    <>
      <CoursesHero />
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {coursesQuery.isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : coursesQuery.isError ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-sm text-red-600">Kurslarni yuklab bo'lmadi.</p>
              <button
                onClick={() => coursesQuery.refetch()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Qayta urinish
              </button>
            </div>
          ) : visibleCourses.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-500">
              Hozircha kurslar e'lon qilinmagan.
            </p>
          ) : (
            <CoursesGrid items={visibleCourses} />
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
