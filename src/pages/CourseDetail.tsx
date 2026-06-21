import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center text-gray-500">
        <h1 className="text-3xl font-bold mb-4">Course Detail {id}</h1>
        <p>Public Course Detail Content (To be implemented from Figma)</p>
      </div>
    </section>
  );
};

export default CourseDetail;
