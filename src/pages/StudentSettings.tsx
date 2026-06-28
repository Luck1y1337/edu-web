import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useChangePassword } from "../hooks/api/useChangePassword";
import { useSessions, useDeleteSession } from "../hooks/api/useSessions";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import useUserStore from "../store/user.store";
import { changePasswordSchema, type ChangePasswordForm } from "../schemas/auth.schema";

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      enabled ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const user = useUserStore((state) => state.user);

  // Password Form
  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: errorsPwd },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { mutate: changePassword, isPending: isPwdPending } = useChangePassword();

  const onPasswordSubmit = (data: ChangePasswordForm) => {
    changePassword(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      { onSuccess: () => resetPwd() }
    );
  };

  // Sessions
  const { data: sessions, isLoading: sessionsLoading } = useSessions();
  const { mutate: deleteSession } = useDeleteSession();

  const handleLogoutAll = () => {
    const otherSessions = sessions?.filter((s) => !s.isCurrent) ?? [];
    if (otherSessions.length === 0) {
      toast.info("Boshqa aktiv sessiyalar yo'q");
      return;
    }
    otherSessions.forEach((s) => deleteSession(s.id));
  };

  // Notifications
  const [notifications, setNotifications] = useState({
    lessonReminder: true,
    gradeNotify: true,
    paymentReminder: true,
    examNotify: true,
    news: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Bildirishnoma sozlamasi yangilandi");
  };

  // Profile form
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleProfileSave = () => {
    toast.info("Profil ma'lumotlari saqlandi (demo)");
  };

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(darkMode ? "Yorug' rejimga o'tildi" : "Qorong'u rejim hali tayyor emas");
  };

  // Avatar
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Talaba";
  const initials =
    [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "T";

  const tabs = [
    {
      id: "profil",
      label: "Profil",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      id: "bildirishnomalar",
      label: "Bildirishnomalar",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    },
    {
      id: "xavfsizlik",
      label: "Xavfsizlik",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      id: "til-mintaqa",
      label: "Til va mintaqa",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
          Sozlamalar
        </h2>
        <p className="text-sm text-gray-500">
          Hisobingiz, bildirishnomalar va xavfsizlik sozlamalari.
        </p>
      </div>

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-2 lg:w-64">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content Area */}
        <div className="flex w-full flex-col gap-6">
          {activeTab === "profil" && (
            <>
          {/* Card 1: Profil rasmi */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Profil rasmi</h3>
              <p className="mt-1 text-xs text-gray-500">
                Mentorlar va boshqa o'quvchilar sizni shunday ko'radi
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={fullName}
                  className="h-20 w-20 rounded-full bg-blue-100 object-cover ring-2 ring-white"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700 ring-2 ring-white">
                  {initials}
                </span>
              )}
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-500">JPG yoki PNG · Max 2 MB</p>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Rasmni o'zgartirish
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={() => toast.info("Rasm yuklash hali tayyor emas")}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info("Rasm o'chirish hali tayyor emas")}
                    className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Shaxsiy ma'lumotlar */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">
                Shaxsiy ma'lumotlar
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Telefon raqamingiz o'zgargan bo'lsa, yangilab qo'ying
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProfileSave();
              }}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    Ism
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={profileForm.firstName}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, firstName: e.target.value }))
                    }
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Familiya
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={profileForm.lastName}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, lastName: e.target.value }))
                    }
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="studentId" className="text-sm font-medium text-gray-700">
                    Talaba ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    defaultValue={user?.id?.slice(0, 8) || "—"}
                    disabled
                    className="block w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                  />
                  <p className="mt-0.5 text-xs text-gray-400">
                    Talaba ID raqami avtomatik beriladi va uni o'zgartirib bo'lmaydi.
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </section>

            </>
          )}

          {activeTab === "bildirishnomalar" && (
          /* Card 3: Bildirishnoma sozlamalari */
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">
                Bildirishnoma sozlamalari
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Qaysi xabarlarni olishni xohlaysiz
              </p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {(
                [
                  {
                    key: "lessonReminder" as const,
                    title: "Dars eslatmasi",
                    desc: "Dars boshlanishidan 1 soat oldin eslatma",
                  },
                  {
                    key: "gradeNotify" as const,
                    title: "Yangi baho qo'yilganda",
                    desc: "Imtihon yoki vazifa baholanganda xabar",
                  },
                  {
                    key: "paymentReminder" as const,
                    title: "To'lov eslatmasi",
                    desc: "To'lov muddatidan 3 kun oldin eslatma",
                  },
                  {
                    key: "examNotify" as const,
                    title: "Imtihon e'lonlari",
                    desc: "Yangi imtihon boshlanganda xabar",
                  },
                  {
                    key: "news" as const,
                    title: "Markaz yangiliklari",
                    desc: "Tadbirlar va yangi kurslar haqida",
                  },
                ] as const
              ).map((item) => (
                <div key={item.key} className="flex items-center justify-between py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                    <span className="text-xs text-gray-500">{item.desc}</span>
                  </div>
                  <Toggle
                    enabled={notifications[item.key]}
                    onToggle={() => toggleNotification(item.key)}
                  />
                </div>
              ))}
            </div>
          </section>

          )}

          {activeTab === "xavfsizlik" && (
            <>
          {/* Card 4: Parolni o'zgartirish */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">
                Parolni o'zgartirish
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Hisobingiz xavfsizligi uchun maxfiy parol bering.
              </p>
            </div>

            <form
              onSubmit={handlePwdSubmit(onPasswordSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                  Joriy parol
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  {...registerPwd("currentPassword")}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errorsPwd.currentPassword && (
                  <span className="text-xs text-red-500">
                    {errorsPwd.currentPassword.message as string}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                    Yangi parol
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    {...registerPwd("newPassword")}
                    placeholder="Kamida 8 ta belgi, 1ta katta harf va raqam"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errorsPwd.newPassword && (
                    <span className="text-xs text-red-500">
                      {errorsPwd.newPassword.message as string}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Tasdiqlash
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...registerPwd("confirmPassword")}
                    placeholder="Yangi parolni qaytadan"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errorsPwd.confirmPassword && (
                    <span className="text-xs text-red-500">
                      {errorsPwd.confirmPassword.message as string}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  disabled={isPwdPending}
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isPwdPending ? "Yuklanmoqda..." : "Parolni yangilash"}
                </button>
              </div>
            </form>
          </section>

          {/* Card 5: Aktiv sessiyalar */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-manrope text-lg font-bold text-gray-900">
                  Aktiv sessiyalar
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Hisobingizga ulangan qurilmalar
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogoutAll}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                Hammadan chiqish
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {sessionsLoading ? (
                <div className="py-4 text-center text-sm text-gray-500">
                  <GlobalSpinner />
                </div>
              ) : sessions && sessions.length > 0 ? (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`flex items-center justify-between rounded-xl border px-5 py-4 ${
                      session.isCurrent
                        ? "border-blue-100 bg-blue-50/50"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm ${
                          session.isCurrent
                            ? "border-blue-200 bg-white text-blue-600"
                            : "border-gray-100 bg-gray-50 text-gray-500"
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={
                              session.device?.toLowerCase().includes("mobile")
                                ? "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                : "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            }
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {session.device || session.os} · {session.browser}
                          </span>
                          {session.isCurrent && (
                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                              Joriy
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {session.location || "Noma'lum hudud"} ·{" "}
                          {session.isCurrent
                            ? "Hozir"
                            : session.lastActive || session.createdAt
                              ? new Date(
                                  session.lastActive || session.createdAt!
                                ).toLocaleString()
                              : "Yaqinda"}
                        </span>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="text-xs font-semibold text-gray-500 hover:text-red-600"
                      >
                        Chiqish
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-sm text-gray-500">
                  Boshqa aktiv sessiyalar yo'q
                </div>
              )}
            </div>
          </section>

            </>
          )}

          {activeTab === "til-mintaqa" && (
          /* Card 6: Til va mintaqa */
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h3 className="font-manrope text-lg font-bold text-gray-900">Til va mintaqa</h3>
              <p className="mt-1 text-xs text-gray-500">Interfeys tili va vaqt mintaqasi</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Til va mintaqa sozlamalari saqlandi");
              }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="language" className="text-sm font-medium text-gray-700">
                    Interfeys tili
                  </label>
                  <select
                    id="language"
                    className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="uz"
                  >
                    <option value="uz">O'zbek</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="timezone" className="text-sm font-medium text-gray-700">
                    Vaqt mintaqasi
                  </label>
                  <select
                    id="timezone"
                    className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="tashkent"
                  >
                    <option value="tashkent">Tashkent (UTC+5)</option>
                    <option value="almaty">Almaty (UTC+5)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-gray-900">Qorong'u rejim</span>
                  <span className="text-xs text-gray-500">
                    Interfeysni qorong'u fonga o'tkazish
                  </span>
                </div>
                <Toggle enabled={darkMode} onToggle={toggleDarkMode} />
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
