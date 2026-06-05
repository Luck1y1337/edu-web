import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";

interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const features = [
  "Birinchi darslar bepul",
  "35+ ta yo'nalish — o'zingiznikini tanlang",
  "Ish ta'minoti — 100+ hamkor kompaniya",
];

const Register = () => {
  const form = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: { phone: "+998" },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailValue = watch("email");
  const passwordValue = watch("password");

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
            onSubmit={handleSubmit(onSubmit)}
            className="mt-7 flex flex-col gap-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="firstname"
                label="Ism"
                placeholder="Aziz"
                form={form}
                required
                rules={{ required: "Ismni kiriting" }}
                error={errors.firstname?.message}
              />
              <Input
                name="lastname"
                label="Familiya"
                placeholder="Karimov"
                form={form}
                required
                rules={{ required: "Familiyani kiriting" }}
                error={errors.lastname?.message}
              />
            </div>

            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="aziz@example.uz"
              form={form}
              required
              leftIcon={<Icon.mail />}
              rules={{
                required: "Email kiriting",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email formati noto'g'ri",
                },
              }}
              error={errors.email?.message}
              success={
                emailValue && !errors.email
                  ? "Email mavjud va to'g'ri formatda"
                  : undefined
              }
            />

            <Input
              name="phone"
              type="tel"
              label="Telefon raqam"
              placeholder="+998"
              form={form}
              required
              leftIcon={<Icon.phone />}
              rules={{
                required: "Telefon raqam kiriting",
                pattern: {
                  value: /^\+998\d{9}$/,
                  message: "Telefon raqam to'liq emas — 9 raqam kiriting",
                },
              }}
              error={errors.phone?.message}
            />

            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="Parol"
              placeholder="Kamida 8 ta belgi"
              form={form}
              required
              leftIcon={<Icon.lock />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? <Icon.eyeOff /> : <Icon.eye />}
                </button>
              }
              rules={{
                required: "Parol kiriting",
                minLength: {
                  value: 8,
                  message: "Kamida 8 ta belgi bo'lishi kerak",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Katta harf va raqam bo'lishi kerak",
                },
              }}
              error={errors.password?.message}
              helper="Kamida 8 ta belgi, katta harf va raqam bo'lsin"
            />

            <Input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              label="Parolni tasdiqlang"
              placeholder="Parolni qaytadan kiriting"
              form={form}
              required
              leftIcon={<Icon.lock />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-slate-400 transition hover:text-slate-600"
                >
                  {showConfirm ? <Icon.eyeOff /> : <Icon.eye />}
                </button>
              }
              rules={{
                required: "Parolni tasdiqlang",
                validate: (value) =>
                  value === passwordValue || "Parollar mos kelmadi",
              }}
              error={errors.confirmPassword?.message}
            />

            <label className="flex items-start gap-x-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                {...register("terms", { required: true })}
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
              className="mt-1"
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
