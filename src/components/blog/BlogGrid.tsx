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
  const visible = posts.slice(0, page * POSTS_PER_PAGE);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex-1">
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

        {totalPages > 1 && visible.length < posts.length && (
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
          </div>
        )}
      </div>

      <BlogSidebar categories={categories} recentPosts={recentPosts} />
    </div>
  );
};

export default BlogGrid;
