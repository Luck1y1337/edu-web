import { Link } from "react-router-dom";

const BlogHero = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
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
              <span className="font-medium text-gray-900">Blog</span>
            </li>
          </ol>
        </nav>

        <h1 className="font-manrope text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Foydali maqolalar va yangiliklar
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          IT, dasturlash, dizayn va karyera bo'yicha eng dolzarb materiallar.
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
