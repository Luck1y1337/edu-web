import { blogPosts } from "../data/blog.data";
import BlogHero from "../components/blog/BlogHero";
import BlogFeatured from "../components/blog/BlogFeatured";
import BlogGrid from "../components/blog/BlogGrid";

const Blog = () => {
  const featured = blogPosts.find((p) => p.featured)!;

  return (
    <>
      <BlogHero />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <BlogFeatured post={featured} />
          <BlogGrid />
        </div>
      </div>
    </>
  );
};

export default Blog;
