import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useCreateAdminStudent } from "../hooks/api/useAdminStudents";
import type { CreateAdminStudentDto } from "../types/api.type";

const ChevronRight = () => (
  <svg
    className="h-4 w-4 text-gray-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const AdminStudentNew = () => {
  const navigate = useNavigate();
  const form = useForm<CreateAdminStudentDto>();
  const { formState: { errors } } = form;
  const createStudent = useCreateAdminStudent();

  const onSubmit = (values: CreateAdminStudentDto) => {
    const body: CreateAdminStudentDto = {
      email: values.email,
      phone: values.phone,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      ...(values.middleName ? { middleName: values.middleName } : {}),
      ...(values.birthDate ? { birthDate: values.birthDate } : {}),
      ...(values.gender ? { gender: values.gender } : {}),
      ...(values.address ? { address: values.address } : {}),
      ...(values.status ? { status: values.status } : {}),
    };
    createStudent.mutate(body, {
      onSuccess: () => navigate("/admin/students"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li className="flex items-center">
            <Link to="/admin" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight />
            <Link to="/admin/students" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Talabalar
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight />
            <span className="text-sm text-gray-900 font-medium">Yangi talaba</span>
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <div>
        <h1 className="font-manrope text-2xl font-bold text-gray-900">
          Yangi talaba qo'shish
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Talabaning ma'lumotlarini to'liq kiriting
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

        {/* Card 2: Aloqa ma'lumotlari */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Aloqa ma'lumotlari
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
                name="address"
                form={form}
                label="Yashash manzili"
                placeholder="Shahar, tuman, ko'cha, uy raqami..."
                leftIcon={<Icon.location />}
              />
            </div>
          </div>
        </article>

        {/* Card 3: O'quv ma'lumotlari */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              O'quv ma'lumotlari
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">Holat</label>
                <select
                  {...form.register("status")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="active">Aktiv</option>
                  <option value="inactive">Nofaol</option>
                  <option value="graduated">Bitirgan</option>
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
            to="/admin/students"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Bekor qilish
          </Link>
          <Button
            type="submit"
            variant="primary"
            loading={createStudent.isPending}
            rightIcon={<Icon.check />}
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminStudentNew;
