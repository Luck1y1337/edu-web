import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import {
  useAdminStudent,
  useAdminStudentEnrollments,
  useAdminStudentPayments,
  useUpdateAdminStudent,
} from "../hooks/api/useAdminStudents";
import type { UpdateAdminStudentDto, AdminStudentStatus } from "../types/api.type";

type Tab = "info" | "courses" | "payments";

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const statusBadge = (status: string) => {
  if (status === "active") return "bg-emerald-50 text-emerald-700";
  if (status === "graduated" || status === "completed") return "bg-blue-50 text-blue-700";
  if (status === "cancelled" || status === "refunded") return "bg-red-50 text-red-600";
  if (status === "pending") return "bg-amber-50 text-amber-700";
  if (status === "paid") return "bg-emerald-50 text-emerald-700";
  return "bg-gray-100 text-gray-500";
};

const statusLabel: Record<string, string> = {
  active: "Faol",
  inactive: "Nofaol",
  graduated: "Bitirgan",
  completed: "Tugallangan",
  cancelled: "Bekor qilingan",
  pending: "Kutilmoqda",
  paid: "To'langan",
  refunded: "Qaytarilgan",
};

const paymentMethodLabel: Record<string, string> = {
  card: "Karta",
  click: "Click",
  payme: "Payme",
  cash: "Naqd",
};

const AdminStudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>("info");
  const [editing, setEditing] = useState(false);

  const studentQuery = useAdminStudent(id!);
  const enrollmentsQuery = useAdminStudentEnrollments(id!);
  const paymentsQuery = useAdminStudentPayments(id!);
  const updateStudent = useUpdateAdminStudent(id!);

  const student = studentQuery.data;

  const form = useForm<UpdateAdminStudentDto>();
  const { formState: { errors } } = form;

  const startEdit = () => {
    if (!student) return;
    form.reset({
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      middleName: student.user.middleName ?? "",
      email: student.user.email,
      phone: student.user.phone,
      birthDate: student.birthDate?.split("T")[0] ?? "",
      gender: student.gender ?? undefined,
      address: student.address ?? "",
      status: student.status,
    });
    setEditing(true);
  };

  const onSubmit = (values: UpdateAdminStudentDto) => {
    const body: UpdateAdminStudentDto = {
      ...(values.firstName ? { firstName: values.firstName } : {}),
      ...(values.lastName ? { lastName: values.lastName } : {}),
      ...(values.middleName ? { middleName: values.middleName } : {}),
      ...(values.email ? { email: values.email } : {}),
      ...(values.phone ? { phone: values.phone } : {}),
      ...(values.birthDate ? { birthDate: values.birthDate } : {}),
      ...(values.gender ? { gender: values.gender } : {}),
      ...(values.address ? { address: values.address } : {}),
      ...(values.status ? { status: values.status } : {}),
    };
    updateStudent.mutate(body, { onSuccess: () => setEditing(false) });
  };

  if (studentQuery.isLoading) return <GlobalSpinner />;

  if (studentQuery.isError || !student) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-600">Talaba topilmadi.</p>
        <Link to="/admin/students" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
          ← Ro'yxatga qaytish
        </Link>
      </div>
    );
  }

  const fullName = [student.user.firstName, student.user.lastName].filter(Boolean).join(" ");
  const initials = (student.user.firstName?.[0] ?? "") + (student.user.lastName?.[0] ?? "");

  const tabs: { key: Tab; label: string; icon: keyof typeof Icon }[] = [
    { key: "info", label: "Umumiy", icon: "user" },
    { key: "courses", label: "Kurslar", icon: "book" },
    { key: "payments", label: "To'lovlar", icon: "creditCard" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav>
        <ol className="flex items-center gap-1.5 text-sm">
          <li><Link to="/admin" className="text-gray-500 hover:text-blue-600">Dashboard</Link></li>
          <li className="text-gray-300">/</li>
          <li><Link to="/admin/students" className="text-gray-500 hover:text-blue-600">Talabalar</Link></li>
          <li className="text-gray-300">/</li>
          <li className="font-medium text-gray-900">{fullName}</li>
        </ol>
      </nav>

      {/* Profile header */}
      <header className="flex flex-wrap items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {student.user.avatarUrl ? (
          <img
            src={student.user.avatarUrl}
            alt={fullName}
            className="h-24 w-24 rounded-full border-4 border-blue-50 object-cover"
          />
        ) : (
          <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-50 bg-blue-100 text-2xl font-bold text-blue-700">
            {initials.toUpperCase()}
          </span>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="font-manrope text-2xl font-bold text-gray-900">{fullName}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Icon.mail />
              {student.user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon.phone />
              {student.user.phone}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(student.status)}`}>
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {statusLabel[student.status] || student.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!editing && (
            <button
              type="button"
              onClick={startEdit}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Tahrirlash
            </button>
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((t) => {
          const TabIcon = Icon[t.icon];
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => { setTab(t.key); setEditing(false); }}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
                tab === t.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <TabIcon />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === "info" && !editing && <InfoTab student={student} />}
      {tab === "info" && editing && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Shaxsiy ma'lumotlar</h3>
            </div>
            <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
              <Input name="firstName" form={form} label="Ism" placeholder="Ism" required error={errors.firstName?.message} rules={{ required: "Ism kiritilishi shart" }} />
              <Input name="lastName" form={form} label="Familiya" placeholder="Familiya" required error={errors.lastName?.message} rules={{ required: "Familiya kiritilishi shart" }} />
              <Input name="middleName" form={form} label="Otasining ismi" placeholder="Ixtiyoriy" />
              <Input name="birthDate" type="date" form={form} label="Tug'ilgan sana" placeholder="" />
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-gray-700">Jinsi</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" value="male" {...form.register("gender")} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Erkak</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" value="female" {...form.register("gender")} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Ayol</span>
                  </label>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Aloqa ma'lumotlari</h3>
            </div>
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <Input name="email" type="email" form={form} label="Email" placeholder="email@example.com" required error={errors.email?.message} rules={{ required: "Email kiritilishi shart" }} leftIcon={<Icon.mail />} />
              <Input name="phone" form={form} label="Telefon" placeholder="+998..." required error={errors.phone?.message} rules={{ required: "Telefon kiritilishi shart" }} leftIcon={<Icon.phone />} />
              <Input name="address" form={form} label="Manzil" placeholder="Manzil" leftIcon={<Icon.location />} />
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-gray-700">Holat</label>
                <select
                  {...form.register("status")}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                >
                  <option value="active">Aktiv</option>
                  <option value="inactive">Nofaol</option>
                  <option value="graduated">Bitirgan</option>
                </select>
              </div>
            </div>
          </article>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Bekor qilish
            </button>
            <Button type="submit" variant="primary" loading={updateStudent.isPending} rightIcon={<Icon.check />}>
              Saqlash
            </Button>
          </div>
        </form>
      )}

      {tab === "courses" && <CoursesTab query={enrollmentsQuery} />}
      {tab === "payments" && <PaymentsTab query={paymentsQuery} />}
    </div>
  );
};

/* ── Info tab (read-only) ── */

const InfoTab = ({ student }: { student: NonNullable<ReturnType<typeof useAdminStudent>["data"]> }) => {
  const details = [
    { label: "Ism", value: student.user.firstName },
    { label: "Familiya", value: student.user.lastName },
    { label: "Otasining ismi", value: student.user.middleName || "—" },
    { label: "Tug'ilgan sana", value: formatDate(student.birthDate) },
    { label: "Jinsi", value: student.gender === "male" ? "Erkak" : student.gender === "female" ? "Ayol" : "—" },
  ];

  const contact = [
    { label: "Email", value: student.user.email },
    { label: "Telefon", value: student.user.phone },
    { label: "Manzil", value: student.address || "—" },
  ];

  const study = [
    { label: "Holat", value: statusLabel[student.status] || student.status },
    { label: "Ro'yxatdan o'tgan", value: formatDate(student.enrolledAt || student.user.createdAt) },
    { label: "Kurslar soni", value: String(student.enrollmentsCount ?? student.enrollments?.length ?? 0) },
    { label: "Jami to'lov", value: student.totalPaid != null ? `${student.totalPaid.toLocaleString()} so'm` : "—" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DetailCard title="Shaxsiy ma'lumotlar" rows={details} />
      <DetailCard title="Aloqa ma'lumotlari" rows={contact} />
      <div className="lg:col-span-2">
        <DetailCard title="O'qish ma'lumotlari" rows={study} />
      </div>
    </div>
  );
};

