import { Icon } from "../ui/Icon";
import useUserStore from "../../store/user.store";

const DashboardTopbar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-100 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        className="flex items-center gap-x-2.5 text-gray-600 lg:gap-x-3"
        aria-label="Menyu"
      >
        <Icon.menu />
        <span className="text-base font-semibold text-gray-900">
          Online ta'lim
        </span>
      </button>

      <div className="mx-auto hidden w-full max-w-md items-center gap-x-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-400 md:flex">
        <Icon.search />
        <input
          type="text"
          placeholder="Kurs qidirish..."
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-x-3 border-l border-gray-100 pl-4">
        <img
          src="https://i.pravatar.cc/80?img=11"
          alt={user?.name || "Talaba"}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">{user?.name || "Talaba"}</p>
          <p className="text-xs text-gray-400">{user?.email || "Online talaba"}</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
