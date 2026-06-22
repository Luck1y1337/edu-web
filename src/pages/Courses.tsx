import { useQuery } from "@tanstack/react-query";
import CoursesHero from "../components/courses/CoursesHero";
import CoursesGrid from "../components/courses/CoursesGrid";
import { allCourses } from "../data/courses.data";
import { publicApi } from "../services/api";
import { mapApiCourseToCourse } from "../services/mappers";

const Courses = () => {
  const coursesQuery = useQuery({
    queryKey: ["public", "courses"],
    queryFn: () => publicApi.getCourses({ limit: 100 }),
  });
  const visibleCourses = coursesQuery.data?.items.length
    ? coursesQuery.data.items.map(mapApiCourseToCourse)
    : allCourses;

  return (
    <>
      <CoursesHero />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CoursesGrid items={visibleCourses} />
      </div>
    </>
  );
};

export default Courses;
