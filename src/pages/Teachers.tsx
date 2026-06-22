import { useQuery } from "@tanstack/react-query";
import PageHero from "../components/ui/PageHero";
import TeachersToolbar from "../components/teachers/TeachersToolbar";
import TeachersGrid from "../components/teachers/TeachersGrid";
import { allTeachers } from "../data/teachers.data";
import { publicApi } from "../services/api";
import { mapApiTeacherToTeacher } from "../services/mappers";

const Teachers = () => {
  const teachersQuery = useQuery({
    queryKey: ["public", "teachers"],
    queryFn: () => publicApi.getTeachers({ limit: 100 }),
  });
  const visibleTeachers = teachersQuery.data?.items.length
    ? teachersQuery.data.items.map(mapApiTeacherToTeacher)
    : allTeachers;

  return (
    <>
      <PageHero
        breadcrumb="O'qituvchilar"
        title="Bizning o'qituvchilar"
        subtitle="42 ta tajribali mutaxassis o'z bilim va tajribasini siz bilan ulashishga tayyor."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeachersToolbar />
          <TeachersGrid items={visibleTeachers} />
        </div>
      </section>
    </>
  );
};

export default Teachers;
