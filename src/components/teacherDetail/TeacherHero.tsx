import { Link } from "react-router-dom";
import type { TeacherDetailData } from "../../data/teacherDetail.data";

interface Props {
  teacher: TeacherDetailData;
}

const TeacherHero = ({ teacher }: Props) => {
  return (
    <section style={{ background: "linear-gradient(104.43deg, #EFF6FF 0%, #F5F3FF 100%)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Bosh sahifa</Link>
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/teachers" className="hover:text-gray-700">O'qituvchilar</Link>
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold text-gray-900">{teacher.name}</span>
        </nav>

        {/* Layout */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="h-44 w-44 rounded-full object-cover ring-6 ring-white shadow-xl"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2">
            {/* Role */}
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {teacher.roleLabel}
            </p>

            {/* Name */}
            <h1 className="font-manrope text-4xl font-extrabold tracking-tight text-gray-900">
              {teacher.name}
            </h1>

            {/* Short bio */}
            <p className="mt-1 max-w-xl text-lg leading-relaxed text-gray-500">
              {teacher.shortBio}
            </p>

            {/* Stats */}
            <div className="mt-3 flex flex-wrap gap-8">
              {teacher.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-manrope text-2xl font-extrabold text-gray-900">
                    {s.value}
                  </span>
                  <span className="text-xs text-gray-500">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                to="/courses"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Darsga yozilish
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Savol berish
              </Link>

              {/* Social links */}
              <div className="flex items-center gap-2 pl-2">
                {[
                  { label: "Telegram", icon: "T" },
                  { label: "LinkedIn", icon: "in" },
                  { label: "GitHub", icon: "G" },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    title={s.label}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherHero;
