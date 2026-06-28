import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import Breadcrumb from "../components/ui/Breadcrumb";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useAdminCourse, useUpdateAdminCourse } from "../hooks/api/useAdminCourses";
import type {
  UpdateCourseDto,
  AdminCourseStatus,
} from "../types/api.type";

const statusBadge = (status: string) => {
  if (status === "published") return "bg-emerald-50 text-emerald-700";
  if (status === "draft") return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-500";
};

const statusLabel: Record<string, string> = {
  published: "Chop etilgan",
  draft: "Qoralama",
  archived: "Arxivlangan",
};

const levelLabel: Record<string, string> = {
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  advanced: "Yuqori",
};

const formatPrice = (n?: number | null) =>
  n != null ? `${n.toLocaleString("uz-UZ")} so'm` : "—";

interface EditForm {
  name?: string;
  slug?: string;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  price?: string;
  oldPrice?: string;
  durationMonths?: string;
  status?: AdminCourseStatus;
  isFeatured?: boolean;
  description?: string;
  longDescription?: string;
}

const AdminCourseProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [editing, setEditing] = useState(false);

  const courseQuery = useAdminCourse(id!);
  const updateCourse = useUpdateAdminCourse(id!);

  const course = courseQuery.data;

  const form = useForm<EditForm>();
  const { formState: { errors } } = form;

  const startEdit = () => {
    if (!course) return;
    form.reset({
      name: course.name,
      slug: course.slug,
      category: course.category,
      level: course.level,
      price: String(course.price),
      oldPrice: course.oldPrice != null ? String(course.oldPrice) : "",
      durationMonths: String(course.durationMonths),
      status: course.status,
      isFeatured: course.isFeatured ?? false,
      description: course.description,
      longDescription: course.longDescription ?? "",
    });
    setEditing(true);
  };

  const onSubmit = (values: EditForm) => {
    const body: UpdateCourseDto = {
      ...(values.name ? { name: values.name } : {}),
      ...(values.slug ? { slug: values.slug } : {}),
      ...(values.category ? { category: values.category } : {}),
      ...(values.level ? { level: values.level } : {}),
      ...(values.price !== undefined && values.price !== ""
        ? { price: Number(values.price) }
        : {}),
      ...(values.oldPrice !== undefined && values.oldPrice !== ""
        ? { oldPrice: Number(values.oldPrice) }
        : {}),
      ...(values.durationMonths !== undefined && values.durationMonths !== ""
        ? { durationMonths: Number(values.durationMonths) }
        : {}),
      ...(values.status ? { status: values.status } : {}),
      isFeatured: Boolean(values.isFeatured),
      ...(values.description ? { description: values.description } : {}),
      ...(values.longDescription ? { longDescription: values.longDescription } : {}),
    };
    updateCourse.mutate(body, { onSuccess: () => setEditing(false) });
  };

  if (courseQuery.isLoading) return <GlobalSpinner />;

  if (courseQuery.isError || !course) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-600">Kurs topilmadi.</p>
        <Link
          to="/admin/courses"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Ro'yxatga qaytish
        </Link>
      </div>
    );
  }

  const instructorName = course.instructor
    ? [course.instructor.firstName, course.instructor.lastName].filter(Boolean).join(" ")
    : "—";
  const modules = course.modules ?? [];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/admin" },
          { label: "Kurslar", to: "/admin/courses" },
          { label: course.name },
        ]}
      />

      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        {course.imageUrl ? (
          <img src={course.imageUrl} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
        ) : (
          <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <Icon.book />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
              {course.name}
            </h1>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                course.status
              )}`}
            >
              {statusLabel[course.status] ?? course.status}
            </span>
            {course.isFeatured && (
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Tavsiya etilgan
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {course.category} · {levelLabel[course.level] ?? course.level} · {instructorName}
          </p>
        </div>
        {!editing && (
          <Button type="button" variant="primary" onClick={startEdit} rightIcon={<Icon.settings />}>
            Tahrirlash
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Narx</p>
          <p className="mt-1 font-manrope text-lg font-bold text-gray-900">{formatPrice(course.price)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Davomiyligi</p>
          <p className="mt-1 font-manrope text-lg font-bold text-gray-900">{course.durationMonths} oy</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Darslar</p>
          <p className="mt-1 font-manrope text-lg font-bold text-gray-900">{course.lessonsCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Talabalar</p>
          <p className="mt-1 font-manrope text-lg font-bold text-gray-900">{course.studentsCount ?? 0}</p>
        </div>
      </div>

      {editing ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h3 className="font-manrope text-lg font-bold text-gray-900">Kursni tahrirlash</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input name="name" form={form} label="Nomi" placeholder="JavaScript Fullstack" error={errors.name?.message} />
            <Input name="slug" form={form} label="Slug" placeholder="javascript-fullstack" error={errors.slug?.message} />
            <Input name="category" form={form} label="Kategoriya" placeholder="Dasturlash" />
            <Input name="price" type="number" form={form} label="Narx (so'm)" placeholder="1500000" />
            <Input name="oldPrice" type="number" form={form} label="Eski narx (so'm)" placeholder="2000000" />
            <Input name="durationMonths" type="number" form={form} label="Davomiyligi (oy)" placeholder="6" />
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="course-level" className="text-sm font-medium text-slate-700">Daraja</label>
              <select
                id="course-level"
                {...form.register("level")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="beginner">Boshlang'ich</option>
                <option value="intermediate">O'rta</option>
                <option value="advanced">Yuqori</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="course-status" className="text-sm font-medium text-slate-700">Holat</label>
              <select
                id="course-status"
                {...form.register("status")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="published">Chop etilgan</option>
                <option value="draft">Qoralama</option>
                <option value="archived">Arxivlangan</option>
              </select>
            </div>
            <label className="flex items-center gap-2 pt-7">
              <input
                type="checkbox"
                {...form.register("isFeatured")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Tavsiya etilgan</span>
            </label>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="course-description" className="text-sm font-medium text-slate-700">Qisqa tavsif</label>
            <textarea
              id="course-description"
              {...form.register("description")}
              rows={2}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="course-long" className="text-sm font-medium text-slate-700">To'liq tavsif</label>
            <textarea
              id="course-long"
              {...form.register("longDescription")}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
            <Button type="submit" variant="primary" loading={updateCourse.isPending} rightIcon={<Icon.check />}>
              Saqlash
            </Button>
          </div>
        </form>
      ) : (
        <>
          {/* Description */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope mb-3 text-lg font-bold text-gray-900">Tavsif</h3>
            <p className="text-sm leading-relaxed text-gray-600">{course.description}</p>
            {course.longDescription && (
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {course.longDescription}
              </p>
            )}
          </div>

          {/* Curriculum */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope mb-4 text-lg font-bold text-gray-900">
              Dastur ({modules.length} modul)
            </h3>
            {modules.length === 0 ? (
              <p className="text-sm text-gray-500">Modullar qo'shilmagan.</p>
            ) : (
              <div className="space-y-4">
                {modules
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((m, mi) => (
                    <div key={m.id} className="rounded-lg border border-gray-100">
                      <p className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-800">
                        Modul {mi + 1}: {m.title}
                      </p>
                      <ul className="divide-y divide-gray-50">
                        {(m.lessons ?? [])
                          .slice()
                          .sort((a, b) => a.order - b.order)
                          .map((l, li) => (
                            <li
                              key={l.id}
                              className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-700"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{String(li + 1).padStart(2, "0")}</span>
                                {l.title}
                                {l.isPreview && (
                                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                                    Preview
                                  </span>
                                )}
                              </span>
                              <span className="text-xs text-gray-400">{l.durationMinutes} min</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCourseProfile;
