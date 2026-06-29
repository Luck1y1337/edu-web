import { useState } from "react";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import Pagination from "../components/ui/Pagination";
import { useAdminReviews, useModerateReview } from "../hooks/api/useAdminReviews";
import type { ReviewModerationStatus } from "../types/api.type";

const PAGE_SIZE = 20;

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

/* ── Status helpers ── */
const statusBadge = (status: ReviewModerationStatus) => {
  if (status === "approved") return "bg-emerald-50 text-emerald-700";
  if (status === "pending") return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700"; // rejected
};

const statusDotColor = (status: ReviewModerationStatus) => {
  if (status === "approved") return "bg-emerald-500";
  if (status === "pending") return "bg-amber-500";
  return "bg-red-500";
};

const statusLabel = (status: ReviewModerationStatus) => {
  if (status === "approved") return "Tasdiqlangan";
  if (status === "pending") return "Kutilmoqda";
  return "Rad etilgan";
};

const getInitials = (firstName?: string, lastName?: string) => {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
};

/* ── Star rating component ── */
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5" role="img" aria-label={`Reyting: ${rating}/5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const AdminReviews = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"" | ReviewModerationStatus>("");

  const reviewsQuery = useAdminReviews({
    page,
    limit: PAGE_SIZE,
    ...(statusFilter ? { status: statusFilter } : {}),
  });
  const moderateReview = useModerateReview();

  const data = reviewsQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleApprove = (id: string) => {
    moderateReview.mutate({ id, body: { status: "approved" } });
  };

  const handleReject = (id: string) => {
    moderateReview.mutate({ id, body: { status: "rejected" } });
  };

  return (
    <div className="space-y-6">
      {/* ─── Page header ─── */}
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
          Sharhlar
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Jami {total.toLocaleString("uz-UZ")} ta sharh
        </p>
      </div>

      {/* ─── Filter bar ─── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value as "" | ReviewModerationStatus);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha holatlar</option>
          <option value="pending">Kutilmoqda</option>
          <option value="approved">Tasdiqlangan</option>
          <option value="rejected">Rad etilgan</option>
        </select>
      </div>

      {/* ─── Content ─── */}
      {reviewsQuery.isLoading ? (
        <GlobalSpinner />
      ) : reviewsQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          Sharhlarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Filtr bo'yicha sharhlar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Mobile: card list */}
          <ul className="divide-y divide-gray-100 md:hidden">
            {items.map((r) => {
              const studentName = [r.student?.firstName, r.student?.lastName].filter(Boolean).join(" ") || "—";
              return (
                <li key={r.id} className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      {r.student?.avatarUrl ? (
                        <img src={r.student.avatarUrl} alt={studentName} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                      ) : (
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                          {getInitials(r.student?.firstName, r.student?.lastName)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{studentName}</p>
                        <p className="truncate text-xs text-gray-500">{r.course?.name ?? "—"}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge(r.status)}`}>
                      {statusLabel(r.status)}
                    </span>
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="text-sm text-gray-600">{r.comment}</p>
                  <p className="text-xs text-gray-400">{formatDate(r.createdAt)}</p>
                  <div className="flex items-center gap-2 pt-1">
                    {r.status !== "approved" && (
                      <button
                        type="button"
                        onClick={() => handleApprove(r.id)}
                        disabled={moderateReview.isPending}
                        className="rounded-lg border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50 disabled:opacity-60"
                      >
                        Tasdiqlash
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => handleReject(r.id)}
                        disabled={moderateReview.isPending}
                        className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        Rad etish
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Sharhlar ro'yxati</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Talaba
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Kurs
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Reyting
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Sharh
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
                {items.map((r) => {
                  const studentName = [r.student?.firstName, r.student?.lastName].filter(Boolean).join(" ") || "—";
                  return (
                    <tr key={r.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {r.student?.avatarUrl ? (
                            <img
                              src={r.student.avatarUrl}
                              alt={studentName}
                              className="h-8 w-8 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                              {getInitials(r.student?.firstName, r.student?.lastName)}
                            </span>
                          )}
                          <span className="font-semibold text-gray-900">{studentName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {r.course?.name ?? "—"}
                      </td>
                      <td className="px-5 py-4">
                        <StarRating rating={r.rating} />
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="truncate text-gray-600" title={r.comment}>
                          {r.comment}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(r.status)}`}>
                          <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDotColor(r.status)}`} />
                          {statusLabel(r.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve button */}
                          {r.status !== "approved" && (
                            <button
                              type="button"
                              onClick={() => handleApprove(r.id)}
                              disabled={moderateReview.isPending}
                              className="inline-flex items-center justify-center rounded-lg border border-emerald-200 p-2 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors disabled:opacity-60"
                              title="Tasdiqlash"
                              aria-label="Tasdiqlash"
                            >
                              {/* check icon */}
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                          )}
                          {/* Reject button */}
                          {r.status !== "rejected" && (
                            <button
                              type="button"
                              onClick={() => handleReject(r.id)}
                              disabled={moderateReview.isPending}
                              className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-60"
                              title="Rad etish"
                              aria-label="Rad etish"
                            >
                              {/* X icon */}
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          )}
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
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        label="sharh"
      />
    </div>
  );
};

export default AdminReviews;
