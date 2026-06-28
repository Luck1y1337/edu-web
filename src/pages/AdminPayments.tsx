import { useState } from "react";
import { Icon } from "../components/ui/Icon";
import { useDebounce } from "../hooks/useDebounce";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import Pagination from "../components/ui/Pagination";
import { useAdminPayments, useUpdatePaymentStatus, useRefundPayment } from "../hooks/api/useAdminPayments";
import type { AdminPaymentStatus, AdminPaymentMethod } from "../types/api.type";

const PAGE_SIZE = 20;

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const formatAmount = (amount: number) =>
  amount.toLocaleString("uz-UZ") + " so'm";

/* ── Status helpers ── */
const statusBadge = (status: AdminPaymentStatus) => {
  if (status === "paid") return "bg-emerald-50 text-emerald-700";
  if (status === "pending") return "bg-amber-50 text-amber-700";
  if (status === "refunded") return "bg-red-50 text-red-700";
  return "bg-gray-100 text-gray-500"; // cancelled, partial
};

const statusDotColor = (status: AdminPaymentStatus) => {
  if (status === "paid") return "bg-emerald-500";
  if (status === "pending") return "bg-amber-500";
  if (status === "refunded") return "bg-red-500";
  return "bg-gray-400";
};

const statusLabel = (status: AdminPaymentStatus) => {
  if (status === "paid") return "To'landi";
  if (status === "pending") return "Kutilmoqda";
  if (status === "refunded") return "Qaytarildi";
  if (status === "cancelled") return "Bekor qilingan";
  return "Qisman";
};

/* ── Method helpers ── */
const methodBadge = (method: AdminPaymentMethod) => {
  if (method === "payme") return "bg-cyan-50 text-cyan-700";
  if (method === "click") return "bg-amber-50 text-amber-700";
  if (method === "card") return "bg-blue-50 text-blue-700";
  return "bg-gray-100 text-gray-600"; // cash
};

const methodLabel = (method: AdminPaymentMethod) => {
  if (method === "payme") return "Payme";
  if (method === "click") return "Click";
  if (method === "card") return "Karta";
  return "Naqd";
};

const getInitials = (firstName?: string, lastName?: string) => {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
};

