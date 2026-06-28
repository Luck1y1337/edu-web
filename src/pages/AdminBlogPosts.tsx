import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { useDebounce } from "../hooks/useDebounce";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import Pagination from "../components/ui/Pagination";
import { useAdminBlogPosts, useDeleteBlogPost, usePublishBlogPost } from "../hooks/api/useAdminBlog";
import type { BlogPostStatus } from "../types/api.type";

const PAGE_SIZE = 20;

const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
};

const statusBadge = (status: BlogPostStatus) => {
  if (status === "published") return "bg-emerald-50 text-emerald-700";
  return "bg-amber-50 text-amber-700";
};

const statusLabel = (status: BlogPostStatus) => {
  if (status === "published") return "Nashr etilgan";
  return "Qoralama";
};

const AdminBlogPosts = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [status, setStatus] = useState<"" | BlogPostStatus>("");

  const postsQuery = useAdminBlogPosts({
    page,
    limit: PAGE_SIZE,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(status ? { status } : {}),
  });
  const deletePost = useDeleteBlogPost();
  const publishPost = usePublishBlogPost();

  const data = postsQuery.data;
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`"${title}" postni o'chirishni tasdiqlaysizmi?`)) return;
    deletePost.mutate(id);
  };

  const handlePublish = (id: string) => {
    publishPost.mutate(id);
  };

  return (
    <div className="space-y-6">
      {/* --- Page header --- */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">
            Blog postlar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {total.toLocaleString("uz-UZ")} ta post
          </p>
        </div>
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Yangi post
        </Link>
      </div>

      {/* --- Filter bar --- */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-60">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            placeholder="Sarlavha bo'yicha qidiring..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as "" | BlogPostStatus);
          }}
          className="rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Barcha</option>
          <option value="published">Nashr etilgan</option>
          <option value="draft">Qoralama</option>
        </select>
      </div>

      {/* --- Content --- */}
      {postsQuery.isLoading ? (
        <GlobalSpinner />
      ) : postsQuery.isError ? (
        <p className="py-20 text-center text-sm text-red-600">
          Postlarni yuklab bo'lmadi.
        </p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          Filtr bo'yicha postlar topilmadi.
        </p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Mobile: card list */}
          <ul className="divide-y divide-gray-100 md:hidden">
            {items.map((post) => (
              <li key={post.id} className="flex flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900">{post.title}</p>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge(post.status)}`}>
                    {statusLabel(post.status)}
                  </span>
                </div>
                {post.excerpt && <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>}
                <p className="text-xs text-gray-400">
                  {post.category?.name ? `${post.category.name} · ` : ""}
                  {formatDate(post.publishedAt || post.createdAt)}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  {post.status === "draft" && (
                    <button
                      type="button"
                      onClick={() => handlePublish(post.id)}
                      disabled={publishPost.isPending}
                      className="rounded-lg border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50 disabled:opacity-60"
                    >
                      Nashr etish
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletePost.isPending}
                    className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    O'chirish
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Sarlavha
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Kategoriya
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Status
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Sana
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 text-right">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((post) => (
                  <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    {/* Title + excerpt */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                        {post.excerpt && (
                          <p className="mt-0.5 text-xs text-gray-500 truncate">{post.excerpt}</p>
                        )}
                      </div>
                    </td>
                    {/* Category badge */}
                    <td className="px-5 py-4">
                      {post.category ? (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {post.category.name}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(post.status)}`}
                      >
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                        {statusLabel(post.status)}
                      </span>
                    </td>
                    {/* Date */}
                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status === "draft" && (
                          <button
                            type="button"
                            onClick={() => handlePublish(post.id)}
                            disabled={publishPost.isPending}
                            className="inline-flex items-center justify-center rounded-lg border border-emerald-200 p-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors disabled:opacity-60"
                            aria-label="Nashr etish"
                            title="Nashr etish"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletePost.isPending}
                          className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-60"
                          aria-label="O'chirish"
                          title="O'chirish"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Pagination --- */}
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        label="post"
      />
    </div>
  );
};

export default AdminBlogPosts;
