import { useQuery } from "@tanstack/react-query";
import Advantages from "../components/home/Advantages";
import Courses from "../components/home/Courses";
import Cta from "../components/home/Cta";
import Faq from "../components/home/Faq";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Teachers from "../components/home/Teachers";
import Testimonials from "../components/home/Testimonials";
import { stats as statsFallback } from "../data/home.data";
import { publicApi } from "../services/api";
import { queryKeys } from "../config/queryKeys";
import {
  mapApiCourseToHomeCourse,
  mapApiStats,
  mapApiTeacherToTeacher,
  mapApiTestimonial,
} from "../services/mappers";

const Home = () => {
  const statsQuery = useQuery({
    queryKey: queryKeys.public.stats,
    queryFn: publicApi.getStats,
  });
  const coursesQuery = useQuery({
    queryKey: queryKeys.public.courses("featured"),
    queryFn: () => publicApi.getCourses({ featured: true, limit: 8 }),
  });
  const instructorsQuery = useQuery({
    queryKey: queryKeys.public.instructors("home"),
    queryFn: () => publicApi.getInstructors({ limit: 6 }),
  });
  const testimonialsQuery = useQuery({
    queryKey: queryKeys.public.testimonials,
    queryFn: publicApi.getTestimonials,
  });

  const visibleStats = statsQuery.data ? mapApiStats(statsQuery.data, statsFallback) : statsFallback;
  const visibleCourses = (coursesQuery.data?.items ?? []).map(mapApiCourseToHomeCourse);
  const visibleTeachers = (instructorsQuery.data?.items ?? []).map(mapApiTeacherToTeacher);
  const visibleTestimonials = (testimonialsQuery.data ?? []).map(mapApiTestimonial);

  return (
    <>
      <section className="bg-linear-to-b from-blue-50/60 to-white">
        <Hero />
        <Stats items={visibleStats} />
      </section>
      <Courses items={visibleCourses} />
      <Advantages />
      <Teachers items={visibleTeachers} />
      <Testimonials items={visibleTestimonials} />
      <Faq />
      <Cta />
    </>
  );
};

export default Home;
