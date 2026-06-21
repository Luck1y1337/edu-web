import { missionCards } from "../../data/about.data";

const AboutMission = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-600">
            Maqsad va orzu
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Missiya va vizyonimiz
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {missionCards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-10"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-xl text-3xl ${card.iconBg}`}
              >
                {card.icon}
              </span>
              <h3 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
                {card.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-500">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
