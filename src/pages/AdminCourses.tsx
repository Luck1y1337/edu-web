import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { useDebounce } from "../hooks/useDebounce";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import Pagination from "../components/ui/Pagination";
import { useAdminCourses, useDeleteAdminCourse } from "../hooks/api/useAdminCourses";
import type { AdminCourseStatus } from "../types/api.type";

const PAGE_SIZE = 20;

const categoryBadge = (cat: string) => {
  const lower = cat.toLowerCase();
  if (lower === "frontend") return "bg-blue-50 text-blue-700";
  if (lower === "backend") return "bg-emerald-50 text-emerald-700";
  if (lower === "dizayn" || lower === "design") return "bg-cyan-50 text-cyan-700";
  if (lower === "mobil" || lower === "mobile") return "bg-amber-50 text-amber-700";
  if (lower === "marketing") return "bg-gray-100 text-gray-600";
  return "bg-gray-100 text-gray-600";
};

const statusDotColor = (status: AdminCourseStatus) => {
  if (status === "published") return "bg-emerald-500";
  if (status === "draft") return "bg-amber-500";
  return "bg-gray-400";
};

const statusBadgeBg = (status: AdminCourseStatus) => {
  if (status === "published") return "bg-emerald-50 text-emerald-700";
  if (status === "draft") return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-500";
};

const statusLabel = (status: AdminCourseStatus) => {
  if (status === "published") return "Nashr etilgan";
  if (status === "draft") return "Qoralama";
  return "Arxivlangan";
};

const formatPrice = (price: number) => {
  return price.toLocaleString("uz-UZ") + " so'm";
};

const AdminCourses = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [status, setStatus] = useState<"" | AdminCourseStatus>("");
  const [category, setCategory] = useState("");

  const coursesQuery = useAdminCourses({
    page,
    limit: PAGE_SIZE,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(status ? { status } : {}),
    ...(category ? { category } : {}),
  });
  const deleteCourse = useDeleteAdminCourse();

  const data = coursesQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`"${name}" kursini o'chirishni tasdiqlaysizmi?`)) return;
    deleteCourse.mutate(id);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Kurslar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {total.toLocaleString("uz-UZ")} ta kurs
          </p>
        </div>
        <Link
          to="/admin/courses/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Yangi kurs
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-60">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            placeholder="Kurs nomi bo'yicha qidiring..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as "" | AdminCourseStatus);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha holatlar</option>
          <option value="published">Nashr etilgan</option>
          <option value="draft">Qoralama</option>
          <option value="archived">Arxivlangan</option>
        </select>

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha kategoriyalar</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="dizayn">Dizayn</option>
          <option value="mobil">Mobil</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* Content */}
      {coursesQuery.isLoading ? (
        <GlobalSpinner />
      ) : coursesQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          Kurslarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Filtr bo'yicha kurslar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Kurs
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    O'qituvchi
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Narx
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    O'quvchilar
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Holat
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 text-right">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((course) => {
                  const instructorName = course.instructor
                    ? [course.instructor.firstName, course.instructor.lastName].filter(Boolean).join(" ")
                    : "—";

                  return (
                    <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      {/* Course cell: thumbnail + name + category badge */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {course.imageUrl ? (
                            <img
                              src={course.imageUrl}
                              alt={course.name}
                              className="h-[42px] w-16 shrink-0 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-[42px] w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate max-w-xs">
                              {course.name}
                            </p>
                            <span
                              className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${categoryBadge(course.category)}`}
                            >
                              {course.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="px-5 py-4 text-gray-600">{instructorName}</td>

                      {/* Price */}
                      <td className="px-5 py-4 text-gray-900 font-medium">
                        {formatPrice(course.price)}
                      </td>

                      {/* Students count */}
                      <td className="px-5 py-4 text-gray-600">
                        {(course.studentsCount ?? 0).toLocaleString("uz-UZ")}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeBg(course.status)}`}
                        >
                          <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDotColor(course.status)}`} />
                          {statusLabel(course.status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/admin/courses/${course.id}`}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                            aria-label="Ko'rish"
                            title="Ko'rish"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(course.id, course.name)}
                            disabled={deleteCourse.isPending}
                            className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-60"
                            aria-label="O'chirish"
                            title="O'chirish"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        label="kurs"
      />
    </div>
  );
};

export default AdminCourses;
