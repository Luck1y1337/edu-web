import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import type { RegisterForm } from "../types/register.type";

const features = [
  "Birinchi darslar bepul",
  "35+ ta yo'nalish — o'zingiznikini tanlang",
  "Ish ta'minoti — 100+ hamkor kompaniya",
];

const Register = () => {
  const form = useForm<RegisterForm>();
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirm, setShowConfirm] = useState("password");
  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };

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
            Bizning oilamizga qo'shiling.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-blue-100">
            Ro'yxatdan o'ting va bepul birinchi darsga taklif oling. 5000+
            talaba bilan birga o'rgning va karyera yo'lingizni boshlang.
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
            Yangi hisob yarating
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ma'lumotlaringizni kiriting va bepul ro'yxatdan o'ting.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-7 flex flex-col gap-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="firstname"
                placeholder="Aziz"
                form={form}
                type="text"
                label="Ism"
                required
                error={errors.firstname?.message}
                rules={{
                  required: "Ism kiritilishi shart",
                  minLength: {
                    value: 3,
                    message: "Ism kamida 2 ta harfdan iborat bo'lishi kerak",
                  },
                  maxLength: {
                    value: 30,
                    message: "Ism 30 ta harfdan oshmasligi kerak",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÿʼ'\s]+$/,
                    message: "Ism faqat harflardan iborat bo'lishi kerak",
                  },
                }}
              />
              <Input
                name="lastname"
                type="text"
                form={form}
                placeholder="Karimov"
                label="Familiya"
                required
                error={errors.lastname?.message}
                rules={{
                  required: "Familiya kiritilishi shart",
                  minLength: {
                    value: 3,
                    message:
                      "Familiya kamida 3 ta harfdan iborat bo'lishi kerak",
                  },
                  maxLength: {
                    value: 30,
                    message: "Familiya 30 ta harfdan oshmasligi kerak",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÿʼ'\s]+$/,
                    message: "Familiya faqat harflardan iborat bo'lishi kerak",
                  },
                }}
              />
            </div>
            <Input
              name="email"
              type="email"
              form={form}
              placeholder="aziz@example.com"
              label="Email"
              required
              leftIcon={<Icon.mail />}
              error={errors.email?.message}
              rules={{
                required: "Email kiritilishi shart",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email manzil noto'g'ri kiritilgan",
                },
              }}
            />
            <Input
              name="phone"
              type="tel"
              form={form}
              placeholder="+998 90 123 45 67"
              label="Telefon raqam"
              required
              leftIcon={<Icon.phone />}
              error={errors.phone?.message}
              rules={{
                required: "Telefon raqam kiritilishi shart",
                pattern: {
                  value: /^\+?998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
                  message: "Telefon raqam +998 XX XXX XX XX formatida bo'lsin",
                },
              }}
            />
            <Input
              name="password"
              type={showPassword}
              form={form}
              placeholder="Kamida 8 ta belgi"
              label="Parol"
              required
              error={errors.password?.message}
              leftIcon={<Icon.passwordIcon />}
              rules={{
                required: "Parol kiritilishi shart",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Parol mos emas",
                },
                minLength: {
                  value: 6,
                  message: "Password kamida 3 ta harfdan iborat bo'lishi kerak",
                },
                maxLength: {
                  value: 30,
                  message: "Password 30 ta harfdan oshmasligi kerak",
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
            <Input
              name="confirmPassword"
              type={showConfirm}
              form={form}
              placeholder="Kamida 8 ta belgi"
              label="Paroldi tasdiqlang"
              required
              error={errors.confirmPassword?.message}
              rules={{
                required: "Parolni tasdiqlang",
                validate: (value) =>
                  value === form.watch("password") || "Parollar mos kelmadi",
              }}
              leftIcon={<Icon.passwordIcon />}
              rightIcon={
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() =>
                    setShowConfirm(
                      showConfirm === "password" ? "text" : "password",
                    )
                  }
                >
                  {showConfirm === "password" ? <Icon.eye /> : <Icon.eyeOff />}
                </button>
              }
            />
            <label className="flex items-start gap-x-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                {...form.register("terms", { required: true })}
              />
              <span>
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Foydalanish shartlari
                </a>{" "}
                va{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Maxfiylik siyosati
                </a>
                ga roziman
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              rightIcon={<Icon.arrowRight />}
              className="mt-1 cursor-pointer"
            >
              Ro'yxatdan o'tish
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
            Hisobingiz bormi?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Kirish
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
