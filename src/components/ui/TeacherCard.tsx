import { memo } from "react";
import { Link } from "react-router-dom";
import type { Teacher } from "../../types/home.type";

const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TeacherCard = memo(({ teacher }: { teacher: Teacher }) => {
  const slug = teacher.id || toSlug(teacher.name);
  return (
    <Link
      to={`/teachers/${slug}`}
      className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      <img
        src={teacher.photo}
        alt={teacher.name}
        className="h-30 w-30 rounded-full border-4 border-blue-50 object-cover"
      />
      <h3 className="mt-4 font-manrope text-lg font-bold text-gray-900">{teacher.name}</h3>
      <p className="mt-1 text-sm font-medium text-blue-600">{teacher.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-2">
        {teacher.desc}
      </p>
      <div className="mt-5 flex w-full items-center justify-center gap-5 border-t border-gray-100 pt-4">
        <div>
          <p className="text-lg font-bold text-gray-900">{teacher.courses}</p>
          <p className="text-xs text-gray-400">Kurs</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{teacher.students}</p>
          <p className="text-xs text-gray-400">Talaba</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{teacher.rating}</p>
          <p className="text-xs text-gray-400">Reyting</p>
        </div>
      </div>
    </Link>
  );
});

export default TeacherCard;
