import { Link } from "react-router-dom";
import type { TeacherDetailData } from "../../data/teacherDetail.data";

interface Props {
  teachers: TeacherDetailData[];
}

const OtherTeachers = ({ teachers }: Props) => {
  if (!teachers.length) return null;

  return (
    <section className="border-t border-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Boshqa o'qituvchilar
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Jamoamizning boshqa mutaxassislari bilan ham tanishing.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((t) => (
            <Link
              key={t.id}
              to={`/teachers/${t.id}`}
              className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="mb-4 h-20 w-20 rounded-full object-cover ring-4 ring-blue-50"
              />
              <h3 className="font-manrope text-lg font-bold text-gray-900">{t.name}</h3>
              <p className="mb-3 text-sm text-blue-600">{t.roleLabel}</p>
              <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
                {t.bio[0]}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>
                  <strong className="text-gray-900">{t.courses}</strong> Kurs
                </span>
                <span>
                  <strong className="text-gray-900">{t.students}</strong> Talaba
                </span>
                <span>
                  <strong className="text-gray-900">{t.rating}</strong> ⭐
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherTeachers;
