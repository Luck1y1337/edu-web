import { useState } from "react";
import { blogPosts } from "../../data/blog.data";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";

const POSTS_PER_PAGE = 8;

const BlogGrid = () => {
  const [page, setPage] = useState(1);
  const posts = blogPosts.filter((p) => !p.featured);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const visible = posts.slice(0, page * POSTS_PER_PAGE);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* Main grid */}
      <div className="flex-1">
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              >
                →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <BlogSidebar />
    </div>
  );
};

export default BlogGrid;
