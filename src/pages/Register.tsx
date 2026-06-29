import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import type { RegisterForm } from "../types/register.type";
import { useRegister } from "../hooks/api/useRegister";
import { toast } from "react-toastify";

const features = [
  "Birinchi darslar bepul",
  "35+ ta yo'nalish — o'zingiznikini tanlang",
  "Ish ta'minoti — 100+ hamkor kompaniya",
];

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterForm>();
  const { mutateAsync, isSuccess, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: RegisterForm) => {
    mutateAsync({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Ro'yxatdan o'tish yakunlandi");
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Chap panel — brend */}
      <aside className="hidden flex-col justify-between bg-linear-to-br from-blue-600 to-violet-700 px-10 py-12 text-white lg:flex">
        <Link to="/" className="inline-flex items-center gap-3 self-start">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Icon.graduationCap />
          </span>
          <span className="font-manrope text-xl font-bold">O'quv Markaz</span>
        </Link>

        <div className="flex max-w-120 flex-col gap-5">
          <h1 className="font-manrope text-[40px] font-extrabold leading-tight">
            Bizning oilamizga qo'shiling.
          </h1>
          <p className="text-lg leading-relaxed text-white/85">
            Ro'yxatdan o'ting va bepul birinchi darsga taklif oling. 5000+
            talaba bilan birga o'rganing va karyera yo'lingizni boshlang.
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

        <main className="mx-auto flex w-full max-w-120 flex-1 flex-col justify-center">
          <h2 className="font-manrope text-[32px] font-bold tracking-tight text-gray-900">
            Yangi hisob yarating
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Ma'lumotlaringizni kiriting va bepul ro'yxatdan o'ting.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
            noValidate
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="firstName"
                placeholder="Aziz"
                form={form}
                type="text"
                label="Ism"
                required
                error={errors.firstName?.message}
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
                name="lastName"
                type="text"
                form={form}
                placeholder="Karimov"
                label="Familiya"
                required
                error={errors.lastName?.message}
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
              type={showPassword ? "text" : "password"}
              form={form}
              placeholder="Kamida 8 ta belgi"
              label="Parol"
              required
              error={errors.password?.message}
              leftIcon={<Icon.lock />}
              rules={{
                required: "Parol kiritilishi shart",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Kamida 1 ta katta harf va 1 ta raqam bo'lishi kerak",
                },
                minLength: {
                  value: 8,
                  message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
                },
                maxLength: {
                  value: 30,
                  message: "Parol 30 ta belgidan oshmasligi kerak",
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

            <label className="flex items-start gap-2.5 text-sm text-gray-600">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-200"
                {...form.register("terms", { required: true })}
              />
              <span>
                <a
                  href="/contact"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Foydalanish shartlari
                </a>{" "}
                va{" "}
                <a
                  href="/contact"
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
              disabled={isPending}
              loading={isPending}
              rightIcon={<Icon.arrowRight />}
              className="mt-2 cursor-pointer"
            >
              Ro'yxatdan o'tish
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            Hisobingiz bormi?
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Kirish
            </Link>
          </p>
        </main>
      </section>
    </div>
  );
};

export default Register;
