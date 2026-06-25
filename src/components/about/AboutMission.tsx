import { missionCards } from "../../data/about.data";

const iconMap: Record<string, React.ReactNode> = {
  mission: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  vision: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

const AboutMission = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-600">
            Maqsad va orzu
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Missiya va vizyonimiz
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {missionCards.map((card) => {
            const isAccent = card.id === "vision";
            return (
              <article
                key={card.id}
                className={`flex flex-col gap-5 rounded-xl border p-8 shadow-sm sm:p-10 ${
                  isAccent
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                    isAccent
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {iconMap[card.id] || card.icon}
                </span>
                <h3 className="font-manrope text-xl font-bold tracking-tight text-gray-900">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-500">
                  {card.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
