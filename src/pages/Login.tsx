import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import type { LoginForm } from "../types/login.type";
import { useLogin } from "../hooks/api/useLogin";

const features = [
  "Onlayn platforma — istalgan vaqtda darslar",
  "Mentor bilan to'g'ridan-to'g'ri aloqa",
  "Davlat tomonidan tan olingan sertifikat",
];

const Login = () => {
  const form = useForm<LoginForm>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { mutateAsync: loginMutation } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const {
    formState: { errors, touchedFields },
    watch,
  } = form;

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await loginMutation(data);
      if (response?.tokens?.accessToken) {
        localStorage.setItem("accessToken", response.tokens.accessToken);
        navigate("/");
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Tizimga kirishda xatolik yuz berdi",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const emailValue = watch("email");
  const isEmailValid = emailValue && emailValue.length > 3 && !errors.email;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Chap panel */}
      <aside className="relative hidden w-1/2 flex-col justify-between bg-[#4F46E5] px-16 py-12 text-white lg:flex">
        {/* Top: Logo */}
        <div className="flex items-center gap-x-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Icon.graduationCap />
          </span>
          <span className="text-xl font-bold tracking-tight">O'quv Markaz</span>
        </div>

        {/* Center: Content */}
        <div className="max-w-lg">
          <h1 className="text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            Bilim — kelajakka eng
            <br />
            yaxshi sarmoyadir.
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-indigo-100">
            5000+ bitiruvchi bizning oilamiz tarkibida. Endi navbat sizniki.
            Bilim olishni davom ettiring va karyera maqsadlaringizga yeting.
          </p>

          <ul className="mt-10 flex flex-col gap-y-5">
            {features.map((item) => (
              <li
                key={item}
                className="flex items-center gap-x-4 text-[15px] font-medium text-indigo-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                  <Icon.check />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: Footer */}
        <div className="flex items-center justify-between text-sm text-indigo-200">
          <span>© 2026 O'quv Markaz</span>
          <a href="#" className="hover:text-white transition-colors">
            Yordam kerakmi?
          </a>
        </div>
      </aside>

      {/* O'ng panel */}
      <main className="relative flex w-full flex-col px-6 py-8 sm:px-12 lg:w-1/2">
        {/* Top: Back Link */}
        <div className="flex justify-end pt-4 pr-4">
          <Link
            to="/"
            className="flex items-center gap-x-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <Icon.arrowLeft />
            Bosh sahifaga
          </Link>
        </div>

        {/* Center: Form */}
        <div className="mx-auto flex w-full max-w-105 flex-1 flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Hisobingizga kiring
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              Ma'lumotlaringizni kiriting va o'quv jarayonini davom ettiring.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
            noValidate
          >
            <Input
              name="email"
              type="text"
              form={form}
              placeholder="aziz@example.uz"
              label="Email yoki telefon raqam"
              required
              leftIcon={<Icon.mail />}
              error={errors.email?.message}
              success={
                isEmailValid && touchedFields.email
                  ? "Email manzili to'g'ri formatda"
                  : undefined
              }
              rules={{
                required: "Maydon bo'sh bo'lishi mumkin emas",
              }}
            />

            <div className="flex flex-col gap-y-3">
              <Input
                name="password"
                type={showPassword}
                form={form}
                placeholder="••••••••"
                label="Parol"
                required
                error={errors.password?.message}
                leftIcon={<Icon.passwordIcon />}
                rules={{
                  required: "Parol maydoni bo'sh bo'lishi mumkin emas",
                }}
                rightIcon={
                  <button
                    type="button"
                    className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() =>
                      setShowPassword(
                        showPassword === "password" ? "text" : "password",
                      )
                    }
                  >
                    {showPassword === "password" ? (
                      <Icon.eye />
                    ) : (
                      <Icon.eyeOff />
                    )}
                  </button>
                }
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-x-2.5 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                    {...form.register("rememberMe")}
                  />
                  <span className="font-medium">Meni eslab qol</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#4F46E5] hover:underline"
                >
                  Parolni unutdingizmi?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              rightIcon={!isLoading ? <Icon.arrowRight /> : undefined}
              className="mt-3 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] focus:ring-[#4338CA]"
            >
              {isLoading ? "Kutib turing..." : "Kirish"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-x-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold tracking-wider text-slate-400">
              YOKI
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="google" fullWidth leftIcon={<Icon.google />}>
              Google
            </Button>
            <Button variant="apple" fullWidth leftIcon={<Icon.apple />}>
              Apple
            </Button>
          </div>

          <p className="mt-10 text-center text-[15px] text-slate-500">
            Hisobingiz yo'qmi?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#4F46E5] hover:underline"
            >
              Ro'yxatdan o'ting
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
