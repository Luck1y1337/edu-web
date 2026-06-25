import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollment } from "../hooks/api/useEnrollments";
import type { EnrollmentModuleDto } from "../types/api.type";

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

/* ── SVG icons ─────────────────────────────────────────── */
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

/* ── Tabs ───────────────────────────────────────────────── */
type TabKey = "desc" | "curriculum" | "teacher";

/* ── Accordion Module ──────────────────────────────────── */
const AccordionModule = ({
  module,
  isOpen,
  onToggle,
}: {
  module: EnrollmentModuleDto;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const completed = module.lessons.filter((l) => l.progress?.status === "completed").length;
  const totalDuration = module.lessons.reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-left">
          <span className="text-sm font-semibold text-gray-900">{module.title}</span>
          <br />
          <span className="text-xs text-gray-500">
            {module.lessons.length} dars{totalDuration > 0 ? ` · ${totalDuration} daq` : ""} · {completed} tugallandi
          </span>
        </span>
        <ChevronIcon
          className={`w-4.5 h-4.5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-250 ${isOpen ? "max-h-150" : "max-h-0"}`}
      >
        <ul className="divide-y divide-gray-100">
          {module.lessons.map((lesson) => {
            const status = lesson.progress?.status ?? "not_started";
            const isDone = status === "completed";
            return (
              <li key={lesson.id}>
                <Link
                  to={`/dashboard/lesson/${lesson.id}`}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {isDone ? (
                    <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  ) : (
                    <PlayIcon />
                  )}
                  <span className="flex-1 min-w-0">{lesson.title}</span>
                  {lesson.durationMinutes && (
                    <span className="text-xs text-gray-400">{lesson.durationMinutes} daq</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

/* ── Main page ─────────────────────────────────────────── */
const CourseDetailStudent = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id || "";
  const enrollmentQuery = useEnrollment(courseId);
  const [activeTab, setActiveTab] = useState<TabKey>("desc");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  if (!id) return <Navigate to="/dashboard/courses" replace />;
  if (enrollmentQuery.isLoading) return <GlobalSpinner />;
  if (enrollmentQuery.isError || !enrollmentQuery.data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">Kurs topilmadi</h2>
        <p className="mt-2 text-sm text-gray-500">
          Bu kursga yozilmagansiz yoki manzili noto'g'ri.
        </p>
        <Link to="/dashboard/courses" className="mt-4 inline-block text-sm font-medium text-blue-600">
          Kurslar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const enrollment = enrollmentQuery.data;
  const { course, modules, progressPercent } = enrollment;

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.progress?.status === "completed").length;

  const nextLesson = modules
    .flatMap((m) => m.lessons)
    .find((l) => (l.progress?.status ?? "not_started") !== "completed");

  const toggleModule = (moduleId: string) =>
    setOpenModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));

  const tabs: { key: TabKey; label: string }[] = [
    { key: "desc", label: "Tavsif" },
    { key: "curriculum", label: "Dastur" },
    { key: "teacher", label: "O'qituvchi" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <nav className="mb-5">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link to="/dashboard/courses" className="hover:text-gray-900 transition">
              Kurslarim
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="font-semibold text-gray-900">{course.name}</li>
        </ol>
      </nav>

      {/* Hero card */}
      <article className="flex flex-wrap gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {/* Image */}
        <div className="w-70 shrink-0 overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "16 / 10" }}>
          <img
            src={course.imageUrl || fallbackImage}
            alt={course.name}
            className="h-full w-full object-cover block"
          />
        </div>
        {/* Body */}
        <div className="flex flex-1 min-w-60 flex-col gap-3">
          {course.category && (
            <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {course.category}
            </span>
          )}
          <h2 className="font-manrope text-2xl font-extrabold text-gray-900">{course.name}</h2>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <StarIcon /> {completedLessons}/{totalLessons} tugallandi
            </span>
            <span className="inline-flex items-center gap-1">
              <UsersIcon /> {totalLessons} dars
            </span>
            <span className="inline-flex items-center gap-1">
              <PlayIcon /> {modules.length} modul
            </span>
            <span className="inline-flex items-center gap-1">
              <GlobeIcon /> O'zbek tilida
            </span>
          </div>

          {/* Progress */}
          <div className="mt-auto flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-700">{progressPercent}%</span>
            <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </article>

      {/* 2-column layout: main + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Main content (tabs) */}
        <div>
          {/* Tab list */}
          <div className="mb-5 flex gap-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          {activeTab === "desc" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-manrope text-lg font-bold text-gray-900 mb-3">Kurs haqida</h3>
              {course.description && (
                <p className="text-gray-500 leading-relaxed mb-3">{course.description}</p>
              )}
              {course.longDescription && (
                <div
                  className="prose prose-gray max-w-none text-gray-500 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: course.longDescription }}
                />
              )}

              {/* What you'll learn checklist */}
              <h4 className="font-semibold text-gray-900 mt-5 mb-2">Nimalarni o'rganasiz?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modules.map((m) => (
                  <div key={m.id} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-manrope text-lg font-bold text-gray-900 mb-4">
                Kurs dasturi &mdash; {modules.length} modul &middot; {totalLessons} dars
              </h3>
              {modules.length === 0 ? (
                <p className="text-sm text-gray-500">Modullar hozircha qo'shilmagan.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {modules.map((m, i) => (
                    <AccordionModule
                      key={m.id}
                      module={m}
                      isOpen={openModules[m.id] ?? i === 0}
                      onToggle={() => toggleModule(m.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "teacher" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {course.name.charAt(0)}
                </span>
                <div>
                  <h3 className="font-manrope text-lg font-bold text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">O'qituvchi ma'lumotlari</p>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed mt-4">
                {course.description || "O'qituvchi haqida ma'lumot hozircha mavjud emas."}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar: price / info card */}
        <aside className="sticky top-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {/* Progress */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-extrabold text-gray-900">{progressPercent}%</span>
              <span className="text-sm text-gray-400 line-through">tugallandi</span>
            </div>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 my-4">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                {totalLessons} ta video dars
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                {modules.length} ta modul
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                {completedLessons} dars tugallandi
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                Umrbod kirish
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                Tugatgach sertifikat
              </li>
            </ul>

            {/* CTA */}
            {nextLesson ? (
              <Link
                to={`/dashboard/lesson/${nextLesson.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Keyingi darsni boshlash
              </Link>
            ) : (
              <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                Kurs tugallandi
              </span>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetailStudent;
