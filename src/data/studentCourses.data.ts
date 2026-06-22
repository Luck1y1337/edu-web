export interface ActiveCourse {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  teacher: string;
  teacherAvatar: string;
  thumbnail: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  progress: number; // 0–100
}

export interface CompletedCourse {
  id: string;
  title: string;
  category: string;
  teacher: string;
  teacherAvatar: string;
  thumbnail: string;
  score: number;
  grade: string; // A'lo, Yaxshi, Qoniqarli
}

export const stats = [
  { value: "3", label: "Davom etayotgan", iconBg: "#EFF6FF", iconColor: "#2563EB", type: "courses" },
  { value: "2", label: "Tugallangan",     iconBg: "#ECFDF5", iconColor: "#059669", type: "check" },
  { value: "2", label: "Sertifikatlar",   iconBg: "#F5F3FF", iconColor: "#7C3AED", type: "cert" },
  { value: "47", label: "O'rganilgan soat", iconBg: "#FFFBEB", iconColor: "#D97706", type: "clock" },
];

export const activeCourses: ActiveCourse[] = [
  {
    id: "react-zamonaviy-frontend",
    title: "React.js — zamonaviy frontend",
    category: "Frontend",
    categoryColor: "#1D4ED8",
    teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/48?img=11",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=280&fit=crop",
    lessonsCompleted: 14,
    lessonsTotal: 32,
    progress: 62,
  },
  {
    id: "python-asoslari",
    title: "Python asoslari",
    category: "Backend",
    categoryColor: "#D97706",
    teacher: "Dilnoza Yusupova",
    teacherAvatar: "https://i.pravatar.cc/48?img=5",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=280&fit=crop",
    lessonsCompleted: 8,
    lessonsTotal: 24,
    progress: 33,
  },
  {
    id: "ux-ui-dizayn-asoslari",
    title: "UX/UI dizayn asoslari",
    category: "Dizayn",
    categoryColor: "#7C3AED",
    teacher: "Sardor Aliyev",
    teacherAvatar: "https://i.pravatar.cc/48?img=7",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=280&fit=crop",
    lessonsCompleted: 19,
    lessonsTotal: 20,
    progress: 95,
  },
];

export const completedCourses: CompletedCourse[] = [
  {
    id: "javascript-asoslari",
    title: "JavaScript asoslari",
    category: "Frontend",
    teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/48?img=11",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=280&fit=crop",
    score: 94,
    grade: "A'lo",
  },
  {
    id: "git-va-github",
    title: "Git va GitHub",
    category: "DevOps",
    teacher: "Jasur Rahimov",
    teacherAvatar: "https://i.pravatar.cc/48?img=15",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=280&fit=crop",
    score: 86,
    grade: "Yaxshi",
  },
];
