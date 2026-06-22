import { Link } from "react-router-dom";

interface CertCard {
  id: string;
  course: string;
  student: string;
  date: string;
  score: string;
  certId: string;
  status: "earned";
}

interface InProgressCard {
  id: string;
  course: string;
  progress: number;
  status: "in-progress";
}

type Card = CertCard | InProgressCard;

const cards: Card[] = [
  {
    id: "js",
    course: "JavaScript asoslari",
    student: "Bobur Tojiev",
    date: "20-noyabr, 2025",
    score: "94% (A'lo)",
    certId: "UM-2025-0942",
    status: "earned",
  },
  {
    id: "git",
    course: "Git va GitHub",
    student: "Bobur Tojiev",
    date: "05-sentabr, 2025",
    score: "88% (Yaxshi)",
    certId: "UM-2025-0731",
    status: "earned",
  },
  {
    id: "react",
    course: "React.js — zamonaviy frontend",
    progress: 62,
    status: "in-progress",
  },
];

/* ── Earned cert card ── */
const EarnedCard = ({ card }: { card: CertCard }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
    {/* Preview */}
    <div className="flex flex-col items-center gap-2 bg-blue-50 px-5 py-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Sertifikat</span>
      <p className="font-manrope text-center text-lg font-extrabold text-gray-900">{card.course}</p>
      <p className="text-sm text-gray-500">{card.student}</p>
    </div>

    {/* Body */}
    <div className="flex flex-col gap-3 p-5">
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Berilgan sana</span>
          <strong className="text-gray-900">{card.date}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Yakuniy natija</span>
          <strong className="text-emerald-700">{card.score}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">ID</span>
          <strong className="text-gray-900">{card.certId}</strong>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
          Ko'rish
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Yuklash
        </button>
      </div>
    </div>
  </article>
);

/* ── In-progress card ── */
const InProgressCard = ({ card }: { card: InProgressCard }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
    {/* Preview */}
    <div className="flex flex-col items-center gap-2 bg-gray-50 px-5 py-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300">
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Hali olinmagan</span>
      <p className="font-manrope text-center text-lg font-extrabold text-gray-900">{card.course}</p>
      <p className="text-sm text-gray-400">Kursni tugatib oling</p>
    </div>

    {/* Body */}
    <div className="flex flex-col gap-3 p-5">
      {/* Progress */}
      <div>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-gray-400">Progress</span>
          <span className="font-bold text-blue-700">{card.progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      </div>

      <Link
        to="/dashboard/courses"
        className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
        Davom ettirish
      </Link>
    </div>
  </article>
);

/* ── Page ── */
const StudentCertificates = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">Sertifikatlarim</h2>
      <p className="mt-1 text-sm text-gray-500">
        Tugatilgan kurslar bo'yicha olingan raqamli sertifikatlar.
      </p>
    </div>

    {/* Grid */}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) =>
        card.status === "earned" ? (
          <EarnedCard key={card.id} card={card as CertCard} />
        ) : (
          <InProgressCard key={card.id} card={card as InProgressCard} />
        )
      )}
    </div>
  </div>
);

export default StudentCertificates;
