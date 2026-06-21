import { Link } from "react-router-dom";
import type { Course } from "../../data/courses.data";

interface Props {
  courses: Course[];
}

const CourseRelated = ({ courses }: Props) => {
  if (!courses.length) return null;

  return (
    <section className="border-t border-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            O'xshash kurslar
          </h2>
          <p className="mt-1 text-sm text-gray-500">Bu kursni o'rganganlar quyidagilarni ham ko'rdi.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <Link to={`/courses/${course.slug}`} className="block overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${course.badgeBg} ${course.badgeText}`}>
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                    <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.rating}
                  </span>
                </div>
                <h3 className="font-manrope text-sm font-semibold leading-snug text-gray-900">
                  <Link to={`/courses/${course.slug}`} className="hover:text-blue-600 transition-colors">
                    {course.title}
                  </Link>
                </h3>
                <p className="flex-1 text-xs text-gray-500 line-clamp-2">{course.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
                <span className="font-manrope text-sm font-bold text-gray-900">{course.price}</span>
                <Link
                  to={`/courses/${course.slug}`}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Batafsil
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseRelated;
