import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../components/ui/PageHero";
import TeachersToolbar from "../components/teachers/TeachersToolbar";
import TeachersGrid from "../components/teachers/TeachersGrid";
import { publicApi } from "../services/api";
import { mapApiTeacherToTeacher } from "../services/mappers";
import { SkeletonCard } from "../components/ui/Skeleton";
import { queryKeys } from "../config/queryKeys";
import Seo from "../components/ui/Seo";

// Maps a filter pill label to keywords that may appear in a teacher's role/specialty.
const filterKeywords: Record<string, string[]> = {
  Frontend: ["frontend", "front-end", "react", "ui"],
  Backend: ["backend", "back-end", "node", "java", "python", "php", "go"],
  Dizayn: ["dizayn", "design", "ux", "ui"],
  Mobil: ["mobil", "mobile", "android", "ios", "flutter"],
  Marketing: ["marketing", "smm", "seo"],
};

const Teachers = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  const teachersQuery = useQuery({
    queryKey: queryKeys.public.instructors("all"),
    queryFn: () => publicApi.getInstructors({ limit: 100 }),
  });

  const allTeachers = useMemo(
    () => (teachersQuery.data?.items ?? []).map(mapApiTeacherToTeacher),
    [teachersQuery.data]
  );

  const visibleTeachers = useMemo(() => {
    const term = search.trim().toLowerCase();
    const keywords = filterKeywords[activeFilter];
    return allTeachers.filter((t) => {
      const matchesSearch = !term || t.name.toLowerCase().includes(term);
      const role = t.role?.toLowerCase() ?? "";
      const matchesFilter =
        activeFilter === "Barchasi" || !keywords || keywords.some((k) => role.includes(k));
      return matchesSearch && matchesFilter;
    });
  }, [allTeachers, search, activeFilter]);

  const total = teachersQuery.data?.total ?? 0;

  return (
    <>
      <Seo
        title="O'qituvchilar"
        description="Soha mutaxassislaridan iborat jamoamiz bilan tanishing — tajribali IT va dizayn o'qituvchilari."
      />
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeachersToolbar
            search={search}
            onSearchChange={setSearch}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
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
          ) : allTeachers.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-500">
              Hozircha o'qituvchilar ro'yxati bo'sh.
            </p>
          ) : visibleTeachers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-sm text-gray-500">
                Qidiruv yoki filtr bo'yicha o'qituvchi topilmadi.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("Barchasi");
                }}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <TeachersGrid items={visibleTeachers} />
          )}
        </div>
      </section>
    </>
  );
};

export default Teachers;
