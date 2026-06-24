import { Link } from "react-router-dom";
import type { StudentEnrollmentListItemDto } from "../../types/api.type";

interface Props {
  items: StudentEnrollmentListItemDto[];
}

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

const ActiveCourses = ({ items }: Props) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Faol online kurslarim</h2>
        <Link to="/dashboard/courses" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Hammasi →
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">
          Hozircha faol kurslar yo'q.{" "}
          <Link to="/dashboard/catalog" className="font-medium text-blue-600 hover:underline">
            Katalogdan tanlash →
          </Link>
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {items.map((e) => (
            <article
              key={e.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-32">
                <img
                  src={e.course.imageUrl || fallbackImage}
                  alt={e.course.name}
                  className="h-full w-full object-cover"
                />
                {e.course.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-blue-700 backdrop-blur">
                    {e.course.category}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold text-gray-900">
                  {e.course.name}
                </h3>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{e.course.lessonsCount || 0} dars</span>
                    <span className="font-semibold text-gray-700">{e.progressPercent}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${e.progressPercent}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={`/dashboard/courses/${e.course.id}`}
                  className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Davom ettirish
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveCourses;
