import type { DashboardNavGroup } from "../types/dashboard.type";

export const dashboardNav: DashboardNavGroup[] = [
  {
    title: "Online ta'lim",
    items: [
      { label: "Dashboard", icon: "home", path: "/dashboard" },
      { label: "Mening kurslarim", icon: "book", path: "/dashboard/courses" },
      { label: "Kurslar katalogi", icon: "search", path: "/dashboard/catalog" },
      { label: "Natijalarim", icon: "barChart", path: "/dashboard/results" },
      { label: "Sertifikatlarim", icon: "award", path: "/dashboard/certificates" },
    ],
  },
  {
    title: "Hisob",
    items: [
      { label: "Profil", icon: "user", path: "/dashboard/profile" },
      { label: "To'lovlar", icon: "creditCard", path: "/dashboard/payments" },
      { label: "Sozlamalar", icon: "settings", path: "/dashboard/settings" },
    ],
  },
];
