import { aboutStats } from "../../data/about.data";

const AboutStats = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-600">
            Natija
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Faxrimiz bo'lgan yutuqlar
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${stat.iconBg}`}
              >
                {stat.icon}
              </span>
              <div>
                <p className="font-manrope text-2xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-700">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-gray-400">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