const DetailCard = ({ title, rows }: { title: string; rows: { label: string; value: string }[] }) => (
  <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-100 px-6 py-4">
      <h3 className="font-manrope text-base font-bold text-gray-900">{title}</h3>
    </div>
    <dl className="divide-y divide-gray-100">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center px-6 py-3.5">
          <dt className="w-2/5 text-sm font-medium text-gray-500">{r.label}</dt>
          <dd className="flex-1 text-sm text-gray-900">{r.value}</dd>
        </div>
      ))}
    </dl>
  </article>
);

/* ── Courses tab ── */

const CoursesTab = ({ query }: { query: ReturnType<typeof useAdminStudentEnrollments> }) => {
  if (query.isLoading) return <GlobalSpinner />;
  if (query.isError) return <p className="py-12 text-center text-sm text-red-600">Kurslarni yuklab bo'lmadi.</p>;

  const items = query.data ?? [];
  if (items.length === 0) return <p className="py-12 text-center text-sm text-gray-500">Hozircha kurslar yo'q.</p>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-3">Kurs nomi</th>
              <th className="px-5 py-3">Holat</th>
              <th className="px-5 py-3">Progress</th>
              <th className="px-5 py-3">Ro'yxatdan o'tgan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-semibold text-gray-900">{e.course.name}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(e.status)}`}>
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                    {statusLabel[e.status] || e.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-gray-100">
                      <div
                        className={`h-2 rounded-full ${
                          e.progressPercent >= 100 ? "bg-emerald-500" : e.progressPercent >= 50 ? "bg-blue-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${Math.min(e.progressPercent, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{e.progressPercent}%</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600">{formatDate(e.enrolledAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ── Payments tab ── */

const PaymentsTab = ({ query }: { query: ReturnType<typeof useAdminStudentPayments> }) => {
  if (query.isLoading) return <GlobalSpinner />;
  if (query.isError) return <p className="py-12 text-center text-sm text-red-600">To'lovlarni yuklab bo'lmadi.</p>;

  const data = query.data;
  const items = data?.items ?? [];
  const totalPaid = data?.totalPaid ?? 0;

  if (items.length === 0) return <p className="py-12 text-center text-sm text-gray-500">Hozircha to'lovlar yo'q.</p>;

  return (
    <div className="space-y-4">
      {/* Payment stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Icon.creditCard />
          </span>
          <div>
            <p className="text-sm text-gray-500">Jami to'langan</p>
            <p className="text-lg font-bold text-gray-900">{totalPaid.toLocaleString()} so'm</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Icon.book />
          </span>
          <div>
            <p className="text-sm text-gray-500">Kurslar soni</p>
            <p className="text-lg font-bold text-gray-900">{items.length}</p>
          </div>
        </div>
      </div>

      {/* Payment table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-5 py-3">Kurs</th>
                <th className="px-5 py-3">Summa</th>
                <th className="px-5 py-3">Usul</th>
                <th className="px-5 py-3">Holat</th>
                <th className="px-5 py-3">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-semibold text-gray-900">{p.course?.name ?? "—"}</td>
                  <td className="px-5 py-4 text-gray-900">{p.amount.toLocaleString()} so'm</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {paymentMethodLabel[p.method] ?? p.method}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(p.status)}`}>
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                      {statusLabel[p.status] || p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{formatDate(p.paidAt || p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProfile;
