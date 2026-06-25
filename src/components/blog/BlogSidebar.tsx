import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/blog.data";
import type { BlogCategoryDto } from "../../types/api.type";

interface Props {
  categories: BlogCategoryDto[];
  recentPosts: BlogPost[];
}

const TAGS = [
  { label: "JavaScript", color: "bg-blue-50 text-blue-700" },
  { label: "React", color: "bg-gray-100 text-gray-700" },
  { label: "CSS", color: "bg-gray-100 text-gray-700" },
  { label: "Python", color: "bg-emerald-50 text-emerald-700" },
  { label: "Figma", color: "bg-violet-50 text-violet-700" },
  { label: "HTML", color: "bg-gray-100 text-gray-700" },
  { label: "Flutter", color: "bg-amber-50 text-amber-700" },
  { label: "Karyera", color: "bg-gray-100 text-gray-700" },
  { label: "ML", color: "bg-red-50 text-red-700" },
  { label: "Git", color: "bg-gray-100 text-gray-700" },
  { label: "TypeScript", color: "bg-gray-100 text-gray-700" },
  { label: "Docker", color: "bg-gray-100 text-gray-700" },
];

const BlogSidebar = ({ categories, recentPosts }: Props) => {
  return (
    <aside
      className="flex w-full flex-col gap-6 lg:w-80 lg:shrink-0"
      aria-label="Blog sidebar"
    >
      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
            Kategoriyalar
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600">
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

      {/* Popular Posts */}
      {recentPosts.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
            Mashhur maqolalar
          </h3>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex gap-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-center gap-1">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm font-medium leading-snug text-gray-800 transition-colors hover:text-blue-600 line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tag Cloud */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-manrope mb-4 text-base font-bold text-gray-900">
          Mashhur teglar
        </h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
