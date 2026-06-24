import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { StudentEnrollmentListItemDto } from "../../types/api.type";

interface Props {
  enrollment: StudentEnrollmentListItemDto;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=70";

const ContinueBanner = ({ enrollment }: Props) => {
  const { course, progressPercent } = enrollment;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:flex-row">
      <div className="relative h-44 shrink-0 sm:h-auto sm:w-64">
        <img
          src={course.imageUrl || fallbackImage}
          alt={course.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 backdrop-blur">
          Davom etmoqda
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          O'qishni davom ettiring
        </span>
        <h2 className="mt-2 text-xl font-bold text-gray-900">{course.name}</h2>
        {course.category && (
          <p className="mt-1 text-sm text-gray-500">{course.category}</p>
        )}

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Kurs progressi</span>
            <span className="font-semibold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            to={`/dashboard/courses/${course.id}`}
            className="inline-flex items-center gap-x-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Icon.play />
            Darsni davom ettirish
          </Link>
          {course.lessonsCount ? (
            <span className="text-sm text-gray-500">
              {course.lessonsCount} dars
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ContinueBanner;
