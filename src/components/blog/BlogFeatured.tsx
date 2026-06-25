import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/blog.data";

interface Props {
  post: BlogPost;
}

const BlogFeatured = ({ post }: Props) => {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:flex">
      {/* Image */}
      <Link
        to={`/blog/${post.slug}`}
        className="block shrink-0 overflow-hidden lg:w-[55%]"
      >
        <img
          src={post.image}
          alt={post.title}
          className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 lg:h-full"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          {post.featuredLabel || "TANLANGAN"}
        </span>

        <h2 className="font-manrope text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
          <Link
            to={`/blog/${post.slug}`}
            className="transition-colors hover:text-blue-600"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-base leading-relaxed text-gray-500">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-medium text-gray-700">{post.authorName}</span>
          <span className="text-gray-300">·</span>
          <span>{post.date}</span>
          <span className="text-gray-300">·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogFeatured;
