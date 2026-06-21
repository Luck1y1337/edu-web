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
    const cleared: FilterState = { categories: [], level: "Barchasi", priceMin: "", priceMax: "", durations: [] };
    setFilters(cleared);
    onFilter(cleared);
  };

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-gray-200 bg-white p-6 lg:w-72">
      <div className="flex flex-col gap-6">

        {/* Kategoriya */}
        <div>
          <h3 className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900">
            Kategoriya
          </h3>
          <div className="flex flex-col gap-2">
            {categoryFilters.map((cat) => (
              <label key={cat.name} className="flex cursor-pointer items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    filters.categories.includes(cat.name)
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => toggleCategory(cat.name)}
                >
                  {filters.categories.includes(cat.name) && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-sm text-gray-700">{cat.name}</span>
                <span className="text-xs text-gray-400">({cat.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Daraja */}
        <div>
          <h3 className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900">
            Daraja
          </h3>
          <div className="flex flex-col gap-2">
            {levelFilters.map((lv) => (
              <label key={lv} className="flex cursor-pointer items-center gap-3">
                <span
                  className={`h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
                    filters.level === lv ? "border-blue-600 bg-white ring-[3px] ring-blue-600 ring-offset-1" : "border-gray-300 bg-white"
                  }`}
                  onClick={() => setFilters((p) => ({ ...p, level: lv }))}
                />
                <span className="text-sm text-gray-700">{lv}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Narx */}
        <div>
          <h3 className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900">
            Narx oralig'i (so'm)
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="400 000"
              value={filters.priceMin}
              onChange={(e) => setFilters((p) => ({ ...p, priceMin: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <span className="text-gray-400">—</span>
            <input
              type="text"
              placeholder="2 000 000"
              value={filters.priceMax}
              onChange={(e) => setFilters((p) => ({ ...p, priceMax: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Davomiyligi */}
        <div>
          <h3 className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-gray-900">
            Davomiyligi
          </h3>
          <div className="flex flex-col gap-2">
            {durationFilters.map((dur) => (
              <label key={dur} className="flex cursor-pointer items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    filters.durations.includes(dur)
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => toggleDuration(dur)}
                >
                  {filters.durations.includes(dur) && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-gray-700">{dur}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Filtrlash
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Tozalash
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CoursesFilter;
