import { Link } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import Breadcrumb from "../components/ui/Breadcrumb";
import useUserStore from "../store/user.store";

const AdminSettings = () => {
  const { user, setLogoutModalOpen } = useUserStore();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";
  const roleLabel = user?.role === "super_admin" ? "Super admin" : "Admin";

  const rows: { label: string; value: string }[] = [
    { label: "F.I.O", value: fullName },
    { label: "Email", value: user?.email || "—" },
    { label: "Telefon", value: user?.phone || "—" },
    { label: "Rol", value: roleLabel },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/admin" },
          { label: "Sozlamalar" },
        ]}
      />

      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-gray-900">Sozlamalar</h1>
        <p className="mt-1 text-sm text-gray-500">Hisob ma'lumotlari va tizim sozlamalari</p>
      </div>

      {/* Account info (read-only) */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {fullName.charAt(0).toUpperCase()}
          </span>
          <div>
            <h3 className="font-manrope text-lg font-bold text-gray-900">Hisob ma'lumotlari</h3>
            <p className="text-xs text-gray-400">Faqat ko'rish uchun</p>
          </div>
        </div>
        <dl className="divide-y divide-gray-50">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 px-6 py-4 text-sm">
              <dt className="text-gray-500">{r.label}</dt>
              <dd className="font-medium text-gray-900">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/admin/contact"
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:bg-gray-50"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Icon.mail />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">Xabarlar</p>
            <p className="text-xs text-gray-400">Aloqa formasidagi murojaatlar</p>
          </div>
        </Link>
        <Link
          to="/admin/reviews"
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:bg-gray-50"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <Icon.star />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">Sharhlar</p>
            <p className="text-xs text-gray-400">Moderatsiya kutayotgan sharhlar</p>
          </div>
        </Link>
      </div>

      {/* Session */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-manrope text-lg font-bold text-gray-900">Sessiya</h3>
        <p className="mt-1 text-sm text-gray-500">Hisobingizdan chiqish</p>
        <button
          type="button"
          onClick={() => setLogoutModalOpen(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <Icon.logout />
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
