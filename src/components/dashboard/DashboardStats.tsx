import { Icon } from "../ui/Icon";
import { dashboardStats } from "../../data/dashboard.data";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {dashboardStats.map((stat) => {
        const IconComponent = Icon[stat.icon];
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
              >
                <IconComponent />
              </span>
              {stat.trend && (
                <span className="inline-flex items-center gap-x-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  <Icon.trendingUp />
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
