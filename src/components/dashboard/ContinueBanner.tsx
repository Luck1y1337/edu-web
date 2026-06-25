import { Link } from "react-router-dom";
import type { StudentEnrollmentListItemDto } from "../../types/api.type";

interface Props {
  enrollment: StudentEnrollmentListItemDto;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=70";

const ContinueBanner = ({ enrollment }: Props) => {
  const { course, progressPercent } = enrollment;
  const completedLessons = course.lessonsCount
    ? Math.round((progressPercent / 100) * course.lessonsCount)
    : 0;

  return (
    <article className="grid overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:grid-cols-[320px_1fr]">
      {/* Media */}
      <div className="relative min-h-40 bg-gray-100 md:min-h-50">
        <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          Davom etmoqda
        </span>
        <img
          src={course.imageUrl || fallbackImage}
          alt={course.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-6">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          O'qishni davom ettiring
        </span>
        <h3 className="font-manrope text-xl font-bold text-gray-900">
          {course.name}
        </h3>
        {course.category && (
          <p className="text-sm text-gray-500">
            {course.category}
          </p>
        )}

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Kurs progressi</span>
            <span className="font-bold text-blue-700">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center gap-3">
          <Link
            to={`/dashboard/courses/${course.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Darsni davom ettirish
          </Link>
          {course.lessonsCount ? (
            <span className="text-sm text-gray-500">
              {completedLessons} / {course.lessonsCount} dars tugallandi
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ContinueBanner;
