import { Link } from "react-router-dom";
import { activeCourses } from "../../data/dashboard.data";

const ActiveCourses = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Faol online kurslarim</h2>
        <Link to="/dashboard/courses" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Hammasi →
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {activeCourses.map((course) => (
          <article
            key={course.title}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-32">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold backdrop-blur ${course.categoryColor}`}
              >
                {course.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-base font-semibold text-gray-900">
                {course.title}
              </h3>
              <div className="mt-2 flex items-center gap-x-2">
                <img
                  src={course.teacherPhoto}
                  alt={course.teacher}
                  className="h-5 w-5 rounded-full object-cover"
                />
                <span className="text-sm text-gray-500">{course.teacher}</span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {course.completedLessons} / {course.totalLessons} dars
                  </span>
                  <span className="font-semibold text-gray-700">
                    {course.progress}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${course.progressColor}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <Link
                to="/dashboard/courses"
                className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Davom ettirish
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
