import PageHero from "../components/ui/PageHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contact = () => {
  return (
    <>
      <PageHero
        breadcrumb="Aloqa"
        title="Biz bilan bog'laning"
        subtitle="Savollaringiz bormi? Bepul konsultatsiya olishni xohlaysizmi? Bizga yozing — javob beramiz."
      />
      <section className="py-10 sm:py-12 md:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </>
  );
};

export default Contact;
