import { weekDays } from "../../data/dashboard.data";

const goalProgress = 73; // 7s 20daq / 10 soat

const WeeklyGoal = () => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <header className="border-b border-gray-200 p-5">
        <h3 className="font-manrope text-base font-bold text-gray-900">
          Haftalik maqsad
        </h3>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Streak big number */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold leading-none text-blue-700">5</span>
          <span className="text-sm text-gray-500">/ 7 kun ketma-ket o'qildi</span>
        </div>

        {/* Weekly progress bar */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-medium">
            <span className="text-gray-700">Haftalik maqsad: 10 soat</span>
            <span className="font-bold text-emerald-600">7s 20daq</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        </div>

        {/* Day dots */}
        <div className="flex justify-between gap-2">
          {weekDays.map((day) => (
            <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs text-gray-500">{day.label}</span>
              {day.status === "done" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
              {day.status === "today" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {day.value}
                </span>
              )}
              {day.status === "upcoming" && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default WeeklyGoal;
