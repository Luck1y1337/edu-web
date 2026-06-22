import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { allCourses } from "../data/courses.data";

const CourseDetailStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tavsif");

  // We find the course by slug (which is mapped to 'id' parameter in our route probably)
  const course = allCourses.find((c) => c.slug === id) || allCourses[0];

  const learnings = [
    "JavaScript asoslari va sintaksisi",
    "ES6+: arrow, destructuring, spread",
    "DOM va sahifa bilan ishlash",
    "Asinxronlik va Promise",
    "Fetch API va REST",
    "Git va GitHub bilan ishlash",
  ];

  const features = [
    "28 ta video dars",
    "5 ta amaliy loyiha",
    "Umrbod kirish",
    "Tugatgach sertifikat",
    "Mentor bilan aloqa",
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/dashboard/catalog" className="hover:text-gray-900 transition">
          Katalog
        </Link>
        <span>&rsaquo;</span>
        <span className="font-semibold text-gray-900">{course.title}</span>
      </nav>

      {/* ── Hero Section ── */}
      <article className="flex flex-col md:flex-row items-start gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="h-44 w-full md:w-72 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col py-1">
          <span className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${course.badgeBg} ${course.badgeText}`}>
            {course.category}
          </span>
          <h2 className="mb-4 font-manrope text-3xl font-extrabold tracking-tight text-gray-900">
            {course.title}
          </h2>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{course.rating} <span className="text-gray-400">(312 sharh)</span></span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>540 talaba</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{course.lessons} · 40 soat</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>O'zbek tilida</span>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3">
            <img src={course.teacherAvatar} alt={course.teacher} className="h-8 w-8 rounded-full" />
            <span className="text-sm font-semibold text-gray-900">
              {course.teacher} <span className="text-gray-500 font-normal">— {course.category} Lead</span>
            </span>
          </div>
        </div>
      </article>

      {/* ── Main Content & Sidebar ── */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="flex-1 w-full">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("tavsif")}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "tavsif"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Tavsif
            </button>
            <button
              onClick={() => setActiveTab("dastur")}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "dastur"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Dastur
            </button>
            <button
              onClick={() => setActiveTab("oqituvchi")}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "oqituvchi"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              O'qituvchi
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "tavsif" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-manrope text-2xl font-bold tracking-tight text-gray-900">
                  Kurs haqida
                </h3>
                <p className="mb-8 leading-relaxed text-gray-500">
                  JavaScript — zamonaviy web ilovalarning asosi. Bu kurs noldan boshlab to'liq frontend dasturchisigacha olib boradi. Har bir mavzu amaliy mashqlar va real loyihalar bilan mustahkamlanadi.
                </p>

                <h4 className="mb-5 font-manrope text-xl font-semibold tracking-tight text-gray-900">
                  Nimalarni o'rganasiz?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learnings.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "dastur" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-500 text-center">
                Dastur mazmuni bu yerda bo'ladi...
              </div>
            )}
            
            {activeTab === "oqituvchi" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-500 text-center">
                O'qituvchi haqida ma'lumot...
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Price & Features) */}
        <aside className="w-full shrink-0 lg:w-[320px]">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-end gap-3">
              <span className="font-manrope text-3xl font-extrabold text-gray-900">
                490 000 <span className="text-2xl">so'm</span>
              </span>
              <span className="text-lg text-gray-400 line-through mb-1">
                690 000
              </span>
            </div>

            <ul className="mb-6 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate(`/courses/${course.slug}/buy`)}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              Sotib olish
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetailStudent;
