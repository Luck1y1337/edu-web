import SectionHeading from "../ui/SectionHeading";
import TeacherCard from "../ui/TeacherCard";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/Motion";
import type { Teacher } from "../../types/home.type";

interface Props {
  items: Teacher[];
}

const Teachers = ({ items }: Props) => {
  if (!items.length) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            badge="Jamoamiz"
            title="Bizning o'qituvchilar"
            subtitle="Soha mutaxassislari sizga bilim va tajriba ulashishga tayyor."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((teacher) => (
            <StaggerItem key={teacher.id || teacher.name}>
              <TeacherCard teacher={teacher} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Teachers;
