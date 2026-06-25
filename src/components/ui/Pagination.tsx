interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  label?: string;
}

function buildPageRange(page: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [];
  const near = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
  let prev = 0;
  for (const p of Array.from(near).sort((a, b) => a - b)) {
    if (p < 1 || p > totalPages) continue;
    if (prev && p - prev > 1) pages.push("ellipsis");
    pages.push(p);
    prev = p;
  }
  return pages;
}

const Pagination = ({ page, totalPages, total, pageSize, onPageChange, label = "element" }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 dark:border-slate-700 pt-6">
      <p className="text-sm text-gray-500 dark:text-slate-400">
        Ko'rsatilmoqda{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{rangeStart}-{rangeEnd}</span>
        {" / "}
        <span className="font-semibold text-gray-900 dark:text-white">{total.toLocaleString("uz-UZ")}</span>
        {" "}{label}
      </p>
      <nav aria-label="Sahifa" className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Oldingi sahifa"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {buildPageRange(page, totalPages).map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`e-${idx}`} className="inline-flex h-9 w-9 items-center justify-center text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === p
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Keyingi sahifa"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
