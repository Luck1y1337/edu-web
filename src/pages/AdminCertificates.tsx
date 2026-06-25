import { useState } from "react";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import Pagination from "../components/ui/Pagination";
import { useAdminCertificates, useRevokeCertificate } from "../hooks/api/useAdminCertificates";

const PAGE_SIZE = 20;

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const getInitials = (firstName?: string, lastName?: string) => {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
};

const AdminCertificates = () => {
  const [page, setPage] = useState(1);

  const certsQuery = useAdminCertificates({ page, limit: PAGE_SIZE });
  const revokeCert = useRevokeCertificate();

  const data = certsQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleRevoke = (id: string, serial: string) => {
    if (!window.confirm(`"${serial}" sertifikatni bekor qilishni tasdiqlaysizmi?`)) return;
    revokeCert.mutate(id);
  };

  const isRevoked = (revokedAt?: string | null) => !!revokedAt;

  return (
    <div className="space-y-6">
      {/* ─── Page header ─── */}
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
          Sertifikatlar
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Jami {total.toLocaleString("uz-UZ")} ta sertifikat
        </p>
      </div>

      {/* ─── Content ─── */}
      {certsQuery.isLoading ? (
        <GlobalSpinner />
      ) : certsQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          Sertifikatlarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Sertifikatlar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Talaba
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Kurs
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Seriya raqami
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Berilgan sana
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
                {items.map((c) => {
                  const revoked = isRevoked(c.revokedAt);
                  const studentName = [c.student?.firstName, c.student?.lastName].filter(Boolean).join(" ") || "—";
                  return (
                    <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                            {getInitials(c.student?.firstName, c.student?.lastName)}
                          </span>
                          <span className="font-semibold text-gray-900">{studentName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {c.course?.name ?? "—"}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs font-semibold text-gray-900">
                        {c.serialNumber}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(c.issuedAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            revoked ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          <span
                            className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                              revoked ? "bg-red-500" : "bg-emerald-500"
                            }`}
                          />
                          {revoked ? "Bekor qilingan" : "Faol"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {!revoked && (
                          <button
                            type="button"
                            onClick={() => handleRevoke(c.id, c.serialNumber)}
                            disabled={revokeCert.isPending}
                            className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-60"
                            title="Bekor qilish"
                          >
                            {/* ban / revoke icon */}
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                            </svg>
                          </button>
                        )}
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
        label="sertifikat"
      />
    </div>
  );
};

export default AdminCertificates;
