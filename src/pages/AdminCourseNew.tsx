import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useCreateAdminCourse } from "../hooks/api/useAdminCourses";
import { useAdminInstructors } from "../hooks/api/useAdminInstructors";
import type { CreateCourseDto, AdminCourseStatus } from "../types/api.type";

interface LessonField {
  title: string;
  durationMinutes: number;
  order: number;
}

interface ModuleField {
  title: string;
  order: number;
  lessons: LessonField[];
}

interface CourseFormValues {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  oldPrice?: number;
  durationMonths: number;
  instructorId?: string;
  isFeatured: boolean;
  status: AdminCourseStatus;
  modules: ModuleField[];
}

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

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

const AdminCourseNew = () => {
  const navigate = useNavigate();
  const form = useForm<CourseFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      longDescription: "",
      category: "frontend",
      level: "beginner",
      price: 0,
      durationMonths: 1,
      isFeatured: false,
      status: "draft",
      modules: [],
    },
  });
  const { formState: { errors }, watch, setValue } = form;
  const createCourse = useCreateAdminCourse();

  const instructorsQuery = useAdminInstructors({ limit: 100 });
  const instructors = instructorsQuery.data?.items ?? [];

  // Modules field array
  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  // Auto-generate slug from name
  const watchName = watch("name");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    setValue("slug", generateSlug(name));
  };

  const onSubmit = (values: CourseFormValues) => {
    // Count total lessons across modules
    const totalLessons = values.modules.reduce(
      (sum, mod) => sum + (mod.lessons?.length ?? 0),
      0
    );

    const body: CreateCourseDto = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      longDescription: values.longDescription,
      category: values.category,
      price: Number(values.price),
      durationMonths: Number(values.durationMonths),
      ...(values.level ? { level: values.level } : {}),
      ...(values.oldPrice ? { oldPrice: Number(values.oldPrice) } : {}),
      ...(totalLessons > 0 ? { lessonsCount: totalLessons } : {}),
      ...(values.instructorId ? { instructorId: values.instructorId } : {}),
      ...(values.isFeatured ? { isFeatured: values.isFeatured } : {}),
      ...(values.status ? { status: values.status } : {}),
      ...(values.modules.length > 0
        ? {
            modules: values.modules.map((mod) => ({
              title: mod.title,
              order: Number(mod.order),
              ...(mod.lessons.length > 0
                ? {
                    lessons: mod.lessons.map((les) => ({
                      title: les.title,
                      durationMinutes: Number(les.durationMinutes),
                      order: Number(les.order),
                    })),
                  }
                : {}),
            })),
          }
        : {}),
    };

    createCourse.mutate(body, {
      onSuccess: () => navigate("/admin/courses"),
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
            <Link to="/admin/courses" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Kurslar
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight />
            <span className="text-sm text-gray-900 font-medium">Yangi kurs</span>
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <div>
        <h1 className="font-manrope text-2xl font-bold text-gray-900">
          Yangi kurs qo'shish
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Kurs ma'lumotlarini to'liq kiriting
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-240 flex-col gap-5"
      >
        {/* Card 1: Asosiy ma'lumotlar */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Asosiy ma'lumotlar
            </h3>
            <p className="mt-0.5 text-[13px] text-gray-400">
              Kursning nomi, tavsifi va kategoriyasi
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Kurs nomi <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Masalan: React asoslari"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  {...form.register("name", { required: "Kurs nomi kiritilishi shart" })}
                  onChange={handleNameChange}
                />
                {errors.name && (
                  <p className="flex items-center gap-x-1.5 text-xs font-medium text-red-500">
                    <Icon.alertCircle />
                    {errors.name.message}
                  </p>
                )}
              </div>
              <Input
                name="slug"
                form={form}
                label="Slug"
                placeholder="react-asoslari"
                required
                error={errors.slug?.message}
                rules={{ required: "Slug kiritilishi shart" }}
              />
            </div>

            <div className="mt-4">
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Qisqa tavsif <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Kursning qisqacha tavsifi..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                  {...form.register("description", { required: "Tavsif kiritilishi shart" })}
                />
                {errors.description && (
                  <p className="flex items-center gap-x-1.5 text-xs font-medium text-red-500">
                    <Icon.alertCircle />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="longDescription" className="text-sm font-medium text-slate-700">
                  To'liq tavsif <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="longDescription"
                  placeholder="Kursning to'liq tavsifi, o'quv rejasi va maqsadlari..."
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                  {...form.register("longDescription", { required: "To'liq tavsif kiritilishi shart" })}
                />
                {errors.longDescription && (
                  <p className="flex items-center gap-x-1.5 text-xs font-medium text-red-500">
                    <Icon.alertCircle />
                    {errors.longDescription.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Kategoriya <span className="text-red-500">*</span>
                </label>
                <select
                  {...form.register("category", { required: "Kategoriya tanlanishi shart" })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="dizayn">Dizayn</option>
                  <option value="mobil">Mobil</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">Daraja</label>
                <select
                  {...form.register("level")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="beginner">Boshlang'ich</option>
                  <option value="intermediate">O'rta</option>
                  <option value="advanced">Yuqori</option>
                </select>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Narx va davomiylik */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Narx va davomiylik
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input
                name="price"
                type="number"
                form={form}
                label="Narx (so'm)"
                placeholder="500000"
                required
                error={errors.price?.message}
                rules={{
                  required: "Narx kiritilishi shart",
                  min: { value: 0, message: "Narx 0 dan kam bo'lmasligi kerak" },
                }}
              />
              <Input
                name="oldPrice"
                type="number"
                form={form}
                label="Eski narx (so'm)"
                placeholder="700000"
              />
              <Input
                name="durationMonths"
                type="number"
                form={form}
                label="Davomiyligi (oy)"
                placeholder="3"
                required
                error={errors.durationMonths?.message}
                rules={{
                  required: "Davomiylik kiritilishi shart",
                  min: { value: 1, message: "Kamida 1 oy" },
                }}
              />
            </div>
          </div>
        </article>

        {/* Card 3: Qo'shimcha */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">
              Qo'shimcha
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">O'qituvchi</label>
                <select
                  {...form.register("instructorId")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Tanlanmagan</option>
                  {instructors.map((ins) => (
                    <option key={ins.id} value={ins.id}>
                      {[ins.user.firstName, ins.user.lastName].filter(Boolean).join(" ")} — {ins.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm font-medium text-slate-700">Holat</label>
                <select
                  {...form.register("status")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="draft">Qoralama</option>
                  <option value="published">Nashr etilgan</option>
                  <option value="archived">Arxivlangan</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  {...form.register("isFeatured")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Tavsiya etilgan kurs (bosh sahifada ko'rsatiladi)
                </span>
              </label>
            </div>
          </div>
        </article>

        {/* Card 4: Kurs tuzilmasi (Modullar va darslar) */}
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-manrope text-lg font-bold text-gray-900">
                  Kurs tuzilmasi
                </h3>
                <p className="mt-0.5 text-[13px] text-gray-400">
                  Modullar va darslarni qo'shing
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  appendModule({
                    title: "",
                    order: moduleFields.length + 1,
                    lessons: [],
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
              >
                + Modul qo'shish
              </button>
            </div>
          </div>
          <div className="p-6">
            {moduleFields.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">
                Hali modullar qo'shilmagan. Yuqoridagi tugmani bosib modul qo'shing.
              </p>
            ) : (
              <div className="space-y-5">
                {moduleFields.map((moduleField, moduleIndex) => (
                  <ModuleCard
                    key={moduleField.id}
                    form={form}
                    moduleIndex={moduleIndex}
                    onRemove={() => removeModule(moduleIndex)}
                  />
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Form actions */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mr-auto text-sm text-gray-400">
            Barcha majburiy maydonlarni to'ldiring
          </p>
          <Link
            to="/admin/courses"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Bekor qilish
          </Link>
          <Button
            type="submit"
            variant="primary"
            loading={createCourse.isPending}
            rightIcon={<Icon.check />}
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

/* ─── Module Card sub-component ─── */

interface ModuleCardProps {
  form: ReturnType<typeof useForm<CourseFormValues>>;
  moduleIndex: number;
  onRemove: () => void;
}

const ModuleCard = ({ form, moduleIndex, onRemove }: ModuleCardProps) => {
  const { fields: lessonFields, append: appendLesson, remove: removeLesson } = useFieldArray({
    control: form.control,
    name: `modules.${moduleIndex}.lessons`,
  });

  const { formState: { errors } } = form;
  const moduleErrors = errors.modules?.[moduleIndex];

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50">
      {/* Module header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100 text-xs font-bold text-blue-700">
          {moduleIndex + 1}
        </span>
        <div className="flex flex-1 items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Modul nomi"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...form.register(`modules.${moduleIndex}.title`, { required: "Modul nomi kiritilishi shart" })}
            />
            {moduleErrors?.title && (
              <p className="mt-1 text-xs font-medium text-red-500">{moduleErrors.title.message}</p>
            )}
          </div>
          <div className="w-20">
            <input
              type="number"
              placeholder="Tartib"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...form.register(`modules.${moduleIndex}.order`, { valueAsNumber: true })}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Modulni o'chirish"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
          </svg>
        </button>
      </div>

      {/* Lessons inside module */}
      <div className="p-4">
        {lessonFields.length > 0 && (
          <div className="mb-3 space-y-2">
            {lessonFields.map((lessonField, lessonIndex) => {
              const lessonErrors = moduleErrors?.lessons?.[lessonIndex];
              return (
                <div
                  key={lessonField.id}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2"
                >
                  <span className="text-xs font-semibold text-gray-400 shrink-0">
                    {moduleIndex + 1}.{lessonIndex + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Dars nomi"
                      className="w-full border-0 bg-transparent px-1 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                      {...form.register(
                        `modules.${moduleIndex}.lessons.${lessonIndex}.title`,
                        { required: "Dars nomi kiritilishi shart" }
                      )}
                    />
                    {lessonErrors?.title && (
                      <p className="text-xs font-medium text-red-500">{lessonErrors.title.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="number"
                      placeholder="min"
                      className="w-16 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-center text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      {...form.register(
                        `modules.${moduleIndex}.lessons.${lessonIndex}.durationMinutes`,
                        { valueAsNumber: true, required: "Vaqt kiritilishi shart" }
                      )}
                    />
                    <span className="text-xs text-gray-400">min</span>
                  </div>
                  <div className="shrink-0">
                    <input
                      type="number"
                      placeholder="#"
                      className="w-14 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-center text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      {...form.register(
                        `modules.${moduleIndex}.lessons.${lessonIndex}.order`,
                        { valueAsNumber: true }
                      )}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLesson(lessonIndex)}
                    className="inline-flex items-center justify-center rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Darsni o'chirish"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            appendLesson({
              title: "",
              durationMinutes: 0,
              order: lessonFields.length + 1,
            })
          }
          className="inline-flex items-center gap-1 rounded-md border border-dashed border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + Dars qo'shish
        </button>
      </div>
    </div>
  );
};

export default AdminCourseNew;
