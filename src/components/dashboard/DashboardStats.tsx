interface StatItem {
  iconBg: string;
  iconColor: string;
  svgPath: React.ReactNode;
  value: string;
  label: string;
  trend?: string;
}

interface Props {
  items: StatItem[];
}

const DashboardStats = ({ items }: Props) => {
  return (
    <section className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {items.map((stat) => (
        <article
          key={stat.label}
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
            >
              <svg
                className="h-5.5 w-5.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {stat.svgPath}
              </svg>
            </span>
            {stat.trend && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                </svg>
                {stat.trend}
              </span>
            )}
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </article>
      ))}
    </section>
  );
};

export default DashboardStats;
