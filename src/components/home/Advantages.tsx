import SectionHeading from "../ui/SectionHeading";
import { advantages } from "../../data/home.data";
import { Icon } from "../ui/Icon";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/Motion";

const iconMap: Record<string, () => React.JSX.Element> = {
  "✓": Icon.checkSquare,
  "▦": Icon.book,
  "✆": Icon.phone,
  "🏅": Icon.award,
  "💻": Icon.settings,
  "💼": Icon.barChart,
};

const Advantages = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            badge="Nima uchun biz"
            title="O'quv markazimizning afzalliklari"
            subtitle="Eng yaxshi natijaga erishish uchun barcha imkoniyatlarni sizga taqdim etamiz."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <StaggerItem key={item.title}>
              <div
                className="rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  {IconComponent ? <IconComponent /> : item.icon}
                </span>
                <h3 className="mt-4 font-manrope text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Advantages;
