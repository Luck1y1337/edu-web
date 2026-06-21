import { useState, useMemo } from "react";
import { allCourses } from "../../data/courses.data";
import CourseCard from "./CourseCard";
import CoursesFilter from "./CoursesFilter";

const SORT_OPTIONS = ["Eng mashhur", "Eng yangi", "Narx: arzon", "Narx: qimmat"];
const PER_PAGE = 9;

interface FilterState {
  categories: string[];
  level: string;
  priceMin: string;
  priceMax: string;
  durations: string[];
}

const CoursesGrid = () => {
  const [sort, setSort] = useState("Eng mashhur");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    level: "Barchasi",
    priceMin: "",
    priceMax: "",
    durations: [],
  });

  const filtered = useMemo(() => {
    let result = [...allCourses];

    if (search.trim()) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filters.categories.length > 0) {
      result = result.filter((c) => filters.categories.includes(c.category));
    }
    if (filters.level !== "Barchasi") {
      result = result.filter((c) => c.level === filters.level);
    }

    if (sort === "Narx: arzon") {
      result.sort((a, b) =>
        parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, ""))
      );
    } else if (sort === "Narx: qimmat") {
      result.sort((a, b) =>
        parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, ""))
      );
    } else if (sort === "Eng mashhur") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return result;
  }, [search, filters, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: FilterState) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Kurs nomi yoki yo'nalish…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Count + Sort */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">
            {filtered.length} ta kurs topildi
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <CoursesFilter onFilter={handleFilter} />

        <div className="flex-1">
          {/* Grid */}
          {visible.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-24 text-center text-gray-400">
              <p className="text-lg font-medium">Kurs topilmadi</p>
              <p className="mt-1 text-sm">Filtrlarni o'zgartirib ko'ring</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              {page < totalPages && (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesGrid;
