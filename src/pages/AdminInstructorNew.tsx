import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCreateAdminInstructor } from "../hooks/api/useAdminInstructors";
import type { CreateInstructorDto } from "../types/api.type";

const AdminInstructorNew = () => {
  const navigate = useNavigate();
  const form = useForm<CreateInstructorDto>();
  const { formState: { errors } } = form;
  const createInstructor = useCreateAdminInstructor();

  const onSubmit = (values: CreateInstructorDto) => {
    const socialLinks = {
      ...(values.socialLinks?.github ? { github: values.socialLinks.github } : {}),
      ...(values.socialLinks?.linkedin ? { linkedin: values.socialLinks.linkedin } : {}),
      ...(values.socialLinks?.telegram ? { telegram: values.socialLinks.telegram } : {}),
    };

    const body: CreateInstructorDto = {
      email: values.email,
      phone: values.phone,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      specialty: values.specialty,
      ...(values.middleName ? { middleName: values.middleName } : {}),
      ...(values.birthDate ? { birthDate: values.birthDate } : {}),
      ...(values.gender ? { gender: values.gender } : {}),
      ...(values.experience !== undefined && values.experience !== null ? { experience: Number(values.experience) } : {}),
      ...(values.bio ? { bio: values.bio } : {}),
      ...(Object.keys(socialLinks).length > 0 ? { socialLinks } : {}),
      ...(values.status ? { status: values.status } : {}),
    };
    createInstructor.mutate(body, {
      onSuccess: () => navigate("/admin/instructors"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "Dashboard", to: "/admin" },
        { label: "O'qituvchilar", to: "/admin/instructors" },
        { label: "Yangi o'qituvchi" },
      ]} />

      {/* Page header */}
      <div>
        <h1 className="font-manrope text-2xl font-bold text-gray-900">
          Yangi o'qituvchi qo'shish
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          O'qituvchining ma'lumotlarini to'liq kiriting
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-240 flex-col gap-5"
      >
        {/* Card 1: Shaxsiy ma'lumotlar */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Shaxsiy ma'lumotlar
            </h3>
            <p className="mt-0.5 text-[13px] text-gray-400">
              Asosiy ma'lumotlar — barcha maydonlar majburiy
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                name="lastName"
                form={form}
                label="Familiya"
                placeholder="Karimov"
                required
                error={errors.lastName?.message}
                rules={{ required: "Familiya kiritilishi shart" }}
              />
              <Input
                name="firstName"
                form={form}
                label="Ism"
                placeholder="Aziz"
                required
                error={errors.firstName?.message}
                rules={{ required: "Ism kiritilishi shart" }}
              />
              <Input
                name="middleName"
                form={form}
                label="Otasining ismi"
                placeholder="Sherzodovich"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="birthDate"
                type="date"
                form={form}
                label="Tug'ilgan sana"
                placeholder=""
              />
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">Jinsi</label>
                <div className="flex gap-5 py-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      value="male"
                      {...form.register("gender")}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Erkak</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      value="female"
                      {...form.register("gender")}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Ayol</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Aloqa va kasbiy */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Aloqa va kasbiy ma'lumotlar
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="phone"
                form={form}
                label="Telefon raqam"
                placeholder="+998 90 123 45 67"
                required
                leftIcon={<Icon.phone />}
                error={errors.phone?.message}
                rules={{ required: "Telefon raqami kiritilishi shart" }}
              />
              <Input
                name="email"
                type="email"
                form={form}
                label="Email"
                placeholder="ism@example.uz"
                required
                leftIcon={<Icon.mail />}
                error={errors.email?.message}
                rules={{
                  required: "Email kiritilishi shart",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email noto'g'ri formatda",
                  },
                }}
              />
              <Input
                name="password"
                type="password"
                form={form}
                label="Parol"
                placeholder="Kamida 6 ta belgi"
                required
                leftIcon={<Icon.lock />}
                error={errors.password?.message}
                rules={{
                  required: "Parol kiritilishi shart",
                  minLength: { value: 6, message: "Kamida 6 ta belgi" },
                }}
              />
              <Input
                name="specialty"
                form={form}
                label="Mutaxassislik"
                placeholder="Frontend dasturlash"
                required
                error={errors.specialty?.message}
                rules={{ required: "Mutaxassislik kiritilishi shart" }}
              />
              <Input
                name="experience"
                type="number"
                form={form}
                label="Tajriba (yil)"
                placeholder="5"
              />
              <div className="sm:col-span-2">
                <div className="flex flex-col gap-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Bio</label>
                  <textarea
                    {...form.register("bio")}
                    rows={3}
                    placeholder="O'qituvchi haqida qisqacha..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 3: Ijtimoiy tarmoqlar */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Ijtimoiy tarmoqlar va holat
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="socialLinks.github"
                form={form}
                label="GitHub"
                placeholder="https://github.com/username"
              />
              <Input
                name="socialLinks.linkedin"
                form={form}
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
              />
              <Input
                name="socialLinks.telegram"
                form={form}
                label="Telegram"
                placeholder="@username"
              />
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">Holat</label>
                <select
                  {...form.register("status")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="active">Aktiv</option>
                  <option value="inactive">Nofaol</option>
                </select>
              </div>
            </div>
          </div>
        </article>

        {/* Form actions */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mr-auto text-sm text-gray-400">
            Barcha majburiy maydonlarni to'ldiring
          </p>
          <Link
            to="/admin/instructors"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Bekor qilish
          </Link>
          <Button
            type="submit"
            variant="primary"
            loading={createInstructor.isPending}
            rightIcon={<Icon.check />}
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminInstructorNew;
