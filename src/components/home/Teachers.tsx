import SectionHeading from "../ui/SectionHeading";
import TeacherCard from "../ui/TeacherCard";
import type { Teacher } from "../../types/home.type";

interface Props {
  items: Teacher[];
}

const Teachers = ({ items }: Props) => {
  if (!items.length) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Jamoamiz"
          title="Bizning o'qituvchilar"
          subtitle="Soha mutaxassislari sizga bilim va tajriba ulashishga tayyor."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((teacher) => (
            <TeacherCard key={teacher.id || teacher.name} teacher={teacher} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
