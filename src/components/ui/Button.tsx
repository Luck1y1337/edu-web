type ButtonVariant = "primary" | "google" | "apple";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  fullWidth?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100",
  google:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-100",
  apple: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-200",
};

const Button = ({
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  fullWidth,
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-x-2 rounded-xl
        px-4 py-3 text-sm font-semibold transition focus:outline-none
        focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
