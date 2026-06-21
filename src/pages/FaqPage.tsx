import PageHero from "../components/ui/PageHero";

const FaqPage = () => {
  return (
    <>
      <PageHero
        title="Ko'p so'raladigan savollar"
        subtitle="Sizni qiziqtirgan barcha savollarga javoblar."
        breadcrumb="FAQ"
      />
      <section className="py-24 container mx-auto px-4">
        <div className="text-center text-gray-500">
          <p>FAQ Page Content (To be implemented from Figma)</p>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
