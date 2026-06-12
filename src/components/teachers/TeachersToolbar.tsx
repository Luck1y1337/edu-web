import { Icon } from "../ui/Icon";
import { teacherFilters } from "../../data/teachers.data";

const TeachersToolbar = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full max-w-sm">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon.search />
        </span>
        <input
          type="text"
          placeholder="O'qituvchi ismini qidiring..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        {teacherFilters.map((filter, index) => (
          <button
            key={filter}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              index === 0
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeachersToolbar;
