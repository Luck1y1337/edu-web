import { useParams } from "react-router-dom";

const TeacherDetail = () => {
  const { id } = useParams();

  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center text-gray-500">
        <h1 className="text-3xl font-bold mb-4">Teacher Profile {id}</h1>
        <p>Teacher Detail Content (To be implemented from Figma)</p>
      </div>
    </section>
  );
};

export default TeacherDetail;
