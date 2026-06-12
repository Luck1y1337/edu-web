type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  size?: LoaderSize;
  className?: string;
}

const sizes: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-[3px]",
};

const Loader = ({ size = "md", className = "" }: LoaderProps) => {
  return (
    <span
      role="status"
      aria-label="Yuklanmoqda"
      className={`inline-block shrink-0 animate-spin rounded-full
        border-current border-t-transparent ${sizes[size]} ${className}`}
    />
  );
};

export default Loader;
