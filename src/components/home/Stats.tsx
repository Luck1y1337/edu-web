import { Icon } from "../ui/Icon";
import type { Stat } from "../../types/home.type";

interface Props {
  items: Stat[];
}

const colorIconMap: Record<string, () => React.JSX.Element> = {
  blue: Icon.graduationCap,
  purple: Icon.book,
  emerald: Icon.user,
  orange: Icon.award,
};

function getIconForStat(color: string) {
  for (const key of Object.keys(colorIconMap)) {
    if (color.includes(key)) {
      return colorIconMap[key];
    }
  }
  return Icon.graduationCap;
}

const Stats = ({ items }: Props) => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/80 lg:grid-cols-4">
        {items.map((stat) => {
          const StatIcon = getIconForStat(stat.color);
          return (
            <div key={stat.label} className="flex items-center gap-x-4">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
              >
                <StatIcon />
              </span>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
