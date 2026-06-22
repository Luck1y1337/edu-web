import { useState } from "react";
import { Link } from "react-router-dom";
import { allCourses } from "../data/courses.data";

const DashboardCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Barcha kategoriyalar");
  const [level, setLevel] = useState("barchasi");
  const [sort, setSort] = useState("mashhur");

  // Basic pagination state (UI only for now)
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ── */}
      <header className="flex flex-col gap-2">
        <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
          Kurslar katalogi
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          Yangi kurs tanlang va bir martalik to'lov bilan umrbod kirish oling.
        </p>
      </header>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Kurs nomi bo'yicha qidiring..."
            className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="Barcha kategoriyalar">Barcha kategoriyalar</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Dizayn">Dizayn</option>
          <option value="Mobil">Mobil</option>
          <option value="Data Science">Data Science</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="barchasi">Daraja: barchasi</option>
          <option value="boshlovchi">Boshlovchi</option>
          <option value="ortacha">O'rtacha</option>
          <option value="mutaxassis">Mutaxassis</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="mashhur">Saralash: mashhur</option>
          <option value="yangi">Eng yangi</option>
          <option value="arzon">Arzonroq</option>
          <option value="qimmat">Qimmatroq</option>
        </select>
      </div>

      {/* ── Course Grid ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCourses.slice(0, 9).map((course) => (
          <article
            key={course.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Image & Badge */}
            <div className="relative h-40 shrink-0 bg-gray-100">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <span className={`absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${course.badgeBg} ${course.badgeText}`}>
                {course.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <h4 className="font-manrope text-lg font-bold text-gray-900 line-clamp-1">
                {course.title}
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                {course.teacher} · {course.lessons}
              </p>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                <span className="text-xs text-gray-400">(312)</span>
              </div>

              {/* Prices */}
              <div className="mt-auto pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-gray-900">
                    {course.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    690 000
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                <Link
                  to={`/courses/${course.slug}`}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Batafsil
                </Link>
                <Link
                  to={`/courses/${course.slug}/buy`}
                  className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700 transition"
                >
                  Sotib olish
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">
          Ko'rsatilmoqda <span className="font-semibold text-gray-900">1-9</span> / 35 kurs
        </p>
        <div className="flex items-center gap-1">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCatalog;
