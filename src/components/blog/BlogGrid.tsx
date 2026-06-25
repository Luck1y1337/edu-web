import { useState } from "react";
import type { BlogPost } from "../../data/blog.data";
import type { BlogCategoryDto } from "../../types/api.type";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";

const POSTS_PER_PAGE = 8;

interface Props {
  posts: BlogPost[];
  categories: BlogCategoryDto[];
}

const BlogGrid = ({ posts, categories }: Props) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
  const visible = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const recentPosts = posts.slice(0, 4);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* Main content: grid + pagination */}
      <div className="flex-1 min-w-0">
        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-500">
            Hozircha maqolalar yo'q.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {visible.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10" aria-label="Sahifa">
            <ul className="flex items-center justify-center gap-1">
              {/* Previous */}
              <li>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Oldingi"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              </li>

              {getPageNumbers().map((p, idx) =>
                p === "ellipsis" ? (
                  <li key={`ellipsis-${idx}`}>
                    <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
                      ...
                    </span>
                  </li>
                ) : (
                  <li key={p}>
                    <button
                      onClick={() => setPage(p)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  </li>
                )
              )}

              {/* Next */}
              <li>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Keyingi"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Sidebar */}
      <BlogSidebar categories={categories} recentPosts={recentPosts} />
    </div>
  );
};

export default BlogGrid;
