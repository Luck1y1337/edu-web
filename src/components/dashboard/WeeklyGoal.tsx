import { Icon } from "../ui/Icon";
import { weekDays } from "../../data/dashboard.data";

const goalProgress = 73; // 7s 20daq / 10 soat

const WeeklyGoal = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Haftalik maqsad</h2>

      <p className="mt-6 flex items-baseline gap-x-2">
        <span className="text-3xl font-bold text-blue-600">5</span>
        <span className="text-sm text-gray-500">/ 7 kun ketma-ket o'qildi 🔥</span>
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Haftalik maqsad: 10 soat</span>
          <span className="font-semibold text-emerald-600">7s 20daq</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2 text-center">
        {weekDays.map((day) => (
          <div key={day.label} className="space-y-2">
            <p className="text-xs text-gray-400">{day.label}</p>
            {day.status === "done" && (
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Icon.check />
              </span>
            )}
            {day.status === "today" && (
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {day.value}
              </span>
            )}
            {day.status === "upcoming" && (
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGoal;
