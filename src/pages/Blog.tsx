import BlogHero from "../components/blog/BlogHero";
import BlogFeatured from "../components/blog/BlogFeatured";
import BlogGrid from "../components/blog/BlogGrid";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { useBlogPosts, useBlogCategories } from "../hooks/api/useBlog";
import { mapApiBlogPost } from "../services/mappers";

const Blog = () => {
  const postsQuery = useBlogPosts({ limit: 50 });
  const categoriesQuery = useBlogCategories();

  const allPosts = (postsQuery.data?.items ?? []).map((p, i) => mapApiBlogPost(p, i));
  const featured = allPosts.find((p) => p.featured) || allPosts[0];
  const restPosts = featured ? allPosts.filter((p) => p.slug !== featured.slug) : allPosts;
  const categories = categoriesQuery.data ?? [];

  return (
    <>
      <BlogHero />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {postsQuery.isLoading ? (
          <GlobalSpinner />
        ) : postsQuery.isError ? (
          <p className="py-20 text-center text-sm text-red-600">
            Maqolalarni yuklab bo'lmadi.
          </p>
        ) : allPosts.length === 0 ? (
          <p className="py-20 text-center text-sm text-gray-500">
            Hozircha maqolalar yo'q.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {featured && <BlogFeatured post={featured} />}
            <BlogGrid posts={restPosts} categories={categories} />
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
