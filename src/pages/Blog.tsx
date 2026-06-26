import BlogHero from "../components/blog/BlogHero";
import BlogFeatured from "../components/blog/BlogFeatured";
import BlogGrid from "../components/blog/BlogGrid";
import { useBlogPosts, useBlogCategories } from "../hooks/api/useBlog";
import { mapApiBlogPost } from "../services/mappers";
import { SkeletonCard } from "../components/ui/Skeleton";

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

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {postsQuery.isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : postsQuery.isError ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-sm text-red-600">Maqolalarni yuklab bo'lmadi.</p>
              <button
                onClick={() => postsQuery.refetch()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Qayta urinish
              </button>
            </div>
          ) : allPosts.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-500">
              Hozircha maqolalar yo'q.
            </p>
          ) : (
            <div className="flex flex-col gap-10">
              {featured && <BlogFeatured post={featured} />}
              <BlogGrid posts={restPosts} categories={categories} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
