import PageHero from "../components/ui/PageHero";
import TeachersToolbar from "../components/teachers/TeachersToolbar";
import TeachersGrid from "../components/teachers/TeachersGrid";

const Teachers = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="O'qituvchilar"
        title="Bizning o'qituvchilar"
        subtitle="42 ta tajribali mutaxassis o'z bilim va tajribasini siz bilan ulashishga tayyor."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeachersToolbar />
          <TeachersGrid />
        </div>
      </section>
    </div>
  );
};

export default Teachers;
