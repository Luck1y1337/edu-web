import { useState } from "react";
import type { CourseDetailData } from "../../data/courseDetail.data";

interface Props {
  course: CourseDetailData;
}

/* ── Tab: Tavsif (Description) ── */
const CourseDescription = ({ course }: Props) => (
  <div className="flex flex-col gap-6">
    <div>
      <h2 className="font-manrope mb-3 text-xl font-bold tracking-tight text-gray-900">
        Kurs haqida
      </h2>
      <p className="text-base leading-relaxed text-gray-700">
        {course.description}
      </p>
      {course.longDescription && (
        <p className="mt-3 text-base leading-relaxed text-gray-700">
          {course.longDescription}
        </p>
      )}
    </div>

    {/* What you learn grid */}
    {course.whatYouLearn.length > 0 && (
      <div>
        <h3 className="font-manrope mb-4 text-lg font-bold tracking-tight text-gray-900">
          Nimalarni o'rganasiz?
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {course.whatYouLearn.map((pair, i) =>
            pair.map((item, j) => (
              <div
                key={`${i}-${j}`}
                className="flex items-start gap-2.5 text-sm text-gray-700"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    )}

    {/* For whom */}
    <div>
      <h3 className="font-manrope mb-3 text-lg font-bold tracking-tight text-gray-900">
        Kim uchun?
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
        {course.forWhom.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

/* ── Tab: Dastur (Curriculum accordion) ── */
const CourseCurriculum = ({ course }: Props) => {
  const [openIndex, setOpenIndex] = useState(0);

  const totalLessons = course.curriculum.reduce(
    (sum, s) => sum + s.lessons.length,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-manrope text-xl font-bold tracking-tight text-gray-900">
        Kurs dasturi
      </h2>

      {/* Summary */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
          </svg>
          {course.curriculum.length} modul
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
          {totalLessons} ta video dars
        </span>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {course.curriculum.map((section, si) => {
          const isOpen = si === openIndex;
          return (
            <div
              key={si}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : si)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-gray-800">
                  Modul {si + 1}: {section.title}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <ul className="border-t border-gray-100">
                  {section.lessons.map((lesson, li) => (
                    <li
                      key={li}
                      className="flex items-center justify-between border-b border-gray-50 px-5 py-3 last:border-none"
                    >
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-semibold text-gray-500">
                          {String(li + 1).padStart(2, "0")}
                        </span>
                        {lesson.title}
                      </div>
                      <span className="text-xs text-gray-400">
                        {lesson.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Tab: O'qituvchi (Teacher) ── */
const CourseTeacher = ({ course }: Props) => (
  <div className="flex flex-col gap-5">
    <h2 className="font-manrope text-xl font-bold tracking-tight text-gray-900">
      O'qituvchi haqida
    </h2>
    <article className="flex flex-col items-start gap-5 sm:flex-row">
      <img
        src={course.teacherAvatar}
        alt={course.teacher}
        className="h-24 w-24 shrink-0 rounded-2xl object-cover"
      />
      <div>
        <h3 className="mb-3 font-manrope text-lg font-bold text-gray-900">
          {course.teacher}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600">{course.teacherBio}</p>
      </div>
    </article>
  </div>
);

/* ── Tab: Sharhlar (Reviews) ── */
const CourseReviews = ({ course }: Props) => {
  const reviews = [
    {
      name: "Bobur Tojiev",
      text: "Juda yaxshi kurs! Tushuntirishlar aniq va amaliy. Tavsiya qilaman.",
      rating: 5,
      date: "15-aprel, 2026",
      avatar: "https://i.pravatar.cc/80?img=44",
    },
    {
      name: "Zilola Ahmedova",
      text: "Loyihalar yordamida o'rganish juda samarali! Mentorlik xizmati ham foydali.",
      rating: 5,
      date: "8-aprel, 2026",
      avatar: "https://i.pravatar.cc/80?img=49",
    },
    {
      name: "Rustam Olimov",
      text: "Kurs juda yaxshi tashkillashtirilgan. Har bir mavzu amaliy misol bilan tushuntirildi.",
      rating: 5,
      date: "2-aprel, 2026",
      avatar: "https://i.pravatar.cc/80?img=58",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-manrope text-xl font-bold tracking-tight text-gray-900">
        Talabalar sharhlari
      </h2>

      {/* Summary */}
      <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
        <div className="text-center sm:text-left">
          <span className="font-manrope text-5xl font-extrabold text-gray-900">
            {course.rating}
          </span>
          <div className="mt-1 flex justify-center gap-0.5 sm:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="mt-1 text-sm text-gray-500">
            {course.reviewCount} sharh
          </span>
        </div>

        {/* Rating bars */}
        <div className="flex flex-1 flex-col gap-2">
          {[
            { stars: 5, pct: 85 },
            { stars: 4, pct: 10 },
            { stars: 3, pct: 3 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-16 text-right text-sm text-gray-500">
                {row.stars} yulduz
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="flex flex-col gap-4">
        {reviews.map((rev) => (
          <article
            key={rev.name}
            className="rounded-xl border border-gray-100 bg-white p-5"
          >
            <header className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {rev.name}
                  </div>
                  <div className="text-xs text-gray-400">{rev.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < rev.rating ? "text-amber-400" : "text-gray-200"
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </header>
            <p className="text-sm leading-relaxed text-gray-600">{rev.text}</p>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Yana sharhlarni ko'rish
        </button>
      </div>
    </div>
  );
};

/* ── Main Tabs Component ── */
const CourseTabs = ({ course }: Props) => {
  const [active, setActive] = useState(0);

  const panels = [
    <CourseDescription course={course} />,
    <CourseCurriculum course={course} />,
    <CourseTeacher course={course} />,
    <CourseReviews course={course} />,
  ];

  const tabLabels = [
    "Tavsif",
    "Dastur",
    "O'qituvchi",
    `Sharhlar (${course.reviewCount})`,
  ];

  return (
    <div className="flex flex-col">
      {/* Tab bar */}
      <div className="border-b border-gray-200">
        <ul className="flex gap-0 overflow-x-auto" role="tablist">
          {tabLabels.map((tab, i) => (
            <li key={tab}>
              <button
                role="tab"
                onClick={() => setActive(i)}
                className={`whitespace-nowrap border-b-2 px-5 py-3.5 text-sm font-medium transition-colors ${
                  active === i
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab panel */}
      <div className="pt-8" role="tabpanel">
        {panels[active]}
      </div>
    </div>
  );
};

export default CourseTabs;
