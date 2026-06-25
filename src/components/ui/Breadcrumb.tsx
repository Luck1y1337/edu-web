import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const ChevronRight = () => (
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
);

const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-1.5">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight />}
            {isLast || !item.to ? (
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</span>
            ) : (
              <Link to={item.to} className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
