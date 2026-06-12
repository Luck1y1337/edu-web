import { Icon } from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "../../data/home.data";

const Testimonials = () => {
  return (
    <section className="bg-gray-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sharhlar"
          title="Talabalarimiz fikri"
          subtitle="5000+ bitiruvchi o'z fikrini bildirdi. Mana, ulardan ba'zilari."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span className="text-4xl leading-none text-blue-200">"</span>
              <div className="mt-2 flex gap-x-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon.star key={i} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-gray-600">
                {item.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-3 border-t border-gray-100 pt-4">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-3">
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-700">
            <Icon.arrowLeft />
          </button>
          <span className="flex items-center gap-x-1.5">
            <span className="h-2 w-5 rounded-full bg-blue-600" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
          </span>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-700">
            <Icon.arrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
