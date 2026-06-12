import SectionHeading from "../ui/SectionHeading";
import { advantages } from "../../data/home.data";

const Advantages = () => {
  return (
    <section className="bg-gray-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Nima uchun biz"
          title="O'quv markazimizning afzalliklari"
          subtitle="Eng yaxshi natijaga erishish uchun barcha imkoniyatlarni sizga taqdim etamiz."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${item.color}`}
              >
                {item.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
