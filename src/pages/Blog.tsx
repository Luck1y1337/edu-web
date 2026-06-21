import PageHero from "../components/ui/PageHero";

const Blog = () => {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="So'nggi yangiliklar, maqolalar va foydali maslahatlar."
        breadcrumb="Blog"
      />
      <section className="py-24 container mx-auto px-4">
        <div className="text-center text-gray-500">
          <p>Blog Page Content (To be implemented from Figma)</p>
        </div>
      </section>
    </>
  );
};

export default Blog;
