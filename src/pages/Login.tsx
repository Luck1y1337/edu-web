import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import type { LoginForm } from "../types/login.type";
import { useLogin } from "../hooks/api/useLogin";
import { setItem } from "../utils/localstorage";
import { toast } from "react-toastify";

const features = [
  "Onlayn platforma — istalgan vaqtda darslar",
  "Mentor bilan to'g'ridan-to'g'ri aloqa",
  "Davlat tomonidan tan olingan sertifikat",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const form = useForm<LoginForm>();
  const { mutateAsync, isSuccess, data, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState("password");
  const {
    formState: { errors },
    watch,
  } = form;

  const emailValue = watch("identifier");
  const emailValid = emailPattern.test(emailValue ?? "");

  const onSubmit = (values: LoginForm) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (isSuccess) {
      const token: string = data?.data.data.tokens?.accessToken;
      setItem(token);
      toast.success("Tizimga muvaffaqiyatli kirdingiz");
      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 1500);
    }
  }, [isSuccess]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Chap panel */}
      <aside className="relative hidden w-1/2 flex-col justify-between bg-linear-to-br from-blue-600 via-blue-600 to-indigo-700 p-12 text-white lg:flex">
        <div className="flex items-center gap-x-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Icon.graduationCap />
          </span>
          <span className="text-lg font-semibold">O'quv Markaz</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Bilim — kelajakka eng yaxshi sarmoyadir.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-blue-100">
            5000+ bitiruvchi bizning oilamiz tarkibida. Endi navbat sizniki.
            Bilim olishni davom ettiring va karyera maqsadlaringizga yeting.
          </p>

          <ul className="mt-8 flex flex-col gap-y-4">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-x-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                  <Icon.check />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-sm text-blue-100">
          <span>© 2026 O'quv Markaz</span>
          <span>Yordam kerakmi?</span>
        </div>
      </aside>

      {/* O'ng panel */}
      <main className="flex w-full flex-col px-6 py-8 sm:px-12 lg:w-1/2">
        <div className="flex justify-end">
          <Link
            to="/"
            className="flex items-center gap-x-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-800"
          >
            <Icon.arrowLeft />
            Bosh sahifaga
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Hisobingizga kiring
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ma'lumotlaringizni kiriting va o'quv jarayonini davom ettiring.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-7 flex flex-col gap-y-4"
            noValidate
          >
            <Input
              name="identifier"
              type="email"
              form={form}
              placeholder="aziz@example.uz"
              label="Email yoki telefon raqam"
              required
              leftIcon={<Icon.mail />}
              error={errors.identifier?.message}
              success={
                emailValid ? "Email manzili to'g'ri formatda" : undefined
              }
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
              type={showPassword}
              form={form}
              placeholder="Parolingizni kiriting"
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
                  onClick={() =>
                    setShowPassword(
                      showPassword === "password" ? "text" : "password",
                    )
                  }
                >
                  {showPassword === "password" ? <Icon.eye /> : <Icon.eyeOff />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-x-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                />
                Meni eslab qol
              </label>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Parolni unutdingizmi?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isPending}
              rightIcon={<Icon.arrowRight />}
              className="mt-1 cursor-pointer"
            >
              Kirish
            </Button>
          </form>

          {/* Ajratuvchi */}
          <div className="my-6 flex items-center gap-x-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium tracking-widest text-slate-400">
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

          <p className="mt-6 text-center text-sm text-slate-500">
            Hisobingiz yo'qmi?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
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
