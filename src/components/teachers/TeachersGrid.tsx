import { Icon } from "../ui/Icon";
import TeacherCard from "../ui/TeacherCard";
import { StaggerContainer, StaggerItem } from "../ui/Motion";
import type { Teacher } from "../../types/home.type";

const pages = ["1", "2", "3"];

interface Props {
  items: Teacher[];
}

const TeachersGrid = ({ items }: Props) => {
  return (
    <div>
      <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((teacher) => (
          <StaggerItem key={teacher.id || teacher.name}>
            <TeacherCard teacher={teacher} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {items.length > 8 && (
        <nav className="mt-8 flex justify-center" aria-label="Sahifa navigatsiyasi">
          <ul className="flex items-center gap-x-2">
            <li>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:text-gray-700">
                <Icon.arrowLeft />
              </button>
            </li>
            {pages.map((page, index) => (
              <li key={page}>
                <button
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:text-gray-700">
                <Icon.arrowRight />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TeachersGrid;
