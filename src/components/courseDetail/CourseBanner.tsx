import { Link } from "react-router-dom";
import type { CourseDetailData } from "../../data/courseDetail.data";

interface Props {
  course: CourseDetailData;
}

const CourseBanner = ({ course }: Props) => {
  return (
    <section className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* ── LEFT CONTENT ── */}
          <div className="max-w-2xl flex-1">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="transition-colors hover:text-white">
                    Bosh sahifa
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <Link to="/courses" className="transition-colors hover:text-white">
                    Kurslar
                  </Link>
                </li>
                <li className="flex items-center gap-2" aria-current="page">
                  <svg
                    className="h-4 w-4 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="text-gray-300">{course.title}</span>
                </li>
              </ol>
            </nav>

            {/* Badges */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                {course.category}
              </span>
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                {course.level}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-manrope mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            {/* Description */}
            <p className="mb-6 text-base leading-relaxed text-gray-300 lg:text-lg">
              {course.description}
            </p>

            {/* Meta row */}
            <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
              {/* Rating */}
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-amber-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <strong className="text-white">{course.rating}</strong>
                <span>({course.reviewCount} sharh)</span>
              </span>

              {/* Students */}
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {course.studentCount} talaba
              </span>

              {/* Duration */}
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                </svg>
                {course.duration} davom etadi
              </span>

              {/* Language */}
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                {course.language}
              </span>
            </div>

            {/* Teacher */}
            <div className="flex items-center gap-3 border-t border-gray-700 pt-5">
              <img
                src={course.teacherAvatar}
                alt={course.teacher}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-600"
              />
              <div>
                <p className="text-xs text-gray-500">O'qituvchi</p>
                <p className="text-sm font-semibold text-white">{course.teacher}</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT STICKY CARD ── */}
          <aside className="w-full shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg lg:sticky lg:top-24 lg:w-105">
            {/* Course image */}
            <img
              src={course.image}
              alt={course.title}
              className="h-52 w-full object-cover"
            />

            {/* Card body */}
            <div className="flex flex-col gap-4 p-6">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-manrope text-3xl font-extrabold text-gray-900">
                  {course.price}
                </span>
                {course.oldPrice && course.oldPrice !== "Bepul" && (
                  <span className="text-base text-gray-400 line-through">
                    {course.oldPrice}
                  </span>
                )}
              </div>

              {/* Feature checklist */}
              <ul className="flex flex-col gap-2.5 border-y border-gray-100 py-4">
                {course.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2.5 text-sm text-gray-700"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-lg bg-blue-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Ro'yxatdan o'tish
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Bepul konsultatsiya
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CourseBanner;
