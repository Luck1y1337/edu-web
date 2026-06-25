import { Link } from "react-router-dom";

interface PageHeroProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
}

const PageHero = ({ breadcrumb, title, subtitle }: PageHeroProps) => {
  return (
    <section className="border-b border-gray-200 bg-linear-to-br from-blue-50 to-indigo-50 py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-360 px-4 text-center sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 inline-flex">
          <ol className="flex items-center gap-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-500 transition-colors hover:text-gray-700">
                Bosh sahifa
              </Link>
            </li>
            <li className="flex items-center gap-x-2" aria-current="page">
              <svg
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="font-medium text-gray-900">{breadcrumb}</span>
            </li>
          </ol>
        </nav>
        <h1 className="font-manrope text-3xl font-bold text-gray-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
