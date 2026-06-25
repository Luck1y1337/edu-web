import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/blog.data";
import { badgeStyles } from "../../data/blog.data";

interface Props {
  post: BlogPost;
}

const BlogCard = ({ post }: Props) => {
  const badge = badgeStyles[post.badgeColor];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta row: badge + date */}
        <div className="flex items-center gap-3">
          <span
            className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${badge.bg} ${badge.text}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-manrope text-lg font-semibold leading-snug tracking-tight text-gray-900">
          <Link
            to={`/blog/${post.slug}`}
            className="transition-colors hover:text-blue-600"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="flex-1 text-sm leading-relaxed text-gray-500 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-xs font-medium text-gray-700">
              {post.authorName}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            O'qish
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
