import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/blog.data";
import { badgeStyles } from "../../data/blog.data";

interface Props {
  posts: BlogPost[];
}

const ArticleRelated = ({ posts }: Props) => {
  if (!posts.length) return null;

  return (
    <section className="border-t border-gray-100 pt-10">
      <h2 className="font-manrope mb-6 text-2xl font-bold text-gray-900">
        O'xshash maqolalar
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const badge = badgeStyles[post.badgeColor];
          return (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />
              </Link>
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-manrope text-sm font-bold leading-snug text-gray-900 line-clamp-2">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div className="mt-3 flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500">{post.authorName}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ArticleRelated;
