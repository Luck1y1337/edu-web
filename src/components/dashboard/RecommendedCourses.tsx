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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Siz uchun tavsiya etiladi</h2>
        <Link to="/dashboard/catalog" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Barcha kurslar →
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((course) => (
          <article
            key={course.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-32">
              <img
                src={course.imageUrl || fallbackImage}
                alt={course.name}
                className="h-full w-full object-cover"
              />
              {course.category && (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-blue-700 backdrop-blur">
                  {course.category}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-base font-semibold text-gray-900">{course.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {course.lessonsCount || 0} dars · {course.durationMonths} oy
              </p>

              <Link
                to={`/courses/${course.slug}`}
                className="mt-4 w-full rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Batafsil
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
