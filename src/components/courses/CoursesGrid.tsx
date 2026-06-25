import { useState, useMemo } from "react";
import { allCourses, type Course } from "../../data/courses.data";
import CourseCard from "./CourseCard";
import CoursesFilter from "./CoursesFilter";

const SORT_OPTIONS = [
  "Eng mashhur",
  "Yangi qo'shilgan",
  "Narx: arzon",
  "Narx: qimmat",
  "Reyting bo'yicha",
];
const PER_PAGE = 9;

interface FilterState {
  categories: string[];
  level: string;
  priceMin: string;
  priceMax: string;
  durations: string[];
}

interface Props {
  items?: Course[];
}

const CoursesGrid = ({ items = allCourses }: Props) => {
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
    let result = [...items];

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
      result.sort(
        (a, b) =>
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, ""))
      );
    } else if (sort === "Narx: qimmat") {
      result.sort(
        (a, b) =>
          parseInt(b.price.replace(/\D/g, "")) -
          parseInt(a.price.replace(/\D/g, ""))
      );
    } else if (sort === "Eng mashhur" || sort === "Reyting bo'yicha") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return result;
  }, [search, filters, sort, items]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (f: FilterState) => {
    setFilters(f);
    setPage(1);
  };

  /* Build page number array with ellipsis */
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Kurs nomi yoki yo'nalish..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            aria-label="Kurs qidiruvi"
          />
        </div>

        {/* Count + Sort */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {filtered.length} ta kurs topildi
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-9 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2-col layout: sidebar + grid */}
      <div className="flex gap-8 lg:items-start">
        <CoursesFilter onFilter={handleFilter} />

        <div className="min-w-0 flex-1">
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
            <nav
              className="mt-10 flex items-center justify-center gap-1"
              aria-label="Sahifa navigatsiyasi"
            >
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                  page === 1
                    ? "cursor-not-allowed border-gray-200 text-gray-300"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                aria-label="Oldingi"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex h-9 w-9 items-center justify-center text-sm text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                    {...(p === page ? { "aria-current": "page" as const } : {})}
                  >
                    {p}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                  page === totalPages
                    ? "cursor-not-allowed border-gray-200 text-gray-300"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                aria-label="Keyingi"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesGrid;
