import { Icon } from "../ui/Icon";

interface StatTile {
  icon: keyof typeof Icon;
  color: string;
  label: string;
  value: string;
}

interface Props {
  items: StatTile[];
}

const DashboardStats = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((stat) => {
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
