import { teamMembers } from "../../data/about.data";

const AboutTeam = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-600">
            Jamoamiz
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            Bizning xodimlar
          </h2>
          <p className="mt-3 max-w-xl text-base text-gray-500">
            Har bir kishi o'z sohasida tajriba va malakaga ega mutaxassis.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Photo */}
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = member.fallback;
                  }}
                />
              </div>
              {/* Info */}
              <div className="flex flex-col items-center gap-1 px-4 py-4 text-center">
                <h3 className="font-manrope text-sm font-bold tracking-tight text-gray-900">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
