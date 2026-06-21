import { useParams } from "react-router-dom";

const CourseDetailStudent = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kurs paneli {id}</h1>
        <p className="mt-1 text-sm text-gray-500">Kurs haqida batafsil ma'lumot</p>
      </div>
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
        Student Course Detail Panel 1,2,3 (To be implemented from Figma)
      </div>
    </div>
  );
};

export default CourseDetailStudent;
