import { useQuery } from "@tanstack/react-query";
import Advantages from "../components/home/Advantages";
import Courses from "../components/home/Courses";
import Cta from "../components/home/Cta";
import Faq from "../components/home/Faq";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Teachers from "../components/home/Teachers";
import Testimonials from "../components/home/Testimonials";
import { courses, stats } from "../data/home.data";
import { publicApi } from "../services/api";
import { mapApiCourseToHomeCourse, mapApiStats } from "../services/mappers";

const Home = () => {
  const statsQuery = useQuery({
    queryKey: ["public", "stats"],
    queryFn: publicApi.getStats,
  });
  const coursesQuery = useQuery({
    queryKey: ["public", "courses", "featured"],
    queryFn: () => publicApi.getCourses({ featured: true, limit: 8 }),
  });

  const visibleStats = statsQuery.data ? mapApiStats(statsQuery.data, stats) : stats;
  const visibleCourses = coursesQuery.data?.items.length
    ? coursesQuery.data.items.map(mapApiCourseToHomeCourse)
    : courses;

  return (
    <>
      <section className="bg-linear-to-b from-blue-50/60 to-white">
        <Hero />
        <Stats items={visibleStats} />
      </section>
      <Courses items={visibleCourses} />
      <Advantages />
      <Teachers />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
};

export default Home;
