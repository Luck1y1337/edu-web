import { Icon } from "../ui/Icon";
import TeacherCard from "../ui/TeacherCard";
import { allTeachers } from "../../data/teachers.data";

const pages = ["1", "2", "3"];

const TeachersGrid = () => {
  return (
    <div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {allTeachers.map((teacher) => (
          <TeacherCard key={teacher.name} teacher={teacher} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-x-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700">
          <Icon.arrowLeft />
        </button>
        {pages.map((page, index) => (
          <button
            key={page}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              index === 0
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700">
          <Icon.arrowRight />
        </button>
      </div>
    </div>
  );
};

export default TeachersGrid;
