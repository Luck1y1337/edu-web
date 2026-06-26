import { Icon } from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/Motion";
import type { Testimonial } from "../../types/home.type";

interface Props {
  items: Testimonial[];
}

const Testimonials = ({ items }: Props) => {
  if (!items.length) return null;

  return (
    <section className="bg-gray-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            badge="Sharhlar"
            title="Talabalarimiz fikri"
            subtitle="5000+ bitiruvchi o'z fikrini bildirdi. Mana, ulardan ba'zilari."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item, idx) => (
            <StaggerItem key={`${item.name}-${idx}`}>
            <figure
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Testimonials;
