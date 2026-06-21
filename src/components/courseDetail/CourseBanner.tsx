import { Link } from "react-router-dom";
import type { CourseDetailData } from "../../data/courseDetail.data";

interface Props {
  course: CourseDetailData;
}

const CourseBanner = ({ course }: Props) => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(114.32deg, #1D4ED8 0%, #6D28D9 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

          {/* ── LEFT CONTENT ── */}
          <div className="flex-1 pt-8">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-2 text-sm text-white/75">
              <Link to="/" className="hover:text-white">Bosh sahifa</Link>
              <svg className="h-3.5 w-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link to="/courses" className="hover:text-white">Kurslar</Link>
              <svg className="h-3.5 w-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-semibold text-white">{course.title}</span>
            </nav>

            {/* Badges */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                {course.category}
              </span>
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                {course.level}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-manrope mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {course.title}
            </h1>

            {/* Description */}
            <p className="mb-6 max-w-xl text-lg leading-relaxed text-white/90">
              {course.description}
            </p>

            {/* Meta row */}
            <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <svg className="h-4.5 w-4.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <strong className="font-semibold text-white">{course.rating}</strong>
                <span>({course.reviewCount} sharh)</span>
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
                {course.studentCount} talaba
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration} davom etadi
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {course.language}
              </span>
            </div>

            {/* Teacher */}
            <div className="flex items-center gap-3 border-t border-white/15 pt-5">
              <img
                src={course.teacherAvatar}
                alt={course.teacher}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <div>
                <p className="text-xs text-white/60">O'qituvchi</p>
                <p className="text-sm font-semibold text-white">{course.teacher} — JavaScript Lead</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT CARD ── */}
          <aside className="w-full shrink-0 overflow-hidden rounded-2xl bg-white shadow-2xl lg:w-[460px]">
            {/* Course image */}
            <img
              src={course.image}
              alt={course.title}
              className="h-56 w-full object-cover"
            />

            {/* Card body */}
            <div className="flex flex-col gap-4 p-6">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-manrope text-4xl font-extrabold text-gray-900">
                  {course.price}
                </span>
                <span className="text-lg text-gray-400 line-through">{course.oldPrice}</span>
              </div>

              {/* Features list */}
              <ul className="flex flex-col gap-2 border-y border-gray-100 py-4">
                {course.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-lg bg-blue-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Ro'yxatdan o'tish
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
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
