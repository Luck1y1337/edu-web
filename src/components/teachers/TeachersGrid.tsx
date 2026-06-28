import { useState } from "react";
import { Icon } from "../ui/Icon";
import TeacherCard from "../ui/TeacherCard";
import { StaggerContainer, StaggerItem } from "../ui/Motion";
import type { Teacher } from "../../types/home.type";

const PAGE_SIZE = 8;

interface Props {
  items: Teacher[];
}

const TeachersGrid = ({ items }: Props) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  // Reset to first page whenever the filtered list changes (render-phase, no effect).
  const [prevItems, setPrevItems] = useState(items);
  if (prevItems !== items) {
    setPrevItems(items);
    setPage(1);
  }

  const visible = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <StaggerContainer key={page} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((teacher) => (
          <StaggerItem key={teacher.id || teacher.name}>
            <TeacherCard teacher={teacher} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {totalPages > 1 && (
        <nav className="mt-8 flex justify-center" aria-label="Sahifa navigatsiyasi">
          <ul className="flex items-center gap-x-2">
            <li>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Oldingi sahifa"
              >
                <Icon.arrowLeft />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p}>
                <button
                  onClick={() => setPage(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Keyingi sahifa"
              >
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
