import { useState } from "react";
import { categoryFilters, levelFilters, durationFilters } from "../../data/courses.data";

interface FilterState {
  categories: string[];
  level: string;
  priceMin: string;
  priceMax: string;
  durations: string[];
}

interface Props {
  onFilter: (f: FilterState) => void;
}

const CoursesFilter = ({ onFilter }: Props) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    level: "Barchasi",
    priceMin: "",
    priceMax: "",
    durations: [],
  });

  const toggleCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const toggleDuration = (dur: string) => {
    setFilters((prev) => ({
      ...prev,
      durations: prev.durations.includes(dur)
        ? prev.durations.filter((d) => d !== dur)
        : [...prev.durations, dur],
    }));
  };

  const handleApply = () => onFilter(filters);

  const handleClear = () => {
    const cleared: FilterState = {
      categories: [],
      level: "Barchasi",
      priceMin: "",
      priceMax: "",
      durations: [],
    };
    setFilters(cleared);
    onFilter(cleared);
  };

  return (
    <aside className="hidden w-64 shrink-0 lg:block" aria-label="Filtr">
      <div className="flex flex-col gap-6">
        {/* Kategoriya */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Kategoriya</h3>
          <div className="flex flex-col gap-2.5">
            {categoryFilters.map((cat) => (
              <label
                key={cat.name}
                className="flex cursor-pointer items-center gap-2.5"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="flex-1 text-sm text-gray-700">{cat.name}</span>
                <span className="text-xs text-gray-400">({cat.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Daraja */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Daraja</h3>
          <div className="flex flex-col gap-2.5">
            {levelFilters.map((lv) => (
              <label key={lv} className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="radio"
                  name="level"
                  checked={filters.level === lv}
                  onChange={() => setFilters((p) => ({ ...p, level: lv }))}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{lv}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Narx oralig'i */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Narx oralig'i (so'm)
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="400 000"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters((p) => ({ ...p, priceMin: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-400">&mdash;</span>
            <input
              type="text"
              placeholder="2 000 000"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters((p) => ({ ...p, priceMax: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Davomiyligi */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Davomiyligi</h3>
          <div className="flex flex-col gap-2.5">
            {durationFilters.map((dur) => (
              <label
                key={dur}
                className="flex cursor-pointer items-center gap-2.5"
              >
                <input
                  type="checkbox"
                  checked={filters.durations.includes(dur)}
                  onChange={() => toggleDuration(dur)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{dur}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleApply}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Filtrlash
          </button>
          <button
            onClick={handleClear}
            className="w-full rounded-lg py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
          >
            Tozalash
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CoursesFilter;
