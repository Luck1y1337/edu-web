import { Icon } from "../ui/Icon";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter } from "../ui/Motion";
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

function parseStatValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^([\d,.]+)\s*(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseFloat(match[1].replace(/,/g, "")), suffix: match[2] };
}

const Stats = ({ items }: Props) => {
  return (
    <FadeIn className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <StaggerContainer className="grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/80 lg:grid-cols-4">
        {items.map((stat) => {
          const StatIcon = getIconForStat(stat.color);
          const { num, suffix } = parseStatValue(stat.value);
          return (
            <StaggerItem key={stat.label}>
              <div className="flex items-center gap-x-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <StatIcon />
                </span>
                <div>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {num > 0 ? (
                      <AnimatedCounter value={num} suffix={suffix} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </FadeIn>
  );
};

export default Stats;
