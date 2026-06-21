import { Link } from "react-router-dom";

const BlogHero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Bosh sahifa
          </Link>
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold text-gray-900">Blog</span>
        </nav>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-manrope text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Foydali maqolalar va yangiliklar
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            IT, dasturlash, dizayn va karyera bo'yicha eng dolzarb materiallar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
