import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/blog.data";

interface Props {
  post: BlogPost;
}

const BlogFeatured = ({ post }: Props) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:flex">
      {/* Image */}
      <Link
        to={`/blog/${post.slug}`}
        className="block shrink-0 lg:w-[57%]"
      >
        <img
          src={post.image}
          alt={post.title}
          className="h-64 w-full object-cover lg:h-full"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-col justify-center gap-4 p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          {post.featuredLabel}
        </span>

        <h2 className="font-manrope text-3xl font-medium leading-tight tracking-tight text-gray-900">
          <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-base leading-relaxed text-gray-500">{post.excerpt}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span>{post.authorName}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogFeatured;
