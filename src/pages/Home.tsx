import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Courses from "../components/home/Courses";
import Advantages from "../components/home/Advantages";
import Teachers from "../components/home/Teachers";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
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
      <Footer />
    </div>
  );
};

export default Home;
