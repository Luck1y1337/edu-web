interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle: string;
  align?: "center" | "left";
}

const SectionHeading = ({ badge, title, subtitle, align = "center" }: SectionHeadingProps) => {
  const alignClass = align === "center" ? "mx-auto max-w-2xl text-center" : "";

  return (
    <div className={alignClass}>
      <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600">
        {badge}
      </span>
      <h2 className="mt-4 font-manrope text-[32px] font-bold leading-tight tracking-tight text-gray-900 sm:text-[40px]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-gray-500 sm:text-lg">{subtitle}</p>
    </div>
  );
};

export default SectionHeading;
