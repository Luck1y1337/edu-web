import SectionHeading from "../ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "../ui/Motion";
import { faqs } from "../../data/home.data";

const Faq = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            badge="Tez-tez beriladigan savollar"
            title="Sizni qiziqtirgan savollar"
            subtitle="Topa olmagan savolingiz bo'lsa, biz bilan bog'laning."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <StaggerItem key={faq.question}>
            <details
              key={faq.question}
              open={index === 0}
              className="group rounded-xl border border-gray-200 bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-x-4 px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                {faq.question}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500">
                {faq.answer}
              </p>
            </details>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Faq;
