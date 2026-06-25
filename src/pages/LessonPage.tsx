import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollment, useEnrollments, useMarkLessonProgress } from "../hooks/api/useEnrollments";
import type {
  EnrollmentLessonDto,
  EnrollmentModuleDto,
  StudentEnrollmentDetailDto,
  StudentEnrollmentListItemDto,
} from "../types/api.type";

/* ── Helpers ────────────────────────────────────────────── */

const findLesson = (
  enrollment: StudentEnrollmentDetailDto,
  lessonId: string
): {
  module: EnrollmentModuleDto;
  lesson: EnrollmentLessonDto;
  index: number;
  total: number;
  prev?: EnrollmentLessonDto;
  next?: EnrollmentLessonDto;
} | null => {
  const allLessons = enrollment.modules.flatMap((m) =>
    m.lessons.map((l) => ({ module: m, lesson: l }))
  );
  const index = allLessons.findIndex(({ lesson }) => lesson.id === lessonId);
  if (index === -1) return null;
  return {
    module: allLessons[index].module,
    lesson: allLessons[index].lesson,
    index,
    total: allLessons.length,
    prev: allLessons[index - 1]?.lesson,
    next: allLessons[index + 1]?.lesson,
  };
};

const findEnrollmentForLesson = (
  enrollments: StudentEnrollmentListItemDto[],
  lessonId: string,
  detailCache: Record<string, StudentEnrollmentDetailDto>
) => {
  for (const e of enrollments) {
    const detail = detailCache[e.course.id];
    if (!detail) continue;
    if (detail.modules.some((m) => m.lessons.some((l) => l.id === lessonId))) {
      return e.course.id;
    }
  }
  return null;
};

/* ── SVG Icons ──────────────────────────────────────────── */

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlayTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

/* ── Sidebar module accordion ──────────────────────────── */

