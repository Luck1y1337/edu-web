import PageHero from "../components/ui/PageHero";

const About = () => {
  return (
    <>
      <PageHero
        title="Biz haqimizda"
        subtitle="O'quv Markaz tarixi, jamoasi va qadriyatlari haqida ma'lumot."
        breadcrumb="Biz haqimizda"
      />
      <section className="py-24 container mx-auto px-4">
        <div className="text-center text-gray-500">
          <p>About Page Content (To be implemented from Figma)</p>
        </div>
      </section>
    </>
  );
};

export default About;
