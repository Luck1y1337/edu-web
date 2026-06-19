import Advantages from "../components/home/Advantages";
import Courses from "../components/home/Courses";
import Cta from "../components/home/Cta";
import Faq from "../components/home/Faq";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Teachers from "../components/home/Teachers";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="bg-linear-to-b from-blue-50/60 to-white">
        <Hero />
        <Stats />
      </section>
      <Courses />
      <Advantages />
      <Teachers />
      <Testimonials />
      <Faq />
      <Cta />
    </div>
  );
};

export default Home;
