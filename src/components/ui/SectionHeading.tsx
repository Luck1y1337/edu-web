interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle: string;
}

const SectionHeading = ({ badge, title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
        {badge}
      </span>
      <h2 className="mt-3 text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-3 text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeading;
