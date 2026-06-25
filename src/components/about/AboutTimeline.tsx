import { timeline } from "../../data/about.data";

const AboutTimeline = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-600">
            10 yil safarimiz
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Tarixiy bosqichlar
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200 sm:left-8" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, idx) => (
              <article key={item.year} className="relative flex items-start gap-5 pl-2">
                {/* Year badge on the line */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md sm:h-16 sm:w-16 sm:text-base">
                  {item.year}
                </div>

                {/* Card */}
                <div className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm">
                  <h3 className="font-manrope text-lg font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {item.text}
                  </p>
                </div>

                {/* Connector dot (only between items) */}
                {idx < timeline.length - 1 && (
                  <div className="absolute left-6 bottom-0 hidden h-0 w-0 sm:left-8" />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
