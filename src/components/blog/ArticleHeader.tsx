import type { BlogPost } from "../../data/blog.data";

interface Props {
  post: BlogPost;
}

const ArticleHeader = ({ post }: Props) => {
  return (
    <header className="flex flex-col gap-4">
      {/* Meta top */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {post.category}
        </span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
        <span>·</span>
        <span>2 432 ko'rildi</span>
      </div>

      {/* Title */}
      <h1 className="font-manrope text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
        {post.title}
      </h1>

      {/* Author bar */}
      <div className="flex items-center gap-3 border-y border-gray-200 py-4">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{post.authorName}</p>
          <p className="text-xs text-gray-500">JavaScript Lead, 8 yillik tajriba</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-blue-300 hover:text-blue-600" title="Saqlash">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-blue-300 hover:text-blue-600" title="Ulashish">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
