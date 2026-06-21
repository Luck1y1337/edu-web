import { timeline } from "../../data/about.data";

const AboutTimeline = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-600">
            10 yil safarimiz
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Tarixiy bosqichlar
          </h2>
        </div>

        {/* Timeline */}
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {timeline.map((item) => (
            <article
              key={item.year}
              className="flex items-start gap-5"
            >
              {/* Year */}
              <span className="w-16 shrink-0 pt-1 text-right font-manrope text-3xl font-extrabold text-blue-600">
                {item.year}
              </span>

              {/* Card */}
              <div className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-5">
                <h3 className="font-manrope text-lg font-bold tracking-tight text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
