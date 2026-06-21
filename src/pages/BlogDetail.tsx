import { Link, useParams, Navigate } from "react-router-dom";
import { blogPosts } from "../data/blog.data";
import ArticleHeader from "../components/blog/ArticleHeader";
import ArticleBody from "../components/blog/ArticleBody";
import ArticleFooter from "../components/blog/ArticleFooter";
import ArticleSidebar from "../components/blog/ArticleSidebar";
import ArticleComments from "../components/blog/ArticleComments";
import ArticleRelated from "../components/blog/ArticleRelated";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find post — fallback to featured post for demo
  const post =
    blogPosts.find((p) => p.slug === slug) ||
    blogPosts.find((p) => p.featured);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Bosh sahifa
          </Link>
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/blog" className="hover:text-gray-700">
            Blog
          </Link>
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold text-gray-900 line-clamp-1 max-w-[200px]">
            {post.category}
          </span>
        </nav>

        {/* Layout */}
        <div className="flex gap-10">
          {/* Main article */}
          <article className="min-w-0 flex-1">
            <div className="flex flex-col gap-6">
              <ArticleHeader post={post} />

              {/* Hero image */}
              <img
                src={post.image}
                alt={post.title}
                className="h-80 w-full rounded-3xl object-cover lg:h-[420px]"
              />

              <ArticleBody />
              <ArticleFooter />
              <ArticleComments />
            </div>
          </article>

          {/* Sidebar TOC */}
          <ArticleSidebar />
        </div>

        {/* Related posts */}
        <div className="mt-16">
          <ArticleRelated currentSlug={post.slug} />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
