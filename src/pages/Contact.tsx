import PageHero from "../components/ui/PageHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Aloqa"
        title="Biz bilan bog'laning"
        subtitle="Savollaringiz bormi? Bepul konsultatsiya olishni xohlaysizmi? Bizga yozing — javob beramiz."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </div>
  );
};

export default Contact;
