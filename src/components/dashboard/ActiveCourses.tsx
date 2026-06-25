import { Link } from "react-router-dom";
import type { StudentEnrollmentListItemDto } from "../../types/api.type";

interface Props {
  items: StudentEnrollmentListItemDto[];
}

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

const ActiveCourses = ({ items }: Props) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-gray-200 p-5">
        <h3 className="font-manrope text-base font-bold text-gray-900">
          Faol online kurslarim
        </h3>
        <Link
          to="/dashboard/courses"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Hammasi
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Link>
      </header>

      {/* Course grid */}
      {items.length === 0 ? (
        <div className="p-5">
          <p className="text-sm text-gray-500">
            Hozircha faol kurslar yo'q.{" "}
            <Link to="/dashboard/catalog" className="font-medium text-blue-600 hover:underline">
              Katalogdan tanlash
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid gap-5 p-5 xl:grid-cols-2">
          {items.map((e) => {
            const completedLessons = e.course.lessonsCount
              ? Math.round((e.progressPercent / 100) * e.course.lessonsCount)
              : 0;

            return (
              <article
                key={e.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-36 bg-gray-100">
                  {e.course.category && (
                    <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                      {e.course.category}
                    </span>
                  )}
                  <img
                    src={e.course.imageUrl || fallbackImage}
                    alt={e.course.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h4 className="font-manrope font-bold leading-tight text-gray-900">
                    {e.course.name}
                  </h4>

                  {/* Progress */}
                  <div className="mt-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{completedLessons} / {e.course.lessonsCount || 0} dars</span>
                      <span className="font-bold text-blue-700">{e.progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${e.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-auto pt-3">
                    <Link
                      to={`/dashboard/courses/${e.course.id}`}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Davom ettirish
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default ActiveCourses;
