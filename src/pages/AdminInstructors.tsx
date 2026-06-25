import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { useDebounce } from "../hooks/useDebounce";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useAdminInstructors, useDeleteAdminInstructor } from "../hooks/api/useAdminInstructors";
import type { AdminInstructorStatus } from "../types/api.type";

const PAGE_SIZE = 20;

const statusBadge = (status: AdminInstructorStatus) => {
  if (status === "active") return "bg-emerald-50 text-emerald-700";
  return "bg-gray-100 text-gray-500";
};

const statusLabel = (status: AdminInstructorStatus) => {
  if (status === "active") return "Faol";
  return "Nofaol";
};

const getInitials = (firstName?: string, lastName?: string) => {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
};

const AdminInstructors = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [status, setStatus] = useState<"" | AdminInstructorStatus>("");

  const instructorsQuery = useAdminInstructors({
    page,
    limit: PAGE_SIZE,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(status ? { status } : {}),
  });
  const deleteInstructor = useDeleteAdminInstructor();

  const data = instructorsQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`"${name}" o'qituvchini o'chirishni tasdiqlaysizmi?`)) return;
    deleteInstructor.mutate(id);
  };

  /* Pagination range: show first, last, current +/- 1, with ellipsis */
  const buildPageRange = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "ellipsis")[] = [];
    const near = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
    let prev = 0;
    for (const p of Array.from(near).sort((a, b) => a - b)) {
      if (p < 1 || p > totalPages) continue;
      if (prev && p - prev > 1) pages.push("ellipsis");
      pages.push(p);
      prev = p;
    }
    return pages;
  };

  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="space-y-6">
      {/* ─── Page header ─── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            O'qituvchilar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {total.toLocaleString("uz-UZ")} ta o'qituvchi
          </p>
        </div>
        <Link
          to="/admin/instructors/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Yangi o'qituvchi
        </Link>
      </div>

      {/* ─── Filter bar ─── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-60">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            placeholder="Ism yoki email bo'yicha qidiring..."
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
            setStatus(e.target.value as "" | AdminInstructorStatus);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha</option>
          <option value="active">Aktiv</option>
          <option value="inactive">Nofaol</option>
        </select>
      </div>

      {/* ─── Content ─── */}
      {instructorsQuery.isLoading ? (
        <GlobalSpinner />
      ) : instructorsQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          O'qituvchilarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Filtr bo'yicha o'qituvchilar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    O'qituvchi
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Mutaxassislik
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Tajriba
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Kurslar soni
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
                {items.map((inst) => {
                  const name = [inst.user.firstName, inst.user.lastName].filter(Boolean).join(" ");
                  return (
                    <tr key={inst.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      {/* Name cell with avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                            {getInitials(inst.user.firstName, inst.user.lastName)}
                          </span>
                          <div className="min-w-0">
                            <Link
                              to={`/admin/instructors/${inst.id}`}
                              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {name}
                            </Link>
                            <div className="text-xs text-gray-500 truncate">
                              {inst.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{inst.specialty}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {inst.experience != null ? `${inst.experience} yil` : "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {inst.coursesCount ?? 0}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                            inst.status
                          )}`}
                        >
                          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                          {statusLabel(inst.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/admin/instructors/${inst.id}`}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                            aria-label="Ko'rish"
                            title="Profil"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(inst.id, name)}
                            disabled={deleteInstructor.isPending}
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

      {/* ─── Pagination ─── */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Ko'rsatilmoqda{" "}
            <span className="font-semibold text-gray-900">{rangeStart}-{rangeEnd}</span>
            {" / "}
            <span className="font-semibold text-gray-900">{total.toLocaleString("uz-UZ")}</span>
            {" "}o'qituvchi
          </p>
          <nav aria-label="Sahifa" className="flex items-center gap-1">
            {/* Prev button */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Oldingi sahifa"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {buildPageRange().map((p, idx) =>
              p === "ellipsis" ? (
                <span key={`e-${idx}`} className="inline-flex h-9 w-9 items-center justify-center text-sm text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    page === p
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next button */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Keyingi sahifa"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminInstructors;
