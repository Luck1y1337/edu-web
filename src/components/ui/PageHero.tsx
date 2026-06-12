import { Link } from "react-router-dom";

interface PageHeroProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
}

const PageHero = ({ breadcrumb, title, subtitle }: PageHeroProps) => {
  return (
    <section className="bg-linear-to-b from-blue-50/60 to-indigo-50/40">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <nav className="flex items-center justify-center gap-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Bosh sahifa
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-medium text-gray-900">{breadcrumb}</span>
        </nav>
        <h1 className="mt-5 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
