type ButtonVariant = "primary" | "google" | "apple";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
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
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-x-2 rounded-xl
        px-4 py-3 text-sm font-semibold transition focus:outline-none
        focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
