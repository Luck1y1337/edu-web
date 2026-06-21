import { useState } from "react";
import { Link } from "react-router-dom";
import type { TeacherDetailData } from "../../data/teacherDetail.data";
import { allCourses } from "../../data/courses.data";

interface Props {
  teacher: TeacherDetailData;
}

/* ── Haqida tab ── */
const AboutTab = ({ teacher }: Props) => (
  <div className="flex flex-col gap-5">
    <div>
      <h2 className="font-manrope mb-4 text-2xl font-bold tracking-tight text-gray-900">
        O'qituvchi haqida
      </h2>
      <div className="flex flex-col gap-3">
        {teacher.bio.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-gray-500">{p}</p>
        ))}
      </div>
    </div>

    {/* Skills */}
    <div>
      <h3 className="font-manrope mb-3 text-lg font-bold tracking-tight text-gray-900">
        Ko'nikmalar
      </h3>
      <div className="flex flex-wrap gap-2">
        {teacher.skills.map((skill) => (
          <span
            key={skill.name}
            className={`rounded px-2.5 py-1 text-xs font-medium ${
              skill.highlight
                ? "bg-blue-50 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>

    {/* Experience */}
    <div>
      <h3 className="font-manrope mb-4 text-lg font-bold tracking-tight text-gray-900">
        Ish tajribasi
      </h3>
      <ul className="flex flex-col gap-6">
        {teacher.experience.map((exp, i) => (
          <li key={i} className="flex gap-4">
            {/* Dot */}
            <div className="mt-1.5 flex flex-col items-center gap-1">
              <span
                className={`h-3 w-3 rounded-full ${exp.current ? "bg-blue-600" : "bg-gray-300"}`}
              />
              {i < teacher.experience.length - 1 && (
                <span className="h-full w-px bg-gray-200" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 pb-2">
              <p className="text-xs font-semibold text-blue-600">{exp.period}</p>
              <h4 className="font-manrope text-base font-semibold text-gray-900">{exp.role}</h4>
              <p className="text-sm font-medium text-gray-700">{exp.company}</p>
              <p className="mt-2 text-sm text-gray-500">{exp.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ── Kurslari tab ── */
const CoursesTab = ({ teacher }: Props) => {
  const teacherCourses = allCourses.filter((c) => c.teacher === teacher.name);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
        Kurslari ({teacherCourses.length})
      </h2>
      {teacherCourses.length === 0 ? (
        <p className="text-gray-400">Hozircha kurslar mavjud emas.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {teacherCourses.map((c) => (
            <Link
              key={c.id}
              to={`/courses/${c.slug}`}
              className="flex overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <img src={c.image} alt={c.title} className="h-24 w-32 shrink-0 object-cover" />
              <div className="flex flex-col justify-center gap-1 p-4">
                <span className={`text-xs font-semibold ${c.badgeText} ${c.badgeBg} w-fit rounded-full px-2 py-0.5`}>
                  {c.category}
                </span>
                <p className="font-manrope text-sm font-semibold text-gray-900">{c.title}</p>
                <p className="text-sm font-bold text-gray-900">{c.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Sharhlar tab ── */
const ReviewsTab = ({ teacher }: Props) => (
  <div className="flex flex-col gap-5">
    <h2 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
      Sharhlar ({teacher.reviewCount})
    </h2>
    <div className="flex flex-col gap-4">
      {[
        { name: "Bobur T.", text: "Akmal ustoz juda yaxshi tushuntiradi! Har bir mavzuni real misol bilan ko'rsatadi.", rating: 5, date: "12 iyun 2026" },
        { name: "Zilola A.", text: "Darslari juda qiziqarli va amaliy. Loyiha ustida ishlash ko'p narsa o'rgatdi.", rating: 5, date: "5 iyun 2026" },
        { name: "Rustam O.", text: "Savollarimga har doim javob beradi. Tavsiya qilaman!", rating: 4, date: "28 may 2026" },
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

/* ── Main TeacherTabs ── */
const TeacherTabs = ({ teacher }: Props) => {
  const [active, setActive] = useState(0);
  const tabs = [
    { label: "Haqida", panel: <AboutTab teacher={teacher} /> },
    { label: `Kurslari (${teacher.courses})`, panel: <CoursesTab teacher={teacher} /> },
    { label: `Sharhlar (${teacher.reviewCount})`, panel: <ReviewsTab teacher={teacher} /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Tab bar */}
      <div className="border-b border-gray-200">
        <ul className="flex gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <li key={tab.label}>
              <button
                onClick={() => setActive(i)}
                className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
                  active === i
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-6">{tabs[active].panel}</div>
    </div>
  );
};

export default TeacherTabs;
