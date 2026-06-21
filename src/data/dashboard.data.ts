import type {
  ActiveCourse,
  ContinueLearning,
  DashboardNavGroup,
  DashboardStat,
  RecommendedCourse,
  WeekDay,
} from "../types/dashboard.type";

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

export const continueLearning: ContinueLearning = {
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
  title: "React.js — zamonaviy frontend",
  module: "Modul 4 · 12-dars: useState va useEffect hooklari",
  completedLessons: 14,
  totalLessons: 32,
  progress: 62,
};

export const dashboardStats: DashboardStat[] = [
  {
    value: "3",
    label: "Faol online kurslar",
    icon: "book",
    color: "bg-blue-50 text-blue-600",
  },
  {
    value: "47",
    label: "O'rganilgan soat",
    icon: "clock",
    color: "bg-orange-50 text-orange-500",
    trend: "+4s",
  },
  {
    value: "2",
    label: "Tugallangan",
    icon: "checkSquare",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    value: "2",
    label: "Sertifikatlar",
    icon: "award",
    color: "bg-purple-50 text-purple-600",
  },
];

export const activeCourses: ActiveCourse[] = [
  {
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    categoryColor: "text-blue-600",
    title: "React.js — zamonaviy frontend",
    teacher: "Akmal Karimov",
    teacherPhoto: "https://i.pravatar.cc/40?img=12",
    completedLessons: 14,
    totalLessons: 32,
    progress: 62,
    progressColor: "bg-blue-600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=60",
    category: "Dasturlash",
    categoryColor: "text-orange-500",
    title: "Python asoslari",
    teacher: "Dilnoza Yusupova",
    teacherPhoto: "https://i.pravatar.cc/40?img=45",
    completedLessons: 8,
    totalLessons: 24,
    progress: 33,
    progressColor: "bg-orange-400",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=60",
    category: "Dizayn",
    categoryColor: "text-purple-600",
    title: "UX/UI dizayn asoslari",
    teacher: "Sardor Aliyev",
    teacherPhoto: "https://i.pravatar.cc/40?img=33",
    completedLessons: 19,
    totalLessons: 20,
    progress: 95,
    progressColor: "bg-emerald-500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60",
    category: "Marketing",
    categoryColor: "text-rose-500",
    title: "SMM va raqamli marketing",
    teacher: "Madina Rashidova",
    teacherPhoto: "https://i.pravatar.cc/40?img=47",
    completedLessons: 3,
    totalLessons: 18,
    progress: 17,
    progressColor: "bg-orange-400",
  },
];

export const weekDays: WeekDay[] = [
  { label: "Du", status: "done" },
  { label: "Se", status: "done" },
  { label: "Cho", status: "done" },
  { label: "Pa", status: "done" },
  { label: "Ju", status: "today", value: "5" },
  { label: "Sh", status: "upcoming" },
  { label: "Ya", status: "upcoming" },
];

export const recommendedCourses: RecommendedCourse[] = [
  {
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    categoryColor: "text-blue-600",
    title: "TypeScript chuqur",
    lessons: 32,
    hours: 18,
  },
  {
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=60",
    category: "Backend",
    categoryColor: "text-emerald-600",
    title: "Node.js va Express",
    lessons: 40,
    hours: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60",
    category: "Dizayn",
    categoryColor: "text-purple-600",
    title: "Figma bilan prototiplash",
    lessons: 26,
    hours: 14,
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60",
    category: "Data",
    categoryColor: "text-cyan-600",
    title: "SQL va ma'lumotlar bazasi",
    lessons: 22,
    hours: 12,
  },
];
