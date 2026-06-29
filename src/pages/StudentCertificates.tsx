import { Link } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useCertificates, useClaimCertificate } from "../hooks/api/useCertificates";
import { useEnrollments } from "../hooks/api/useEnrollments";
import useUserStore from "../store/user.store";
import type { CertificateDto, StudentEnrollmentListItemDto } from "../types/api.type";

const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
  } catch {
    return "";
  }
};

/* ── Medal SVG icon ── */
const MedalIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

/* ── Lock SVG icon ── */
const LockIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ── Download SVG icon ── */
const DownloadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ═══════════════════════════════════════════════════
   Earned certificate card
   ═══════════════════════════════════════════════════ */
const EarnedCard = ({ cert, studentName }: { cert: CertificateDto; studentName: string }) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md">
    {/* Preview section */}
    <div className="flex flex-col items-center gap-2 border-b border-gray-200 bg-blue-50 px-5 py-6 text-center">
      <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white">
        <MedalIcon />
      </span>
      <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Sertifikat</span>
      <span className="font-manrope text-base font-extrabold text-gray-900">{cert.course.name}</span>
      <span className="text-sm text-gray-500">{studentName}</span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col gap-3 p-4 px-5">
      {/* Meta rows */}
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Kurs</span>
          <strong className="font-semibold text-gray-900">{cert.course.name}</strong>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Berilgan sana</span>
          <strong className="font-semibold text-gray-900">{formatDate(cert.issuedAt)}</strong>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Seriya raqami</span>
          <strong className="font-semibold text-gray-900">{cert.serialNumber}</strong>
        </div>
        {cert.revokedAt && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Holat</span>
            <strong className="font-semibold text-red-600">Bekor qilingan</strong>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-auto flex gap-2">
        {cert.pdfUrl ? (
          <>
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Ko'rish
            </a>
            <a
              href={cert.pdfUrl}
              download
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <DownloadIcon />
              Yuklash
            </a>
          </>
        ) : (
          <button
            type="button"
            disabled
            className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-400"
          >
            PDF tayyorlanmoqda
          </button>
        )}
      </div>
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════
   Claimable certificate card (course completed, cert not yet claimed)
   ═══════════════════════════════════════════════════ */
const ClaimableCard = ({
  enrollment,
  onClaim,
  isClaiming,
}: {
  enrollment: StudentEnrollmentListItemDto;
  onClaim: () => void;
  isClaiming: boolean;
}) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-emerald-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md">
    {/* Preview section */}
    <div className="flex flex-col items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-5 py-6 text-center">
      <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">
        <MedalIcon />
      </span>
      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Tayyor</span>
      <span className="font-manrope text-base font-extrabold text-gray-900">{enrollment.course.name}</span>
      <span className="text-sm text-emerald-700">Kurs tugatildi — sertifikatni oling</span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col gap-3 p-4 px-5">
      <div className="mt-auto flex gap-2">
        <button
          onClick={onClaim}
          disabled={isClaiming}
          className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {isClaiming ? "Olinyapti..." : "Sertifikatni olish"}
        </button>
      </div>
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════
   In-progress card (locked / not yet earned)
   ═══════════════════════════════════════════════════ */
const InProgressCard = ({ enrollment }: { enrollment: StudentEnrollmentListItemDto }) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md">
    {/* Preview section — muted/locked */}
    <div className="flex flex-col items-center gap-2 border-b border-gray-200 bg-gray-50 px-5 py-6 text-center">
      <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-gray-300 text-white">
        <LockIcon />
      </span>
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Hali olinmagan</span>
      <span className="font-manrope text-base font-extrabold text-gray-900">{enrollment.course.name}</span>
      <span className="text-sm text-gray-400">Kursni tugatib oling</span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col gap-3 p-4 px-5">
      {/* Meta: progress */}
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Progress</span>
          <strong className="font-semibold text-gray-900">{enrollment.progressPercent}%</strong>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${enrollment.progressPercent}%` }}
        />
      </div>

      {/* Action */}
      <div className="mt-auto">
        <Link
          to={`/dashboard/courses/${enrollment.course.id}`}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Davom ettirish
        </Link>
      </div>
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════
   Main page component
   ═══════════════════════════════════════════════════ */
const StudentCertificates = () => {
  const user = useUserStore((s) => s.user);
  const certificatesQuery = useCertificates();
  const enrollmentsQuery = useEnrollments();
  const claim = useClaimCertificate();

  const studentName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Talaba";

  if (certificatesQuery.isLoading || enrollmentsQuery.isLoading) return <GlobalSpinner />;

  const certificates = certificatesQuery.data ?? [];
  const enrollments = enrollmentsQuery.data ?? [];

  const certifiedCourseIds = new Set(certificates.map((c) => c.course.id));
  const claimable = enrollments.filter(
    (e) => e.status === "completed" && !certifiedCourseIds.has(e.course.id)
  );
  const inProgress = enrollments.filter(
    (e) => e.status !== "completed" && e.status !== "cancelled" && e.progressPercent < 100
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
          Sertifikatlarim
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Tugatilgan kurslar bo'yicha olingan raqamli sertifikatlar.
        </p>
      </div>

      {/* Certificate grid */}
      {certificates.length === 0 && claimable.length === 0 && inProgress.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Hali sertifikatlar yo'q. Kursni tugatganingizdan keyin shu yerda paydo bo'ladi.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {certificates.map((c) => (
            <EarnedCard key={c.id} cert={c} studentName={studentName} />
          ))}
          {claimable.map((e) => (
            <ClaimableCard
              key={e.id}
              enrollment={e}
              isClaiming={claim.isPending && claim.variables === e.course.id}
              onClaim={() => claim.mutate(e.course.id)}
            />
          ))}
          {inProgress.map((e) => (
            <InProgressCard key={e.id} enrollment={e} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCertificates;