const SidebarModule = ({
  module,
  currentLessonId,
  courseId,
  isOpen,
  onToggle,
}: {
  module: EnrollmentModuleDto;
  currentLessonId: string;
  courseId: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const completed = module.lessons.filter((l) => l.progress?.status === "completed").length;

  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span>
          <span className="text-sm font-semibold text-gray-900">{module.title}</span>
          <br />
          <span className="text-xs text-gray-500">
            {module.lessons.length} dars &middot; {completed} tugallandi
          </span>
        </span>
        <ChevronDownIcon
          className={`w-4.5 h-4.5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        className={`overflow-hidden transition-all duration-250 ${isOpen ? "max-h-150" : "max-h-0"}`}
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {module.lessons.map((l) => {
          const status = l.progress?.status ?? "not_started";
          const isDone = status === "completed";
          const isActive = l.id === currentLessonId;
          const isLocked = false; // enrolled students have access

          return (
            <li key={l.id}>
              <Link
                to={`/dashboard/lesson/${l.id}?course=${courseId}`}
                className={`flex items-center gap-3 px-5 py-3 text-sm border-t border-gray-100 transition-colors ${
                  isActive
                    ? "bg-blue-50 border-l-2 border-l-blue-600 pl-4.5 font-semibold text-blue-700"
                    : isLocked
                    ? "text-gray-400"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isDone ? (
                  <CheckIcon className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                ) : isActive ? (
                  <PlayTriangleIcon className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                ) : isLocked ? (
                  <LockIcon className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                ) : (
                  <span className="flex w-4.5 h-4.5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-500 shrink-0">
                    {l.order ?? ""}
                  </span>
                )}
                <span className="flex-1 min-w-0 truncate">{l.title}</span>
                {l.durationMinutes && (
                  <span className="text-xs text-gray-400 shrink-0">{l.durationMinutes} daq</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ── Main page ─────────────────────────────────────────── */

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = id || "";
  const search = new URLSearchParams(window.location.search);
  const courseIdFromQuery = search.get("course") || "";

  const enrollmentsQuery = useEnrollments();
  const firstCourseId =
    courseIdFromQuery ||
    enrollmentsQuery.data?.[0]?.course.id ||
    "";

  const enrollmentQuery = useEnrollment(firstCourseId);

  const detailFallbackQuery = useEnrollment(
    !enrollmentQuery.data || findLesson(enrollmentQuery.data, lessonId)
      ? ""
      : enrollmentsQuery.data?.find((e) => e.course.id !== firstCourseId)?.course.id || ""
  );

  const enrollment = useMemo(() => {
    if (enrollmentQuery.data && findLesson(enrollmentQuery.data, lessonId)) return enrollmentQuery.data;
    if (detailFallbackQuery.data && findLesson(detailFallbackQuery.data, lessonId)) return detailFallbackQuery.data;
    return enrollmentQuery.data || detailFallbackQuery.data || null;
  }, [enrollmentQuery.data, detailFallbackQuery.data, lessonId]);

  const progressMutation = useMarkLessonProgress(enrollment?.course.id || "");

  // Track which modules are open in sidebar
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  if (!id) return <Navigate to="/dashboard/courses" replace />;
  if (enrollmentsQuery.isLoading || enrollmentQuery.isLoading) return <GlobalSpinner />;

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Darsni topib bo'lmadi</h2>
          <Link to="/dashboard/courses" className="mt-4 inline-block text-sm font-medium text-blue-600">
            Kurslarim sahifasiga qaytish
          </Link>
        </div>
      </div>
    );
  }

  const found = findLesson(enrollment, lessonId);
  if (!found) {
    const otherCourseId = findEnrollmentForLesson(enrollmentsQuery.data ?? [], lessonId, {});
    if (otherCourseId) {
      return <Navigate to={`/dashboard/lesson/${lessonId}?course=${otherCourseId}`} replace />;
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Dars topilmadi</h2>
          <Link to={`/dashboard/courses/${enrollment.course.id}`} className="mt-4 inline-block text-sm font-medium text-blue-600">
            Kursga qaytish
          </Link>
        </div>
      </div>
    );
  }

  const { lesson, module, index, total, prev, next } = found;
  const isCompleted = lesson.progress?.status === "completed";

  const completedLessons = enrollment.modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.progress?.status === "completed").length;

  const markComplete = () => {
    progressMutation.mutate({ lessonId: lesson.id, status: "completed" });
  };

  // Auto-open the module containing the current lesson
  const getModuleOpen = (m: EnrollmentModuleDto) => {
    if (openModules[m.id] !== undefined) return openModules[m.id];
    return m.lessons.some((l) => l.id === lessonId);
  };

  const toggleModule = (moduleId: string) =>
    setOpenModules((prev) => ({ ...prev, [moduleId]: !getModuleOpen(enrollment.modules.find((m) => m.id === moduleId)!) }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── TOPBAR ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 bg-white px-5 border-b border-gray-200">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/dashboard/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4.5 h-4.5" />
            Kurslarim
          </Link>
          <h1 className="text-base font-bold text-gray-900 truncate max-w-[40ch] hidden md:block">
            {enrollment.course.name}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-700">{enrollment.progressPercent}%</span>
            <div className="h-2 w-30 overflow-hidden rounded-full bg-gray-200 hidden md:block">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${enrollment.progressPercent}%` }} />
            </div>
          </div>
          {/* Exit button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Chiqish</span>
          </Link>
        </div>
      </header>

      {/* ── BODY: main + sidebar ───────────────────────── */}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 p-6 items-start">

        {/* MAIN: player + content */}
        <main className="flex flex-col gap-5 min-w-0">

          {/* Video player */}
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
            {lesson.videoUrl ? (
              <video
                src={lesson.videoUrl}
                controls
                className="h-full w-full object-cover"
                poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
                  alt="Dars"
                  className="w-full h-full object-cover block opacity-70"
                />
                <button
                  type="button"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-19 w-19 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <PlayTriangleIcon className="w-7.5 h-7.5 ml-1" />
                </button>
                {lesson.durationMinutes && (
                  <span className="absolute right-3 bottom-3 rounded-sm bg-gray-900/80 px-2 py-0.5 text-xs font-semibold text-white">
                    {lesson.durationMinutes}:00
                  </span>
                )}
              </>
            )}
          </div>

          {/* Lesson head */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {module.title} &middot; {index + 1}-dars
            </span>
            <h2 className="font-manrope text-xl font-bold text-gray-900">{lesson.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {lesson.durationMinutes && (
                <span className="inline-flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  {lesson.durationMinutes} daqiqa
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <BookIcon className="w-4 h-4" />
                {index + 1} / {total} dars
              </span>
            </div>
          </div>

          {/* Navigation + mark complete actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: prev */}
            <div>
              {prev && (
                <Link
                  to={`/dashboard/lesson/${prev.id}?course=${enrollment.course.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  Oldingi dars
                </Link>
              )}
            </div>

            {/* Right: complete + next */}
            <div className="flex items-center gap-3">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <CheckIcon className="w-4 h-4" />
                  Tugallandi
                </span>
              ) : (
                <button
                  type="button"
                  onClick={markComplete}
                  disabled={progressMutation.isPending}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  <CheckIcon className="w-4 h-4" />
                  {progressMutation.isPending ? "Saqlanmoqda..." : "Tugatdim"}
                </button>
              )}
              {next && (
                <Link
                  to={`/dashboard/lesson/${next.id}?course=${enrollment.course.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Keyingi dars
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Lesson content (if any) */}
          {lesson.content && (
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </article>
          )}
        </main>

        {/* ── SIDEBAR: curriculum ──────────────────────── */}
        <aside className="sticky top-20 hidden lg:flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden max-h-[calc(100vh-100px)]">
          {/* Sidebar header */}
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900 mb-3">Kurs dasturi</h3>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>{completedLessons} / {total} dars tugallandi</span>
              <span className="font-bold text-blue-700">{enrollment.progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${enrollment.progressPercent}%` }} />
            </div>
          </div>

          {/* Scrollable module list */}
          <div className="overflow-y-auto">
            {enrollment.modules.map((m) => (
              <SidebarModule
                key={m.id}
                module={m}
                currentLessonId={lessonId}
                courseId={enrollment.course.id}
                isOpen={getModuleOpen(m)}
                onToggle={() => toggleModule(m.id)}
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LessonPage;
