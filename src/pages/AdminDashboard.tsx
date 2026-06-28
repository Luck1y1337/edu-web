import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { publicApi } from "../services/api";
import { useAdminStudents } from "../hooks/api/useAdminStudents";
import { useAdminReviews } from "../hooks/api/useAdminReviews";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import StatTileGrid from "../components/ui/StatTile";
import type { StatTileItem } from "../components/ui/StatTile";
import { queryKeys } from "../config/queryKeys";


const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const todayFormatted = () => {
  const d = new Date();
  const day = d.getDate();
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
  ];
  return `${day}-${months[d.getMonth()]}, ${d.getFullYear()}`;
};

const DownloadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowLineIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const statusBadge = (status?: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700";
    case "graduated":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const AdminDashboard = () => {
  const studentsQuery = useAdminStudents({ page: 1, limit: 5 });
  const statsQuery = useQuery({
    queryKey: queryKeys.public.stats,
    queryFn: publicApi.getStats,
  });
  const reviewsQuery = useAdminReviews({ page: 1, limit: 1 });

  if (studentsQuery.isLoading) return <GlobalSpinner />;

  const studentsTotal = studentsQuery.data?.total ?? 0;
  const recentStudents = studentsQuery.data?.items ?? [];
  const stats = statsQuery.data;
  const reviewsTotal = reviewsQuery.data?.total;

  const handleExportReport = () => {
    if (recentStudents.length === 0) {
      toast.info("Eksport uchun ma'lumot yo'q");
      return;
    }
    const header = ["Ism", "Familiya", "Email", "Telefon", "Holat", "Sana"];
    const rows = recentStudents.map((s) => {
      const u = s.user ?? {};
      return [
        u.firstName ?? "",
        u.lastName ?? "",
        u.email ?? "",
        u.phone ?? "",
        s.status ?? "",
        formatDate(s.enrolledAt || u.createdAt),
      ];
    });
    const csv = [header, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `talabalar-hisoboti-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Hisobot yuklab olindi");
  };

  const tiles: StatTileItem[] = [
    {
      iconBg: "#EFF6FF",
      iconColor: "#2563EB",
      svgPath: (
        <>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
      value: String(studentsTotal),
      label: "Talabalar",
    },
    {
      iconBg: "#ECFDF5",
      iconColor: "#059669",
      svgPath: (
        <>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </>
      ),
      value: String(stats?.courses ?? "—"),
      label: "Kurslar",
    },
    {
      iconBg: "#F5F3FF",
      iconColor: "#8B5CF6",
      svgPath: (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      ),
      value: String(stats?.instructors ?? stats?.teachers ?? "—"),
      label: "O’qituvchilar",
    },
    {
      iconBg: "#FFFBEB",
      iconColor: "#D97706",
      svgPath: (
        <>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </>
      ),
      value: String(stats?.graduates ?? "—"),
      label: "Bitiruvchilar",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Boshqaruv paneli
          </h2>
          <p className="text-sm text-gray-500">
            Online platforma umumiy ko&rsquo;rsatkichlari &middot; {todayFormatted()}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExportReport}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <DownloadIcon />
            Hisobot
          </button>
          <Link
            to="/admin/courses/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <PlusIcon />
            Yangi kurs
          </Link>
        </div>
      </header>

      {/* ── Stat tiles ── */}
      <StatTileGrid items={tiles} columns={4} />

      {/* ── Two-column grid ── */}
      <section className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Left: Yangi talabalar table */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <header className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-manrope text-base font-bold text-gray-900">Yangi talabalar</h3>
            <Link
              to="/admin/students"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Hammasi
              <ArrowLineIcon />
            </Link>
          </header>

          {recentStudents.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">Hozircha talabalar yo&rsquo;q.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
                  <tr>
                    <th className="px-5 py-3">O&rsquo;quvchi</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Telefon</th>
                    <th className="px-5 py-3">Sana</th>
                    <th className="px-5 py-3">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentStudents.map((s) => {
                    const u = s.user ?? {};
                    const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ");
                    const initials = [u.firstName?.[0], u.lastName?.[0]]
                      .filter(Boolean)
                      .join("")
                      .toUpperCase();
                    return (
                      <tr key={s.id} className="transition hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                              {initials || "?"}
                            </span>
                            <div className="min-w-0">
                              <Link
                                to={`/admin/students/${s.id}`}
                                className="block truncate font-semibold text-gray-900 hover:text-blue-600"
                              >
                                {fullName || "—"}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{u.email}</td>
                        <td className="px-5 py-4 text-gray-600">{u.phone}</td>
                        <td className="px-5 py-4 text-gray-600">
                          {formatDate(s.enrolledAt || u.createdAt)}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(s.status)}`}
                          >
                            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </article>

        {/* Right: Quick stats card */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <header className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-manrope text-base font-bold text-gray-900">
              Tezkor ma&rsquo;lumot
            </h3>
          </header>
          <div className="p-5">
            <ol className="flex flex-col">
              {/* Summary rows */}
              <li className="flex items-center gap-3 border-b border-gray-100 py-3 first:pt-0 last:border-b-0 last:pb-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                  1
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Jami talabalar
                  </p>
                  <span className="text-xs text-gray-500">Ro&rsquo;yxatdagi barcha o&rsquo;quvchilar</span>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {studentsTotal}
                </span>
              </li>
              <li className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                  2
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Kurslar soni</p>
                  <span className="text-xs text-gray-500">Faol kurslar</span>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {stats?.courses ?? "—"}
                </span>
              </li>
              <li className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                  3
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    O&rsquo;qituvchilar
                  </p>
                  <span className="text-xs text-gray-500">Faol o&rsquo;qituvchilar</span>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {stats?.instructors ?? stats?.teachers ?? "—"}
                </span>
              </li>
              <li className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  4
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Bitiruvchilar</p>
                  <span className="text-xs text-gray-500">Sertifikat olganlar</span>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {stats?.graduates ?? "—"}
                </span>
              </li>
              <li className="flex items-center gap-3 py-3 last:pb-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  5
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Izohlar</p>
                  <span className="text-xs text-gray-500">Jami sharhlar soni</span>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {reviewsTotal ?? "—"}
                </span>
              </li>
            </ol>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AdminDashboard;
