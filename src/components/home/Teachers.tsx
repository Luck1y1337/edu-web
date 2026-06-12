import SectionHeading from "../ui/SectionHeading";
import { teachers } from "../../data/home.data";

const Teachers = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Jamoamiz"
          title="Bizning o'qituvchilar"
          subtitle="Soha mutaxassislari sizga bilim va tajriba ulashishga tayyor."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
              <h3 className="mt-4 text-base font-semibold">{teacher.name}</h3>
              <p className="mt-1 text-sm font-medium text-blue-600">
                {teacher.role}
              </p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
