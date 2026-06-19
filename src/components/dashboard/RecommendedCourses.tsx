import { recommendedCourses } from "../../data/dashboard.data";

const RecommendedCourses = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Siz uchun tavsiya etiladi</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Barcha kurslar →
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedCourses.map((course) => (
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
              <p className="mt-1 text-sm text-gray-500">
                {course.lessons} dars · {course.hours} soat
              </p>

              <button className="mt-4 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Batafsil
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
