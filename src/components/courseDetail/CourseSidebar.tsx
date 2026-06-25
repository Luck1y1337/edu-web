import { Link } from "react-router-dom";
import type { CourseDetailData } from "../../data/courseDetail.data";

interface Props {
  course: CourseDetailData;
}

const CourseSidebar = ({ course }: Props) => {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-72">
      {/* Required Skills */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Talab qilinadigan ko'nikmalar
        </h3>
        <div className="flex flex-wrap gap-2">
          {course.requiredSkills.map((skill, i) => (
            <span
              key={skill}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                i < 2
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Course Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Kurs ma'lumotlari
        </h3>
        <ul className="flex flex-col gap-3">
          {[
            { label: "Format", value: course.format },
            { label: "Boshlanish", value: "Hoziroq", highlight: true },
            { label: "Kirish", value: "Umrbod" },
            { label: "Daraja", value: course.level },
            { label: "Sertifikat", value: course.certAvailable ? "Ha" : "Yo'q" },
          ].map(({ label, value, highlight }) => (
            <li
              key={label}
              className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-none last:pb-0"
            >
              <span className="text-sm text-gray-500">{label}</span>
              <strong
                className={`text-sm font-semibold ${
                  highlight ? "text-emerald-600" : "text-gray-900"
                }`}
              >
                {value}
              </strong>
            </li>
          ))}
        </ul>

        <Link
          to="/register"
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Hoziroq boshlash
        </Link>
      </div>
    </aside>
  );
};

export default CourseSidebar;
