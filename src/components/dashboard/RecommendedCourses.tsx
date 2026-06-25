import { Link } from "react-router-dom";
import type { PublicCourseDto } from "../../types/api.type";

interface Props {
  items: PublicCourseDto[];
}

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

const RecommendedCourses = ({ items }: Props) => {
  if (!items.length) return null;

  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-gray-200 p-5">
        <h3 className="font-manrope text-base font-bold text-gray-900">
          Siz uchun tavsiya etiladi
        </h3>
        <Link
          to="/dashboard/catalog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Barcha kurslar
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Link>
      </header>

      {/* Course grid */}
      <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((course) => (
          <article
            key={course.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative h-36 bg-gray-100">
              {course.category && (
                <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                  {course.category}
                </span>
              )}
              <img
                src={course.imageUrl || fallbackImage}
                alt={course.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h4 className="font-manrope font-bold leading-tight text-gray-900">
                {course.name}
              </h4>
              <p className="text-sm text-gray-500">
                {course.lessonsCount || 0} dars · {course.durationMonths} oy
              </p>

              {/* Button */}
              <div className="mt-auto pt-3">
                <Link
                  to={`/courses/${course.slug}`}
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Batafsil
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
};

export default RecommendedCourses;
