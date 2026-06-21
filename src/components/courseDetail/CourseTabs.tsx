import { useState } from "react";
import type { CourseDetailData } from "../../data/courseDetail.data";

interface Props {
  course: CourseDetailData;
}



const CourseDescription = ({ course }: Props) => (
  <div className="flex flex-col gap-5">
    <div>
      <h2 className="font-manrope mb-3 text-2xl font-bold tracking-tight text-gray-900">
        Kurs haqida
      </h2>
      <p className="text-base leading-relaxed text-gray-700">
        JavaScript — zamonaviy web ilovalarining asosi. Bu kurs sizga hech qanday oldindan
        tajriba kerak emas — biz noldan boshlab to'liq fullstack JavaScript dasturchisigacha
        ko'taramiz.
      </p>
      <p className="mt-2 text-base leading-relaxed text-gray-700">
        Har bir mavzu nazariy darsdan keyin amaliy mashqlar bilan mustahkamlanadi. Kurs
        davomida 5 ta real biznes loyihasi ustida ishlaysiz — bular sizning portfolioda bo'ladi.
      </p>
    </div>

    {/* What you learn */}
    <div>
      <h3 className="font-manrope mb-4 text-xl font-bold tracking-tight text-gray-900">
        Nimalarni o'rganasiz?
      </h3>
      <div className="rounded-xl bg-gray-50 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {course.whatYouLearn.map((pair, i) =>
            pair.map((item, j) => (
              <div key={`${i}-${j}`} className="flex items-center gap-3 text-sm text-gray-700">
                <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    {/* For whom */}
    <div>
      <h3 className="font-manrope mb-3 text-xl font-bold tracking-tight text-gray-900">
        Kim uchun?
      </h3>
      <ul className="list-disc space-y-2 pl-6">
        {course.forWhom.map((item) => (
          <li key={item} className="text-base text-gray-800">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CourseCurriculum = ({ course }: Props) => (
  <div className="flex flex-col gap-4">
    <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">Dastur</h2>
    {course.curriculum.map((section, si) => (
      <details key={si} open={si === 0} className="group rounded-xl border border-gray-200 bg-white">
        <summary className="flex cursor-pointer items-center justify-between px-5 py-4">
          <span className="font-semibold text-gray-800">{section.title}</span>
          <span className="flex items-center gap-2 text-sm text-gray-400">
            {section.lessons.length} ta dars
            <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        <ul className="border-t border-gray-100">
          {section.lessons.map((lesson, li) => (
            <li key={li} className="flex items-center justify-between border-b border-gray-50 px-5 py-3 last:border-none">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {lesson.title}
              </div>
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </li>
          ))}
        </ul>
      </details>
    ))}
  </div>
);

const CourseTeacher = ({ course }: Props) => (
  <div className="flex flex-col gap-5">
    <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">O'qituvchi</h2>
    <div className="flex items-start gap-5 rounded-xl border border-gray-200 p-6">
      <img
        src={course.teacherAvatar}
        alt={course.teacher}
        className="h-20 w-20 shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="font-manrope text-lg font-bold text-gray-900">{course.teacher}</p>
        <p className="mb-3 text-sm text-blue-600">JavaScript Lead</p>
        <p className="text-sm leading-relaxed text-gray-600">{course.teacherBio}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {course.rating} reyting
          </span>
          <span>{course.studentCount} talaba</span>
          <span>{course.lessons} dars</span>
        </div>
      </div>
    </div>
  </div>
);

const CourseReviews = ({ course }: Props) => (
  <div className="flex flex-col gap-5">
    <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
      Sharhlar ({course.reviewCount})
    </h2>
    <div className="flex flex-col gap-4">
      {[
        { name: "Bobur T.", text: "Juda yaxshi kurs! Tushuntirishlar aniq va amaliy.", rating: 5, date: "15 iyun 2026" },
        { name: "Zilola A.", text: "O'qituvchi har bir mavzuni sabr bilan tushuntiryapti. Tavsiya qilaman!", rating: 5, date: "10 iyun 2026" },
        { name: "Rustam O.", text: "Loyihalar juda foydali. Real tajriba olish imkoni bor.", rating: 4, date: "2 iyun 2026" },
      ].map((rev) => (
        <div key={rev.name} className="rounded-xl border border-gray-100 p-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                {rev.name[0]}
              </span>
              <span className="font-semibold text-gray-800">{rev.name}</span>
            </div>
            <span className="text-xs text-gray-400">{rev.date}</span>
          </div>
          <div className="mb-2 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`h-4 w-4 ${i < rev.rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600">{rev.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const CourseTabs = ({ course }: Props) => {
  const [active, setActive] = useState(0);

  const panels = [
    <CourseDescription course={course} />,
    <CourseCurriculum course={course} />,
    <CourseTeacher course={course} />,
    <CourseReviews course={course} />,
  ];

  const tabLabels = ["Tavsif", `Dastur`, "O'qituvchi", `Sharhlar (${course.reviewCount})`];

  return (
    <div className="flex flex-col gap-0">
      {/* Tab bar */}
      <div className="border-b border-gray-200">
        <ul className="flex gap-1 overflow-x-auto">
          {tabLabels.map((tab, i) => (
            <li key={tab}>
              <button
                onClick={() => setActive(i)}
                className={`whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                  active === i
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab content */}
      <div className="pt-6">{panels[active]}</div>
    </div>
  );
};

export default CourseTabs;
