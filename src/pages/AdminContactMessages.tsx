import { useState } from "react";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useAdminContactMessages, useUpdateContactStatus } from "../hooks/api/useAdminContact";
import type { ContactMessageStatus } from "../types/api.type";

const PAGE_SIZE = 20;

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const statusColors: Record<ContactMessageStatus, string> = {
  new: "bg-blue-50 text-blue-700",
  read: "bg-amber-50 text-amber-700",
  replied: "bg-emerald-50 text-emerald-700",
  closed: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<ContactMessageStatus, string> = {
  new: "Yangi",
  read: "O'qilgan",
  replied: "Javob berilgan",
  closed: "Yopilgan",
};

const AdminContactMessages = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"" | ContactMessageStatus>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const messagesQuery = useAdminContactMessages({
    page,
    limit: PAGE_SIZE,
    ...(status ? { status } : {}),
  });
  const updateStatus = useUpdateContactStatus();

  const data = messagesQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleStatusChange = (id: string, newStatus: ContactMessageStatus) => {
    updateStatus.mutate({ id, body: { status: newStatus } });
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
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
      {/* --- Page header --- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Xabarlar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {total.toLocaleString("uz-UZ")} ta xabar
          </p>
        </div>
      </div>

      {/* --- Filter bar --- */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as "" | ContactMessageStatus);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha</option>
          <option value="new">Yangi</option>
          <option value="read">O'qilgan</option>
          <option value="replied">Javob berilgan</option>
          <option value="closed">Yopilgan</option>
        </select>
      </div>

      {/* --- Content --- */}
      {messagesQuery.isLoading ? (
        <GlobalSpinner />
      ) : messagesQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          Xabarlarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Filtr bo'yicha xabarlar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Ism
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Email
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Mavzu
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Sana
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
                {items.map((msg) => (
                  <>
                    <tr
                      key={msg.id}
                      onClick={() => toggleExpand(msg.id)}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {/* Name */}
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {msg.name}
                      </td>
                      {/* Email */}
                      <td className="px-5 py-4 text-gray-600">
                        {msg.email}
                      </td>
                      {/* Subject */}
                      <td className="px-5 py-4 text-gray-600 max-w-xs truncate">
                        {msg.subject || "—"}
                      </td>
                      {/* Date */}
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(msg.createdAt)}
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[msg.status]}`}
                        >
                          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                          {statusLabels[msg.status]}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {msg.status === "new" && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(msg.id, "read")}
                              disabled={updateStatus.isPending}
                              className="inline-flex items-center justify-center rounded-lg border border-amber-200 p-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700 transition-colors disabled:opacity-60"
                              aria-label="O'qilgan deb belgilash"
                              title="O'qilgan deb belgilash"
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                          )}
                          {(msg.status === "new" || msg.status === "read") && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(msg.id, "replied")}
                              disabled={updateStatus.isPending}
                              className="inline-flex items-center justify-center rounded-lg border border-emerald-200 p-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors disabled:opacity-60"
                              aria-label="Javob berilgan"
                              title="Javob berilgan"
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                            </button>
                          )}
                          {msg.status !== "closed" && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(msg.id, "closed")}
                              disabled={updateStatus.isPending}
                              className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors disabled:opacity-60"
                              aria-label="Yopish"
                              title="Yopish"
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded message row */}
                    {expandedId === msg.id && (
                      <tr key={`${msg.id}-expanded`} className="border-b border-gray-200 bg-gray-50">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                              Xabar matni
                            </p>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                              {msg.message}
                            </p>
                            {msg.phone && (
                              <p className="mt-3 text-xs text-gray-500">
                                Telefon: <span className="font-medium text-gray-700">{msg.phone}</span>
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Ko'rsatilmoqda{" "}
            <span className="font-semibold text-gray-900">{rangeStart}-{rangeEnd}</span>
            {" / "}
            <span className="font-semibold text-gray-900">{total.toLocaleString("uz-UZ")}</span>
            {" "}xabar
          </p>
          <nav aria-label="Sahifa" className="flex items-center gap-1">
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

export default AdminContactMessages;
