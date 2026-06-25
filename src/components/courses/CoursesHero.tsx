import { Link } from "react-router-dom";

const CoursesHero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="transition-colors hover:text-gray-700">
                Bosh sahifa
              </Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="font-medium text-gray-900">Kurslar</span>
            </li>
          </ol>
        </nav>

        {/* Title + description */}
        <h1 className="font-manrope text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Barcha kurslarimiz
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
          35+ ta zamonaviy online yo'nalishdan o'zingizga mosini tanlang — barchasi
          video darslar. Boshlovchidan tortib mutaxassis darajasigacha.
        </p>
      </div>
    </section>
  );
};

export default CoursesHero;
