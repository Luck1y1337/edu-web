import { Link, useParams, Navigate } from "react-router-dom";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useEnrollment } from "../hooks/api/useEnrollments";
import type { EnrollmentLessonDto, EnrollmentModuleDto } from "../types/api.type";

const fallbackImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70";

const LessonRow = ({ lesson }: { lesson: EnrollmentLessonDto }) => {
  const status = lesson.progress?.status ?? "not_started";
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";

  return (
    <Link
      to={`/dashboard/lesson/${lesson.id}`}
      className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 transition-colors hover:border-blue-200 hover:bg-blue-50"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
          isCompleted
            ? "bg-emerald-100 text-emerald-700"
            : isInProgress
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {isCompleted ? "✓" : lesson.order ?? ""}
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
        {lesson.durationMinutes ? (
          <p className="text-xs text-gray-500">{lesson.durationMinutes} daqiqa</p>
        ) : null}
      </div>
      {isCompleted && <span className="text-xs font-medium text-emerald-600">Tugatildi</span>}
      {isInProgress && <span className="text-xs font-medium text-blue-600">Davom etmoqda</span>}
    </Link>
  );
};

const ModuleBlock = ({ module }: { module: EnrollmentModuleDto }) => {
  const completed = module.lessons.filter((l) => l.progress?.status === "completed").length;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-manrope text-lg font-bold text-gray-900">{module.title}</h3>
        <span className="text-xs text-gray-500">
          {completed} / {module.lessons.length} dars
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {module.lessons.map((lesson) => (
          <LessonRow key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

const CourseDetailStudent = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id || "";
  const enrollmentQuery = useEnrollment(courseId);

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

  const nextLesson = modules
    .flatMap((m) => m.lessons)
    .find((l) => (l.progress?.status ?? "not_started") !== "completed");

  return (
    <div className="space-y-6 pb-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/dashboard/courses" className="hover:text-gray-900 transition">
          Kurslarim
        </Link>
        <span>&rsaquo;</span>
        <span className="font-semibold text-gray-900">{course.name}</span>
      </nav>

      <article className="flex flex-col md:flex-row items-start gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="h-44 w-full md:w-72 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <img
            src={course.imageUrl || fallbackImage}
            alt={course.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col py-1">
          {course.category && (
            <span className="mb-3 inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {course.category}
            </span>
          )}
          <h2 className="mb-3 font-manrope text-3xl font-extrabold tracking-tight text-gray-900">
            {course.name}
          </h2>
          {course.description && (
            <p className="mb-4 text-sm text-gray-500 leading-relaxed">{course.description}</p>
          )}

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Kurs progressi</span>
              <span className="font-semibold text-blue-600">{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {nextLesson && (
            <Link
              to={`/dashboard/lesson/${nextLesson.id}`}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              ▶ Keyingi darsni boshlash
            </Link>
          )}
        </div>
      </article>

      <section className="flex flex-col gap-4">
        <h3 className="font-manrope text-lg font-bold text-gray-900">
          Modullar va darslar
        </h3>
        {modules.length === 0 ? (
          <p className="text-sm text-gray-500">Modullar hozircha qo'shilmagan.</p>
        ) : (
          modules.map((m) => <ModuleBlock key={m.id} module={m} />)
        )}
      </section>
    </div>
  );
};

export default CourseDetailStudent;
