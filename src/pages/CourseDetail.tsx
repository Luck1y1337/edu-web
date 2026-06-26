import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate, Link } from "react-router-dom";
import CourseBanner from "../components/courseDetail/CourseBanner";
import CourseTabs from "../components/courseDetail/CourseTabs";
import CourseSidebar from "../components/courseDetail/CourseSidebar";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { publicApi } from "../services/api";
import { mapApiCourseToDetail, mapApiCourseToCourse } from "../services/mappers";
import { queryKeys } from "../config/queryKeys";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const courseSlug = slug || "";

  const courseQuery = useQuery({
    queryKey: queryKeys.public.course(courseSlug),
    queryFn: () => publicApi.getCourse(courseSlug),
    enabled: Boolean(courseSlug),
    retry: false,
  });

  /* Fetch all courses for "similar courses" section */
  const allCoursesQuery = useQuery({
    queryKey: queryKeys.public.courses("all"),
    queryFn: () => publicApi.getCourses({ limit: 100 }),
    enabled: Boolean(courseQuery.data),
  });

  if (!slug) return <Navigate to="/courses" replace />;

  if (courseQuery.isLoading) return <GlobalSpinner />;
  if (courseQuery.isError || !courseQuery.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="font-manrope text-2xl font-bold text-gray-900">
          Kurs topilmadi
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Bu kurs olib tashlangan yoki manzili noto'g'ri kiritilgan.
        </p>
      </div>
    );
  }

  const course = mapApiCourseToDetail(courseQuery.data);

  /* Similar courses: same category, excluding current */
  const similarCourses = (allCoursesQuery.data?.items ?? [])
    .map(mapApiCourseToCourse)
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 4);

  return (
    <>
      {/* Banner with sticky card */}
      <CourseBanner course={course} />

      {/* Tabs + sidebar */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <CourseTabs course={course} />
            </div>
            <CourseSidebar course={course} />
          </div>
        </div>
      </section>

      {/* Similar courses */}
      {similarCourses.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
                O'xshash kurslar
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Bu kursni o'rganganlar quyidagilarni ham yoqtirdi.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarCourses.map((c) => (
                <article
                  key={c.slug}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link
                    to={`/courses/${c.slug}`}
                    className="block overflow-hidden"
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.badgeBg} ${c.badgeText}`}
                      >
                        {c.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                        <svg
                          className="h-3.5 w-3.5 text-amber-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {c.rating}
                      </span>
                    </div>
                    <h3 className="font-manrope text-sm font-semibold leading-snug text-gray-900">
                      <Link
                        to={`/courses/${c.slug}`}
                        className="transition-colors hover:text-blue-600"
                      >
                        {c.title}
                      </Link>
                    </h3>
                    <p className="flex-1 text-xs text-gray-500 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                    <span className="text-sm font-bold text-gray-900">
                      {c.price}
                    </span>
                    <Link
                      to={`/courses/${c.slug}`}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Batafsil
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseDetail;
