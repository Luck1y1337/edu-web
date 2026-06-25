import { useQuery } from "@tanstack/react-query";
import PageHero from "../components/ui/PageHero";
import TeachersToolbar from "../components/teachers/TeachersToolbar";
import TeachersGrid from "../components/teachers/TeachersGrid";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { publicApi } from "../services/api";
import { mapApiTeacherToTeacher } from "../services/mappers";

const Teachers = () => {
  const teachersQuery = useQuery({
    queryKey: ["public", "instructors", "all"],
    queryFn: () => publicApi.getInstructors({ limit: 100 }),
  });

  const visibleTeachers = (teachersQuery.data?.items ?? []).map(mapApiTeacherToTeacher);
  const total = teachersQuery.data?.total ?? 0;

  return (
    <>
      <PageHero
        breadcrumb="O'qituvchilar"
        title="Bizning o'qituvchilar"
        subtitle={
          total
            ? `${total} ta tajribali mutaxassis o'z bilim va tajribasini siz bilan ulashishga tayyor.`
            : "Tajribali mutaxassislar jamoamiz bilan tanishing."
        }
      />
      <section className="py-10 sm:py-12 md:py-14">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <TeachersToolbar />
          {teachersQuery.isLoading ? (
            <GlobalSpinner />
          ) : teachersQuery.isError ? (
            <p className="py-20 text-center text-sm text-red-600">
              O'qituvchilarni yuklab bo'lmadi.
            </p>
          ) : visibleTeachers.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-500">
              Hozircha o'qituvchilar ro'yxati bo'sh.
            </p>
          ) : (
            <TeachersGrid items={visibleTeachers} />
          )}
        </div>
      </section>
    </>
  );
};

export default Teachers;
