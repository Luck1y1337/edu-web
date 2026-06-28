import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import type { LoginForm } from "../types/login.type";
import { useLogin } from "../hooks/api/useLogin";
import { toast } from "react-toastify";
import useUserStore from "../store/user.store";

const features = [
  "Onlayn platforma — istalgan vaqtda darslar",
  "Mentor bilan to'g'ridan-to'g'ri aloqa",
  "Davlat tomonidan tan olingan sertifikat",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<LoginForm>();
  const { mutateAsync, isSuccess, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    () => localStorage.getItem("rememberMe") === "true"
  );
  const {
    formState: { errors },
    watch,
  } = form;

  const emailValue = watch("identifier");
  const emailValid = emailPattern.test(emailValue ?? "");

  const user = useUserStore((s) => s.user);
  const nextParam = new URLSearchParams(location.search).get("next");

  const onSubmit = (values: LoginForm) => {
    mutateAsync({ identifier: values.identifier, password: values.password });
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
    toast.success("Tizimga muvaffaqiyatli kirdingiz");
    const fallback =
      user?.role === "admin" || user?.role === "super_admin" ? "/admin" : "/dashboard";
    const isSafePath = nextParam && /^\/[a-zA-Z0-9]/.test(nextParam);
    const target = isSafePath ? nextParam : fallback;
    navigate(target, { replace: true });
  }, [isSuccess, navigate, nextParam, user, rememberMe]);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Chap panel — brend */}
      <aside className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 to-violet-700 px-10 py-12 text-white lg:flex">
        <Link to="/" className="inline-flex items-center gap-3 self-start">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Icon.graduationCap />
          </span>
          <span className="font-manrope text-xl font-bold">O'quv Markaz</span>
        </Link>

        <div className="flex max-w-[480px] flex-col gap-5">
          <h1 className="font-manrope text-[40px] font-extrabold leading-tight">
            Bilim — kelajakka eng yaxshi sarmoyadir.
          </h1>
          <p className="text-lg leading-relaxed text-white/85">
            5000+ bitiruvchi bizning oilamiz tarkibida. Endi navbat sizniki.
            Bilim olishni davom ettiring va karyera maqsadlaringizga yeting.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/90">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon.check />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-sm text-white/70">
          <span>© 2026 O'quv Markaz</span>
          <Link to="/contact" className="font-medium text-white/90 transition-colors hover:text-white">
            Yordam kerakmi?
          </Link>
        </div>
      </aside>

      {/* O'ng panel — forma */}
      <section className="flex flex-col overflow-y-auto px-6 py-8 sm:px-10 lg:px-10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link to="/" className="inline-flex items-center gap-3 lg:hidden">
            <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#2563EB" />
              <path d="M10 13L18 8L26 13L18 18L10 13Z" fill="white" />
              <path d="M13 16V21C13 21 15.5 23 18 23C20.5 23 23 21 23 21V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-manrope text-lg font-bold text-gray-900">O'quv Markaz</span>
          </Link>
          <Link
            to="/"
            className="ml-auto flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
          >
            <Icon.arrowLeft />
            Bosh sahifaga
          </Link>
        </div>

        <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center">
          <h2 className="font-manrope text-[32px] font-bold tracking-tight text-gray-900">
            Hisobingizga kiring
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Ma'lumotlaringizni kiriting va o'quv jarayonini davom ettiring.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
            noValidate
          >
            <Input
              name="identifier"
              type="email"
              form={form}
              placeholder="ism@example.uz"
              label="Email yoki telefon raqam"
              required
              leftIcon={<Icon.mail />}
              error={errors.identifier?.message}
              success={emailValid ? "Email manzili to'g'ri formatda" : undefined}
              rules={{
                required: "Email kiritilishi shart",
                pattern: {
                  value: emailPattern,
                  message: "Email manzil noto'g'ri kiritilgan",
                },
              }}
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              form={form}
              placeholder="••••••••"
              label="Parol"
              required
              leftIcon={<Icon.lock />}
              error={errors.password?.message}
              rules={{
                required: "Parol maydoni bo'sh bo'lishi mumkin emas",
                minLength: {
                  value: 6,
                  message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
                },
              }}
              rightIcon={
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Icon.eyeOff /> : <Icon.eye />}
                </button>
              }
            />

            <div className="my-1 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-200"
                />
                Meni eslab qol
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Parolni unutdingizmi?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isPending}
              loading={isPending}
              rightIcon={<Icon.arrowRight />}
              className="mt-2 cursor-pointer"
            >
              Kirish
            </Button>
          </form>

          {/* Ajratuvchi */}
          <div className="my-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
              Yoki
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              <Icon.google />
              Google
            </button>
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center justify-center gap-3 rounded-lg border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-black"
            >
              <Icon.apple />
              Apple
            </button>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            Hisobingiz yo'qmi?
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Ro'yxatdan o'ting
            </Link>
          </p>
        </main>
      </section>
    </div>
  );
};

export default Login;
