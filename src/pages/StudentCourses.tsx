import { Link } from "react-router-dom";
import { stats, activeCourses, completedCourses } from "../data/studentCourses.data";

/* ── Stat icons ── */
const StatIcon = ({ type, color }: { type: string; color: string }) => {
  if (type === "courses")
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  if (type === "check")
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (type === "cert")
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    );
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

/* ── StudentCourses ── */
const StudentCourses = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Mening online kurslarim
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Yozilgan barcha online kurslaringiz, progress va sertifikatlaringiz.
          </p>
        </div>
        <Link
          to="/dashboard/catalog"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Yangi kurs olish
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((s) => (
          <article
            key={s.label}
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-lg"
              style={{ background: s.iconBg }}
            >
              <StatIcon type={s.type} color={s.iconColor} />
            </span>
            <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </article>
        ))}
      </div>

      {/* Active courses */}
      <section>
        <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">
          Davom etayotgan kurslar ({activeCourses.length})
        </h3>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activeCourses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              {/* Thumbnail */}
              <div className="relative h-36 bg-gray-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
                <span
                  className="absolute left-2 top-2 rounded-full px-3 py-0.5 text-xs font-semibold"
                  style={{ background: "#EFF6FF", color: course.categoryColor }}
                >
                  {course.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h4 className="font-manrope font-bold text-gray-900 leading-tight">
                  {course.title}
                </h4>

                {/* Teacher */}
                <div className="flex items-center gap-2">
                  <img
                    src={course.teacherAvatar}
                    alt={course.teacher}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-500">{course.teacher}</span>
                </div>

                {/* Progress */}
                <div className="mt-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">
                      {course.lessonsCompleted} / {course.lessonsTotal} dars
                    </span>
                    <span className="font-bold text-blue-700">{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/dashboard/lesson/${course.id}`}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Davom ettirish
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Completed courses */}
      <section>
        <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">
          Tugallangan kurslar ({completedCourses.length})
        </h3>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {completedCourses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              {/* Thumbnail */}
              <div className="relative h-36 bg-gray-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
                  Tugallangan
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h4 className="font-manrope font-bold text-gray-900 leading-tight">
                  {course.title}
                </h4>

                {/* Teacher */}
                <div className="flex items-center gap-2">
                  <img
                    src={course.teacherAvatar}
                    alt={course.teacher}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-500">{course.teacher}</span>
                </div>

                {/* Score */}
                <p className="text-sm text-gray-500">
                  Yakuniy natija:{" "}
                  <span className="font-bold text-gray-900">{course.score}%</span>{" "}
                  <span className="text-emerald-600">({course.grade})</span>
                </p>

                {/* CTA */}
                <Link
                  to="/dashboard/certificates"
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Sertifikatni yuklash
                </Link>
              </div>
            </article>
          ))}

          {/* Add new course card */}
          <Link
            to="/dashboard/catalog"
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center transition-colors hover:border-blue-300 hover:bg-blue-50"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-200 text-blue-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <div>
              <p className="font-manrope font-bold text-gray-900">Yangi online kurs olish</p>
              <p className="mt-1 text-xs text-gray-500">
                Katalogdan kurs tanlang va darrov o'qishni boshlang.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StudentCourses;
