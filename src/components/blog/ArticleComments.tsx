import { useForm } from "react-hook-form";
import type { BlogCommentDto, CreateBlogCommentDto } from "../../types/api.type";
import { useCreateBlogComment } from "../../hooks/api/useBlog";

interface Props {
  slug: string;
  comments: BlogCommentDto[];
}

const formatCommentDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
};

const ArticleComments = ({ slug, comments }: Props) => {
  const form = useForm<CreateBlogCommentDto>();
  const { mutateAsync, isPending } = useCreateBlogComment(slug);
  const { register, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = async (values: CreateBlogCommentDto) => {
    await mutateAsync(values);
    reset();
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-manrope text-xl font-bold text-gray-900">
        Izohlar ({comments.length})
      </h2>

      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">Birinchi bo'lib izoh qoldiring.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                {c.authorName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{c.authorName}</span>
                  <span className="text-xs text-gray-400">{formatCommentDate(c.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5"
      >
        <h3 className="font-manrope text-base font-bold text-gray-900">
          Izoh qoldirish
        </h3>
        <input
          type="text"
          placeholder="Ismingiz"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          {...register("authorName", { required: "Ism kiritilishi shart", minLength: { value: 2, message: "Kamida 2 ta harf" } })}
        />
        {errors.authorName && <span className="text-xs text-red-500">{errors.authorName.message}</span>}

        <input
          type="email"
          placeholder="Email (ixtiyoriy)"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          {...register("authorEmail")}
        />

        <textarea
          rows={3}
          placeholder="Fikringizni yozing..."
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          {...register("content", { required: "Izoh matnini kiriting", minLength: { value: 3, message: "Kamida 3 ta belgi" } })}
        />
        {errors.content && <span className="text-xs text-red-500">{errors.content.message}</span>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ArticleComments;
