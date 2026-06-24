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

const EarnedCard = ({ cert, studentName }: { cert: CertificateDto; studentName: string }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
    <div className="flex flex-col items-center gap-2 bg-blue-50 px-5 py-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white text-lg">
        ✓
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Sertifikat</span>
      <p className="font-manrope text-center text-lg font-extrabold text-gray-900">{cert.course.name}</p>
      <p className="text-sm text-gray-500">{studentName}</p>
    </div>

    <div className="flex flex-col gap-3 p-5">
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Berilgan sana</span>
          <strong className="text-gray-900">{formatDate(cert.issuedAt)}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">ID</span>
          <strong className="text-gray-900">{cert.serialNumber}</strong>
        </div>
        {cert.revokedAt && (
          <div className="flex justify-between">
            <span className="text-gray-400">Holat</span>
            <strong className="text-red-600">Bekor qilingan</strong>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {cert.pdfUrl ? (
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Yuklash
          </a>
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

const ClaimableCard = ({
  enrollment,
  onClaim,
  isClaiming,
}: {
  enrollment: StudentEnrollmentListItemDto;
  onClaim: () => void;
  isClaiming: boolean;
}) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-emerald-200 bg-white">
    <div className="flex flex-col items-center gap-2 bg-emerald-50 px-5 py-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">★</span>
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Tayyor</span>
      <p className="font-manrope text-center text-lg font-extrabold text-gray-900">{enrollment.course.name}</p>
      <p className="text-sm text-emerald-700">Kurs tugatildi — sertifikatni oling</p>
    </div>
    <div className="flex flex-col gap-3 p-5">
      <button
        onClick={onClaim}
        disabled={isClaiming}
        className="rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {isClaiming ? "Olinyapti..." : "Sertifikatni olish"}
      </button>
    </div>
  </article>
);

const InProgressCard = ({ enrollment }: { enrollment: StudentEnrollmentListItemDto }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
    <div className="flex flex-col items-center gap-2 bg-gray-50 px-5 py-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300 text-white">🔒</span>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Hali olinmagan</span>
      <p className="font-manrope text-center text-lg font-extrabold text-gray-900">{enrollment.course.name}</p>
      <p className="text-sm text-gray-400">Kursni tugatib oling</p>
    </div>
    <div className="flex flex-col gap-3 p-5">
      <div>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-gray-400">Progress</span>
          <span className="font-bold text-blue-700">{enrollment.progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${enrollment.progressPercent}%` }} />
        </div>
      </div>
      <Link
        to={`/dashboard/courses/${enrollment.course.id}`}
        className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700"
      >
        Davom ettirish
      </Link>
    </div>
  </article>
);

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
      <div>
        <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">Sertifikatlarim</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tugatilgan kurslar bo'yicha olingan raqamli sertifikatlar.
        </p>
      </div>

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
              isClaiming={claim.isPending}
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
