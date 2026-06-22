import { Icon } from "../components/ui/Icon";
import { resultStats, resultRows } from "../data/studentResults.data";

const StudentResults = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Natijalarim</h2>
        <p className="mt-2 text-sm text-gray-500">
          Kurs testlari va amaliy topshiriqlar bo'yicha natijalaringiz.
        </p>
      </div>

      {/* Stats Tiles */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {resultStats.map((stat, idx) => {
          const IconComponent = Icon[stat.icon];
          return (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className={`${stat.iconBg} flex h-11 w-11 items-center justify-center rounded-lg`}>
                <span className={stat.iconColor}>
                  <IconComponent />
                </span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Test va topshiriq natijalari</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th scope="col" className="px-5 py-3">Test / Topshiriq</th>
                <th scope="col" className="px-5 py-3">Kurs</th>
                <th scope="col" className="px-5 py-3">Sana</th>
                <th scope="col" className="px-5 py-3">Natija</th>
                <th scope="col" className="px-5 py-3">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {resultRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                    {row.title}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {row.course}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {row.date}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-emerald-600">
                    {row.score}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        row.status === "O'tdi"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
