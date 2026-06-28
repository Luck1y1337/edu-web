import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import Breadcrumb from "../components/ui/Breadcrumb";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import {
  useAdminInstructor,
  useUpdateAdminInstructor,
} from "../hooks/api/useAdminInstructors";
import type { UpdateInstructorDto, AdminInstructorStatus } from "../types/api.type";

const statusBadge = (status: string) =>
  status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500";

const statusLabel = (status: string) => (status === "active" ? "Faol" : "Nofaol");

interface EditForm {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  specialty?: string;
  experience?: string;
  bio?: string;
  status?: AdminInstructorStatus;
  socialLinks?: { github?: string; linkedin?: string; telegram?: string };
}

const AdminInstructorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [editing, setEditing] = useState(false);

  const instructorQuery = useAdminInstructor(id!);
  const updateInstructor = useUpdateAdminInstructor(id!);

  const instructor = instructorQuery.data;

  const form = useForm<EditForm>();
  const { formState: { errors } } = form;

  const startEdit = () => {
    if (!instructor) return;
    form.reset({
      firstName: instructor.user.firstName,
      lastName: instructor.user.lastName,
      middleName: instructor.user.middleName ?? "",
      email: instructor.user.email,
      phone: instructor.user.phone,
      specialty: instructor.specialty,
      experience: instructor.experience != null ? String(instructor.experience) : "",
      bio: instructor.bio ?? "",
      status: instructor.status,
      socialLinks: {
        github: instructor.socialLinks?.github ?? "",
        linkedin: instructor.socialLinks?.linkedin ?? "",
        telegram: instructor.socialLinks?.telegram ?? "",
      },
    });
    setEditing(true);
  };

  const onSubmit = (values: EditForm) => {
    const socialLinks = {
      ...(values.socialLinks?.github ? { github: values.socialLinks.github } : {}),
      ...(values.socialLinks?.linkedin ? { linkedin: values.socialLinks.linkedin } : {}),
      ...(values.socialLinks?.telegram ? { telegram: values.socialLinks.telegram } : {}),
    };
    const body: UpdateInstructorDto = {
      ...(values.firstName ? { firstName: values.firstName } : {}),
      ...(values.lastName ? { lastName: values.lastName } : {}),
      ...(values.middleName ? { middleName: values.middleName } : {}),
      ...(values.email ? { email: values.email } : {}),
      ...(values.phone ? { phone: values.phone } : {}),
      ...(values.specialty ? { specialty: values.specialty } : {}),
      ...(values.experience !== undefined && values.experience !== ""
        ? { experience: Number(values.experience) }
        : {}),
      ...(values.bio ? { bio: values.bio } : {}),
      ...(values.status ? { status: values.status } : {}),
      ...(Object.keys(socialLinks).length > 0 ? { socialLinks } : {}),
    };
    updateInstructor.mutate(body, { onSuccess: () => setEditing(false) });
  };

  if (instructorQuery.isLoading) return <GlobalSpinner />;

  if (instructorQuery.isError || !instructor) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-600">O'qituvchi topilmadi.</p>
        <Link
          to="/admin/instructors"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Ro'yxatga qaytish
        </Link>
      </div>
    );
  }

  const u = instructor.user;
  const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ");
  const initials = (u.firstName?.[0] ?? "") + (u.lastName?.[0] ?? "");
  const social = instructor.socialLinks ?? {};

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/admin" },
          { label: "O'qituvchilar", to: "/admin/instructors" },
          { label: fullName },
        ]}
      />

      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        {u.avatarUrl ? (
          <img src={u.avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
            {initials.toUpperCase() || "?"}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
              {fullName}
            </h1>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                instructor.status
              )}`}
            >
              {statusLabel(instructor.status)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {instructor.specialty}
            {instructor.experience != null ? ` · ${instructor.experience} yil tajriba` : ""}
          </p>
        </div>
        {!editing && (
          <Button type="button" variant="primary" onClick={startEdit} rightIcon={<Icon.settings />}>
            Tahrirlash
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Kurslar</p>
          <p className="mt-1 font-manrope text-2xl font-bold text-gray-900">
            {instructor.coursesCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Talabalar</p>
          <p className="mt-1 font-manrope text-2xl font-bold text-gray-900">
            {instructor.studentsCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Reyting</p>
          <p className="mt-1 font-manrope text-2xl font-bold text-gray-900">
            {instructor.rating != null && instructor.rating !== "" ? instructor.rating : "—"}
          </p>
        </div>
      </div>

      {/* Edit form OR info view */}
      {editing ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h3 className="font-manrope text-lg font-bold text-gray-900">Ma'lumotlarni tahrirlash</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input name="lastName" form={form} label="Familiya" placeholder="Karimov" error={errors.lastName?.message} />
            <Input name="firstName" form={form} label="Ism" placeholder="Aziz" error={errors.firstName?.message} />
            <Input name="middleName" form={form} label="Otasining ismi" placeholder="Sherzodovich" />
            <Input name="phone" form={form} label="Telefon" placeholder="+998 90 123 45 67" leftIcon={<Icon.phone />} />
            <Input
              name="email"
              type="email"
              form={form}
              label="Email"
              placeholder="ism@example.uz"
              leftIcon={<Icon.mail />}
              error={errors.email?.message}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email noto'g'ri formatda",
                },
              }}
            />
            <Input name="specialty" form={form} label="Mutaxassislik" placeholder="Frontend dasturlash" />
            <Input name="experience" type="number" form={form} label="Tajriba (yil)" placeholder="5" />
            <Input name="socialLinks.github" form={form} label="GitHub" placeholder="https://github.com/username" />
            <Input name="socialLinks.linkedin" form={form} label="LinkedIn" placeholder="https://linkedin.com/in/username" />
            <Input name="socialLinks.telegram" form={form} label="Telegram" placeholder="@username" />
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="instructor-status" className="text-sm font-medium text-slate-700">
                Holat
              </label>
              <select
                id="instructor-status"
                {...form.register("status")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="active">Aktiv</option>
                <option value="inactive">Nofaol</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="instructor-bio" className="text-sm font-medium text-slate-700">
              Bio
            </label>
            <textarea
              id="instructor-bio"
              {...form.register("bio")}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Bekor qilish
            </button>
            <Button type="submit" variant="primary" loading={updateInstructor.isPending} rightIcon={<Icon.check />}>
              Saqlash
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Contact + professional */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">Aloqa va kasbiy</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium text-gray-900">{u.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Telefon</dt>
                <dd className="font-medium text-gray-900">{u.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Mutaxassislik</dt>
                <dd className="font-medium text-gray-900">{instructor.specialty}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Tajriba</dt>
                <dd className="font-medium text-gray-900">
                  {instructor.experience != null ? `${instructor.experience} yil` : "—"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Bio + social */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">Bio va ijtimoiy</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {instructor.bio || "Bio kiritilmagan."}
            </p>
            {(social.github || social.linkedin || social.telegram) && (
              <ul className="mt-4 space-y-1.5 text-sm">
                {social.github && (
                  <li>
                    <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      GitHub
                    </a>
                  </li>
                )}
                {social.linkedin && (
                  <li>
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn
                    </a>
                  </li>
                )}
                {social.telegram && (
                  <li>
                    <a href={social.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Telegram
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInstructorProfile;
