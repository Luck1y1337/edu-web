import { Link, useParams, Navigate } from "react-router-dom";
import ArticleHeader from "../components/blog/ArticleHeader";
import ArticleBody from "../components/blog/ArticleBody";
import ArticleFooter from "../components/blog/ArticleFooter";
import ArticleSidebar from "../components/blog/ArticleSidebar";
import ArticleComments from "../components/blog/ArticleComments";
import ArticleRelated from "../components/blog/ArticleRelated";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useBlogPost, useBlogPosts } from "../hooks/api/useBlog";
import { mapApiBlogPost } from "../services/mappers";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const postSlug = slug || "";

  const postQuery = useBlogPost(postSlug);
  const recentQuery = useBlogPosts({ limit: 4 });

  if (!slug) return <Navigate to="/blog" replace />;

  if (postQuery.isLoading) return <GlobalSpinner />;
  if (postQuery.isError || !postQuery.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Maqola topilmadi</h2>
        <p className="mt-2 text-sm text-gray-500">
          Bu maqola olib tashlangan yoki manzili noto'g'ri.
        </p>
        <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-blue-600">
          Bloggа qaytish
        </Link>
      </div>
    );
  }

  const apiPost = postQuery.data;
  const post = mapApiBlogPost(apiPost);
  const related = (recentQuery.data?.items ?? [])
    .filter((p) => p.slug !== postSlug)
    .slice(0, 3)
    .map((p, i) => mapApiBlogPost(p, i));

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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

        <div className="flex gap-10">
          <article className="min-w-0 flex-1">
            <div className="flex flex-col gap-6">
              <ArticleHeader post={post} />

              <img
                src={post.image}
                alt={post.title}
                className="h-80 w-full rounded-3xl object-cover lg:h-[420px]"
              />

              <ArticleBody content={apiPost.content || ""} />
              <ArticleFooter />
              <ArticleComments slug={postSlug} comments={apiPost.comments || []} />
            </div>
          </article>

          <ArticleSidebar />
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <ArticleRelated posts={related} />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetail;
