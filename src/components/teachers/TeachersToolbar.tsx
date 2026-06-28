import { Icon } from "../ui/Icon";
import { teacherFilters } from "../../data/teachers.data";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const TeachersToolbar = ({ search, onSearchChange, activeFilter, onFilterChange }: Props) => {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-5">
      <div className="min-w-60 max-w-120 flex-1">
        <label className="relative block">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="O'qituvchi ismini qidiring..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {teacherFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === activeFilter
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
