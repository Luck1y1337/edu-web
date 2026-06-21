import CoursesHero from "../components/courses/CoursesHero";
import CoursesGrid from "../components/courses/CoursesGrid";

const Courses = () => {
  return (
    <>
      <CoursesHero />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CoursesGrid />
      </div>
    </>
  );
};

export default Courses;
