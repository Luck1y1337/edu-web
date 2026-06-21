import { Link } from "react-router-dom";
import type { TeacherDetailData } from "../../data/teacherDetail.data";

interface Props {
  teacher: TeacherDetailData;
}

const TeacherSidebar = ({ teacher }: Props) => {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-96">
      {/* Certificates */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="font-manrope mb-4 text-lg font-bold tracking-tight text-gray-900">
          Sertifikatlar
        </h3>
        <ul className="flex flex-col gap-4">
          {teacher.certificates.map((cert) => (
            <li key={cert.name} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                <p className="text-xs text-gray-500">{cert.issuer}, {cert.year}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Schedule */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="font-manrope mb-4 text-lg font-bold tracking-tight text-gray-900">
          Dars beriladigan vaqtlari
        </h3>
        <ul className="flex flex-col gap-3">
          {teacher.schedule.map((s) => (
            <li key={s.day} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-none last:pb-0">
              <span className="text-sm text-gray-500">{s.day}</span>
              <span className="text-sm font-semibold text-gray-900">{s.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
        <h3 className="font-manrope mb-2 text-lg font-bold">
          {teacher.name.split(" ")[0]} bilan o'qishni boshlang
        </h3>
        <p className="mb-4 text-sm text-blue-100">
          Kursga yoziling va birinchi darsni bepul oling.
        </p>
        <Link
          to="/courses"
          className="flex items-center justify-center rounded-lg bg-white py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Kursga yozilish
        </Link>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
