import { Link } from "react-router-dom";

interface Props {
  avgProgress: number;
  completed: number;
  total: number;
  activeCount: number;
}

const WeeklyGoal = ({ avgProgress, completed, total, activeCount }: Props) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <header className="border-b border-gray-200 p-5">
        <h3 className="font-manrope text-base font-bold text-gray-900">
          O'quv progressi
        </h3>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-5 p-5">
        {/* Completed courses */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold leading-none text-blue-700">{completed}</span>
          <span className="text-sm text-gray-500">/ {total} kurs tugatildi</span>
        </div>

        {/* Average progress bar */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-medium">
            <span className="text-gray-700">O'rtacha progress</span>
            <span className="font-bold text-emerald-600">{avgProgress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${avgProgress}%` }}
            />
          </div>
        </div>

        {/* Active courses summary */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <span className="text-sm text-gray-600">Faol kurslar</span>
          <span className="text-sm font-bold text-gray-900">{activeCount}</span>
        </div>

        {total === 0 && (
          <Link
            to="/dashboard/catalog"
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Birinchi kursni tanlash
          </Link>
        )}
      </div>
    </article>
  );
};

export default WeeklyGoal;
