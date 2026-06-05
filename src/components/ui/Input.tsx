import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { Icon } from "./Icon";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  type?: string;
  label?: string;
  form: UseFormReturn<T>;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  placeholder: string;
  className?: string;
  required?: boolean;
  error?: string;
  success?: string;
  helper?: string;
  rules?: RegisterOptions<T, Path<T>>;
}

const Input = <T extends FieldValues>({
  name,
  type,
  placeholder,
  leftIcon,
  label,
  form,
  rightIcon,
  required,
  error,
  success,
  helper,
  rules,
  className = "",
}: InputProps<T>) => {
  const borderState = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : success
      ? "border-green-400 focus:border-green-500 focus:ring-green-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100";

  return (
    <div className="flex flex-col gap-y-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute top-[50%] text-slate-400 left-3.5 translate-y-[-50%]">
            {leftIcon}
          </span>
        )}
        <input
          id={name}
          type={type ?? "text"}
          placeholder={placeholder}
          className={`w-full py-3 rounded-xl border bg-white text-sm text-slate-900
            placeholder:text-slate-400 transition focus:ring-2 focus:outline-none
            disabled:cursor-not-allowed disabled:bg-slate-50 ${borderState}
            ${leftIcon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"} ${className}`}
          {...form.register(name, rules)}
        />
        {rightIcon && (
          <span className="absolute top-[50%] text-slate-400 right-3.5 translate-y-[-50%]">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-x-1.5 text-xs font-medium text-red-500">
          <Icon.alertCircle />
          {error}
        </p>
      )}
      {!error && success && (
        <p className="flex items-center gap-x-1.5 text-xs font-medium text-green-600">
          <Icon.checkCircle />
          {success}
        </p>
      )}
      {!error && !success && helper && (
        <p className="text-xs text-slate-400">{helper}</p>
      )}
    </div>
  );
};

export default Input;
