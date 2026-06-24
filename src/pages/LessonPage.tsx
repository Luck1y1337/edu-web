import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollment, useEnrollments, useMarkLessonProgress } from "../hooks/api/useEnrollments";
import type {
  EnrollmentLessonDto,
  EnrollmentModuleDto,
  StudentEnrollmentDetailDto,
  StudentEnrollmentListItemDto,
} from "../types/api.type";

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

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = id || "";
  const search = new URLSearchParams(window.location.search);
  const courseIdFromQuery = search.get("course") || "";

  const enrollmentsQuery = useEnrollments();
  // If we have ?course=, use it directly; else iterate later
  const firstCourseId =
    courseIdFromQuery ||
    enrollmentsQuery.data?.[0]?.course.id ||
    "";

  const enrollmentQuery = useEnrollment(firstCourseId);

  // If the lesson isn't in the first enrollment, search other enrollments — we naively check
  // every course-id until found. Caches per-key so React Query dedupes.
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
    // Fallback: maybe the lesson belongs to another enrollment we haven't loaded; tell user.
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

  const markComplete = () => {
    progressMutation.mutate({ lessonId: lesson.id, status: "completed" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-5 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to={`/dashboard/courses/${enrollment.course.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900"
          >
            ← Kursga qaytish
          </Link>
          <div className="h-5 w-[1px] bg-gray-200" />
          <h1 className="font-manrope text-lg font-bold tracking-tight text-gray-900 line-clamp-1">
            {enrollment.course.name}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-700">{enrollment.progressPercent}%</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${enrollment.progressPercent}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 items-start gap-6 pt-24 pb-12 px-6">
        <div className="flex flex-1 flex-col gap-5">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-900 shadow-lg">
            {lesson.videoUrl ? (
              <video
                src={lesson.videoUrl}
                controls
                className="h-full w-full object-cover"
                poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
              />
            ) : (
              <div className="text-center text-white">
                <p className="text-lg font-semibold">Video hozircha mavjud emas</p>
                <p className="mt-1 text-sm text-gray-300">
                  Dars matnli formatda quyida keltirilgan.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {module.title} · Dars {index + 1} / {total}
            </span>
            <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
              {lesson.title}
            </h2>
            {lesson.durationMinutes && (
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>{lesson.durationMinutes} daqiqa</span>
              </div>
            )}
          </div>

          {lesson.content && (
            <article
              className="prose prose-gray max-w-none rounded-xl border border-gray-100 bg-white p-6"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex gap-2">
              {prev && (
                <Link
                  to={`/dashboard/lesson/${prev.id}?course=${enrollment.course.id}`}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  ← Oldingi
                </Link>
              )}
              {next && (
                <Link
                  to={`/dashboard/lesson/${next.id}?course=${enrollment.course.id}`}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Keyingi →
                </Link>
              )}
            </div>

            {isCompleted ? (
              <span className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                ✓ Dars tugatildi
              </span>
            ) : (
              <button
                type="button"
                onClick={markComplete}
                disabled={progressMutation.isPending}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {progressMutation.isPending ? "Saqlanmoqda..." : "Tugatildi deb belgilash"}
              </button>
            )}
          </div>
        </div>

        <aside className="hidden w-80 shrink-0 lg:block">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="mb-3 font-semibold text-gray-900">{module.title}</h3>
            <div className="flex flex-col gap-1.5">
              {module.lessons.map((l) => {
                const completed = l.progress?.status === "completed";
                const active = l.id === lesson.id;
                return (
                  <Link
                    key={l.id}
                    to={`/dashboard/lesson/${l.id}?course=${enrollment.course.id}`}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                        completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {completed ? "✓" : l.order ?? ""}
                    </span>
                    <span className="line-clamp-1">{l.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LessonPage;
