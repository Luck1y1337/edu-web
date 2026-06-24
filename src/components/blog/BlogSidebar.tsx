import type { BlogPost } from "../../data/blog.data";
import type { BlogCategoryDto } from "../../types/api.type";

interface Props {
  categories: BlogCategoryDto[];
  recentPosts: BlogPost[];
}

const BlogSidebar = ({ categories, recentPosts }: Props) => {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-80 lg:shrink-0">
      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
            Kategoriyalar
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600">
                  <span>{cat.name}</span>
                  {typeof cat.postCount === "number" && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                      {cat.postCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
            Oxirgi maqolalar
          </h3>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex gap-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-snug text-gray-800 line-clamp-2">
                    {post.title}
                  </p>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
          Ijtimoiy tarmoqlar
        </h3>
        <div className="flex flex-wrap gap-2">
          {["YouTube", "Telegram", "Instagram"].map((s) => (
            <a
              key={s}
              href="#"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
