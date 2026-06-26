import { useQuery } from "@tanstack/react-query";
import PageHero from "../components/ui/PageHero";
import TeachersToolbar from "../components/teachers/TeachersToolbar";
import TeachersGrid from "../components/teachers/TeachersGrid";
import { publicApi } from "../services/api";
import { mapApiTeacherToTeacher } from "../services/mappers";
import { SkeletonCard } from "../components/ui/Skeleton";
import { queryKeys } from "../config/queryKeys";

const Teachers = () => {
  const teachersQuery = useQuery({
    queryKey: queryKeys.public.instructors("all"),
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : teachersQuery.isError ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-sm text-red-600">O'qituvchilarni yuklab bo'lmadi.</p>
              <button
                onClick={() => teachersQuery.refetch()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Qayta urinish
              </button>
            </div>
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
