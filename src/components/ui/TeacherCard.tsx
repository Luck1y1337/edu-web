import { Link } from "react-router-dom";
import type { Teacher } from "../../types/home.type";

const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TeacherCard = ({ teacher }: { teacher: Teacher }) => {
  const slug = teacher.id || toSlug(teacher.name);
  return (
    <Link
      to={`/teachers/${slug}`}
      className="block rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      <img
        src={teacher.photo}
        alt={teacher.name}
        className="mx-auto h-20 w-20 rounded-full object-cover"
      />
      <h3 className="mt-4 text-base font-semibold">{teacher.name}</h3>
      <p className="mt-1 text-sm font-medium text-blue-600">{teacher.role}</p>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        {teacher.desc}
      </p>
      <div className="mt-5 grid grid-cols-3 border-t border-gray-100 pt-4">
        <div>
          <p className="text-sm font-bold">{teacher.courses}</p>
          <p className="text-xs text-gray-400">Kurs</p>
        </div>
        <div>
          <p className="text-sm font-bold">{teacher.students}</p>
          <p className="text-xs text-gray-400">Talaba</p>
        </div>
        <div>
          <p className="text-sm font-bold">{teacher.rating}</p>
          <p className="text-xs text-gray-400">Reyting</p>
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;
