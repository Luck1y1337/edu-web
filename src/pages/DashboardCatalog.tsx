import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "../components/ui/Skeleton";
import { publicApi } from "../services/api";
import { formatPrice } from "../services/mappers";
import { useEnrollments } from "../hooks/api/useEnrollments";
import type { PublicCourseDto } from "../types/api.type";

const PAGE_SIZE = 9;

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

const DashboardCatalog = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("search") ?? "");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);

  // Keep the search box in sync when navigated here with a ?search= query (e.g. from the topbar).
  const urlSearch = searchParams.get("search") ?? "";
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  if (prevUrlSearch !== urlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchTerm(urlSearch);
    setPage(1);
  }

  const sortMap: Record<string, { sortBy?: string; order?: "asc" | "desc" }> = {
    popular: {},
    newest: { sortBy: "createdAt", order: "desc" },
    price_asc: { sortBy: "price", order: "asc" },
    price_desc: { sortBy: "price", order: "desc" },
  };

  const coursesQuery = useQuery({
    queryKey: ["public", "courses", "catalog", { searchTerm, category, level, sort, page }],
    queryFn: () =>
      publicApi.getCourses({
        page,
        limit: PAGE_SIZE,
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(category ? { category } : {}),
        ...(level ? { level } : {}),
        ...sortMap[sort],
      }),
  });
  const enrollmentsQuery = useEnrollments();

  const enrolledIds = useMemo(
    () => new Set((enrollmentsQuery.data ?? []).map((e) => e.course.id)),
    [enrollmentsQuery.data]
  );

  const data = coursesQuery.data;
  const courses = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col gap-2">
        <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
          Kurslar katalogi
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          Yangi kurs tanlang va bir martalik to'lov bilan umrbod kirish oling.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Kurs nomi bo'yicha qidiring..."
            className="block w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-blue-500"
        >
          <option value="">Barcha kategoriyalar</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="design">Dizayn</option>
          <option value="mobile">Mobil</option>
          <option value="data">Data Science</option>
        </select>

        <select
          value={level}
          onChange={(e) => {
            setPage(1);
            setLevel(e.target.value);
          }}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-blue-500"
        >
          <option value="">Daraja: barchasi</option>
          <option value="beginner">Boshlovchi</option>
          <option value="intermediate">O'rtacha</option>
          <option value="advanced">Mutaxassis</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-blue-500"
        >
          <option value="popular">Saralash: mashhur</option>
          <option value="newest">Eng yangi</option>
          <option value="price_asc">Arzonroq</option>
          <option value="price_desc">Qimmatroq</option>
        </select>
      </div>

      {coursesQuery.isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : coursesQuery.isError ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-sm text-red-600">Kurslarni yuklab bo'lmadi.</p>
          <button
            onClick={() => coursesQuery.refetch()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Qayta urinish
          </button>
        </div>
      ) : courses.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Berilgan filtr bo'yicha kurslar topilmadi.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: PublicCourseDto) => {
            const isEnrolled = enrolledIds.has(course.id);
            return (
              <article
                key={course.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-40 shrink-0 bg-gray-100">
                  <img
                    src={course.imageUrl || fallbackImage}
                    alt={course.name}
                    className="h-full w-full object-cover"
                  />
                  {course.category && (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {course.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="font-manrope text-lg font-bold text-gray-900 line-clamp-1">
                    {course.name}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-gray-900">
                        {formatPrice(course.price)}
                      </span>
                      {course.oldPrice && course.oldPrice > course.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(course.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      to={`/courses/${course.slug}`}
                      className="flex-1 rounded-lg border border-gray-300 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Batafsil
                    </Link>
                    {isEnrolled ? (
                      <Link
                        to={`/dashboard/courses/${course.id}`}
                        className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        Davom etish
                      </Link>
                    ) : (
                      <Link
                        to={`/dashboard/buy-course?slug=${course.slug}`}
                        className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Sotib olish
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Jami{" "}
            <span className="font-semibold text-gray-900">{total}</span> kurs
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded text-sm font-medium ${
                  page === p
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCatalog;
