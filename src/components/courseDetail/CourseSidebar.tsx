import { Link } from "react-router-dom";
import type { CourseDetailData } from "../../data/courseDetail.data";

interface Props {
  course: CourseDetailData;
}

const CourseSidebar = ({ course }: Props) => {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-80">
      {/* Required Skills */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Talab qilinadigan ko'nikmalar
        </h3>
        <div className="flex flex-wrap gap-2">
          {course.requiredSkills.map((skill, i) => (
            <span
              key={skill}
              className={`rounded px-2 py-1 text-xs font-medium ${
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
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-manrope mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Kurs ma'lumotlari
        </h3>
        <ul className="flex flex-col gap-3">
          {[
            { label: "Format", value: course.format },
            { label: "Daraja", value: course.level },
            { label: "Til", value: "O'zbek" },
            { label: "Davom", value: course.duration },
            { label: "Sertifikat", value: course.certAvailable ? "Ha" : "Yo'q" },
          ].map(({ label, value }) => (
            <li key={label} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-none last:pb-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-semibold text-gray-900">{value}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/register"
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Guruhga yozilish
        </Link>
      </div>
    </aside>
  );
};

export default CourseSidebar;
