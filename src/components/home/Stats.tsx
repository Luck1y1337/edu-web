import { stats } from "../../data/home.data";

const Stats = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/80 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-x-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${stat.color}`}
            >
              ◆
            </span>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