const AdminPayments = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [statusFilter, setStatusFilter] = useState<"" | AdminPaymentStatus>("");
  const [methodFilter, setMethodFilter] = useState<"" | AdminPaymentMethod>("");
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

  const paymentsQuery = useAdminPayments({
    page,
    limit: PAGE_SIZE,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(methodFilter ? { method: methodFilter } : {}),
  });
  const refundPayment = useRefundPayment();

  const data = paymentsQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleRefund = (id: string) => {
    if (!window.confirm("Bu to'lovni qaytarishni tasdiqlaysizmi?")) return;
    refundPayment.mutate({ id, body: {} });
  };

  return (
    <div className="space-y-6">
      {/* ─── Page header ─── */}
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
          To'lovlar
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Jami {total.toLocaleString("uz-UZ")} ta to'lov
        </p>
      </div>

      {/* ─── Filter bar ─── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-60">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            placeholder="Tranzaksiya yoki o'quvchi bo'yicha qidiring..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value as "" | AdminPaymentStatus);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha holatlar</option>
          <option value="paid">To'landi</option>
          <option value="pending">Kutilmoqda</option>
          <option value="refunded">Qaytarildi</option>
          <option value="cancelled">Bekor qilingan</option>
        </select>

        <select
          value={methodFilter}
          onChange={(e) => {
            setPage(1);
            setMethodFilter(e.target.value as "" | AdminPaymentMethod);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha usullar</option>
          <option value="payme">Payme</option>
          <option value="click">Click</option>
          <option value="card">Karta</option>
          <option value="cash">Naqd</option>
        </select>
      </div>

      {/* ─── Content ─── */}
      {paymentsQuery.isLoading ? (
        <GlobalSpinner />
      ) : paymentsQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          To'lovlarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Filtr bo'yicha to'lovlar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Mobile: card list */}
          <ul className="divide-y divide-gray-100 md:hidden">
            {items.map((p) => {
              const studentName = [p.student?.firstName, p.student?.lastName].filter(Boolean).join(" ") || "—";
              const txnId = `#TXN-${p.id.slice(0, 6).toUpperCase()}`;
              return (
                <li key={p.id} className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {getInitials(p.student?.firstName, p.student?.lastName)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{studentName}</p>
                        <p className="font-mono text-xs text-gray-500">{txnId}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge(p.status)}`}>
                      {statusLabel(p.status)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-bold text-gray-900">{formatAmount(p.amount)}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${methodBadge(p.method)}`}>
                      {methodLabel(p.method)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{p.course?.name ?? "—"} · {formatDate(p.paidAt || p.createdAt)}</p>
                  <div className="flex items-center gap-2 pt-1">
                    {editingStatusId === p.id ? (
                      <StatusChanger
                        paymentId={p.id}
                        currentStatus={p.status}
                        onClose={() => setEditingStatusId(null)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingStatusId(p.id)}
                        className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Holatni o'zgartirish
                      </button>
                    )}
                    {p.status === "paid" && editingStatusId !== p.id && (
                      <button
                        type="button"
                        onClick={() => handleRefund(p.id)}
                        disabled={refundPayment.isPending}
                        className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        Qaytarish
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
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Tranzaksiya
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    O'quvchi
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Kurs
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Summa
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Usul
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
                {items.map((p) => {
                  const studentName = [p.student?.firstName, p.student?.lastName].filter(Boolean).join(" ") || "—";
                  const txnId = `#TXN-${p.id.slice(0, 6).toUpperCase()}`;
                  return (
                    <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs font-semibold text-gray-900">
                        {txnId}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                            {getInitials(p.student?.firstName, p.student?.lastName)}
                          </span>
                          <span className="font-semibold text-gray-900">{studentName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {p.course?.name ?? "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {formatAmount(p.amount)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${methodBadge(p.method)}`}>
                          {methodLabel(p.method)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(p.paidAt || p.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(p.status)}`}>
                          <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDotColor(p.status)}`} />
                          {statusLabel(p.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Inline status change */}
                          {editingStatusId === p.id ? (
                            <StatusChanger
                              paymentId={p.id}
                              currentStatus={p.status}
                              onClose={() => setEditingStatusId(null)}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditingStatusId(p.id)}
                              className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                              title="Holatni o'zgartirish"
                            >
                              {/* pencil icon */}
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                          )}

                          {/* Refund button — only for paid */}
                          {p.status === "paid" && (
                            <button
                              type="button"
                              onClick={() => handleRefund(p.id)}
                              disabled={refundPayment.isPending}
                              className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-60"
                              title="Qaytarish"
                            >
                              {/* undo / refund icon */}
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
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
        label="to'lov"
      />
    </div>
  );
};

/* ─── Inline status changer sub-component ─── */
const StatusChanger = ({
  paymentId,
  currentStatus,
  onClose,
}: {
  paymentId: string;
  currentStatus: AdminPaymentStatus;
  onClose: () => void;
}) => {
  const updateStatus = useUpdatePaymentStatus(paymentId);
  const [newStatus, setNewStatus] = useState<AdminPaymentStatus>(currentStatus);

  const handleSave = () => {
    if (newStatus === currentStatus) {
      onClose();
      return;
    }
    updateStatus.mutate({ status: newStatus }, { onSuccess: onClose });
  };

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value as AdminPaymentStatus)}
        className="rounded-lg border border-gray-200 bg-white py-1.5 pl-2 pr-6 text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="pending">Kutilmoqda</option>
        <option value="paid">To'landi</option>
        <option value="refunded">Qaytarildi</option>
        <option value="cancelled">Bekor qilingan</option>
      </select>
      <button
        type="button"
        onClick={handleSave}
        disabled={updateStatus.isPending}
        className="inline-flex items-center justify-center rounded-lg border border-emerald-200 p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-60"
        title="Saqlash"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
        title="Bekor qilish"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default AdminPayments;
