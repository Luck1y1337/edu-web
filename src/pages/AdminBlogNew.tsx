import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useCreateBlogPost } from "../hooks/api/useAdminBlog";
import { useBlogCategories } from "../hooks/api/useBlog";
import type { CreateBlogPostDto } from "../types/api.type";

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  categoryId?: string;
  readMinutes?: string;
  isFeatured?: boolean;
  status?: "draft" | "published";
}

const AdminBlogNew = () => {
  const navigate = useNavigate();
  const form = useForm<BlogForm>({ defaultValues: { status: "draft" } });
  const { formState: { errors } } = form;
  const createPost = useCreateBlogPost();
  const categoriesQuery = useBlogCategories();
  const categories = categoriesQuery.data ?? [];

  const onSubmit = (values: BlogForm) => {
    const body: CreateBlogPostDto = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content,
      ...(values.imageUrl ? { imageUrl: values.imageUrl } : {}),
      ...(values.categoryId ? { categoryId: values.categoryId } : {}),
      ...(values.readMinutes !== undefined && values.readMinutes !== ""
        ? { readMinutes: Number(values.readMinutes) }
        : {}),
      isFeatured: Boolean(values.isFeatured),
      ...(values.status ? { status: values.status } : {}),
    };
    createPost.mutate(body, { onSuccess: () => navigate("/admin/blog") });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/admin" },
          { label: "Blog", to: "/admin/blog" },
          { label: "Yangi post" },
        ]}
      />

      <div>
        <h1 className="font-manrope text-2xl font-bold text-gray-900">Yangi post yaratish</h1>
        <p className="mt-1 text-sm text-gray-500">Blog maqolasining ma'lumotlarini kiriting</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-240 flex-col gap-5">
        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">Asosiy ma'lumotlar</h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="title"
                form={form}
                label="Sarlavha"
                placeholder="Maqola sarlavhasi"
                required
                error={errors.title?.message}
                rules={{ required: "Sarlavha kiritilishi shart" }}
              />
              <Input
                name="slug"
                form={form}
                label="Slug"
                placeholder="maqola-sarlavhasi"
                required
                error={errors.slug?.message}
                rules={{ required: "Slug kiritilishi shart" }}
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="blog-excerpt" className="text-sm font-medium text-slate-700">
                Qisqacha (excerpt) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="blog-excerpt"
                {...form.register("excerpt", { required: true })}
                rows={2}
                placeholder="Maqolaning qisqacha mazmuni..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="blog-content" className="text-sm font-medium text-slate-700">
                Matn (content) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="blog-content"
                {...form.register("content", { required: true })}
                rows={8}
                placeholder="Maqolaning to'liq matni (HTML qo'llab-quvvatlanadi)..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-manrope text-lg font-bold text-gray-900">Qo'shimcha</h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="imageUrl"
                form={form}
                label="Rasm URL"
                placeholder="https://..."
              />
              <Input
                name="readMinutes"
                type="number"
                form={form}
                label="O'qish vaqti (min)"
                placeholder="5"
              />
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="blog-category" className="text-sm font-medium text-slate-700">
                  Kategoriya
                </label>
                <select
                  id="blog-category"
                  {...form.register("categoryId")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">— tanlanmagan —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label htmlFor="blog-status" className="text-sm font-medium text-slate-700">
                  Holat
                </label>
                <select
                  id="blog-status"
                  {...form.register("status")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="draft">Qoralama</option>
                  <option value="published">Chop etilgan</option>
                </select>
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...form.register("isFeatured")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Tavsiya etilgan post</span>
            </label>
          </div>
        </article>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <Link
            to="/admin/blog"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Bekor qilish
          </Link>
          <Button type="submit" variant="primary" loading={createPost.isPending} rightIcon={<Icon.check />}>
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogNew;
