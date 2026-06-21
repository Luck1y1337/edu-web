export interface Course {
  id: number;
  slug: string;
  image: string;
  category: string;
  badgeBg: string;
  badgeText: string;
  rating: string;
  title: string;
  description: string;
  duration: string;
  lessons: string;
  price: string;
  level: "Boshlovchi" | "O'rtacha" | "Mutaxassis";
  teacher: string;
  teacherAvatar: string;
}

export const allCourses: Course[] = [
  {
    id: 1, slug: "javascript-dasturlash",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=70",
    category: "Frontend", badgeBg: "bg-blue-50", badgeText: "text-blue-700",
    rating: "4.9", title: "JavaScript dasturlash",
    description: "ES6+, DOM, async/await va loyihalar bilan to'liq fullstack tayyorgarlik.",
    duration: "3 oy", lessons: "24 dars", price: "490 000 so'm",
    level: "Boshlovchi", teacher: "Akmal Karimov", teacherAvatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 2, slug: "reactjs-asoslari",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=70",
    category: "Frontend", badgeBg: "bg-blue-50", badgeText: "text-blue-700",
    rating: "4.8", title: "React.js asoslari",
    description: "Komponentlar, Hooks, Router, Context API, Redux bilan SPA yaratish.",
    duration: "4 oy", lessons: "32 dars", price: "790 000 so'm",
    level: "O'rtacha", teacher: "Nodira Yusupova", teacherAvatar: "https://i.pravatar.cc/40?img=47",
  },
  {
    id: 3, slug: "ux-ui-dizayn",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=70",
    category: "Dizayn", badgeBg: "bg-violet-50", badgeText: "text-violet-700",
    rating: "4.9", title: "UX/UI dizayn",
    description: "Figma, foydalanuvchi tadqiqoti, wireframe, prototip va portfolio yaratish.",
    duration: "3 oy", lessons: "28 dars", price: "890 000 so'm",
    level: "Boshlovchi", teacher: "Madina Ergasheva", teacherAvatar: "https://i.pravatar.cc/40?img=45",
  },
  {
    id: 4, slug: "python-dasturlash",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=70",
    category: "Backend", badgeBg: "bg-emerald-50", badgeText: "text-emerald-700",
    rating: "4.7", title: "Python dasturchilik",
    description: "Asoslar, OOP, Django, REST API va ma'lumotlar bazalari bilan ishlash.",
    duration: "4 oy", lessons: "36 dars", price: "790 000 so'm",
    level: "Boshlovchi", teacher: "Sherzod Rahimov", teacherAvatar: "https://i.pravatar.cc/40?img=33",
  },
  {
    id: 5, slug: "flutter-mobil-ilovalar",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=70",
    category: "Mobil", badgeBg: "bg-amber-50", badgeText: "text-amber-700",
    rating: "4.8", title: "Flutter mobil ilovalar",
    description: "Dart tilida iOS va Android uchun cross-platform mobil ilovalar yaratish.",
    duration: "4 oy", lessons: "30 dars", price: "980 000 so'm",
    level: "O'rtacha", teacher: "Otabek Salimov", teacherAvatar: "https://i.pravatar.cc/40?img=14",
  },
  {
    id: 6, slug: "data-science-ml",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=70",
    category: "Data Science", badgeBg: "bg-red-50", badgeText: "text-red-700",
    rating: "4.3", title: "Data Science va ML",
    description: "Pandas, NumPy, vizualizatsiya va Machine Learning asoslari Python tilida.",
    duration: "5 oy", lessons: "40 dars", price: "1 200 000 so'm",
    level: "Mutaxassis", teacher: "Sevara Tursunova", teacherAvatar: "https://i.pravatar.cc/40?img=26",
  },
  {
    id: 7, slug: "devops-muhandisi",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=70",
    category: "DevOps", badgeBg: "bg-slate-100", badgeText: "text-slate-700",
    rating: "4.7", title: "DevOps muhandisi",
    description: "Linux, Docker, Kubernetes, CI/CD pipeline va AWS bulut infratuzilmasi.",
    duration: "6 oy", lessons: "48 dars", price: "1 500 000 so'm",
    level: "Mutaxassis", teacher: "Jasur Mahmudov", teacherAvatar: "https://i.pravatar.cc/40?img=68",
  },
  {
    id: 8, slug: "raqamli-marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=70",
    category: "Marketing", badgeBg: "bg-orange-50", badgeText: "text-orange-700",
    rating: "4.6", title: "Raqamli marketing",
    description: "SMM, kontent marketing, Google Ads, SEO va analitika asoslari.",
    duration: "2 oy", lessons: "20 dars", price: "690 000 so'm",
    level: "Boshlovchi", teacher: "Diloraxon Nazarova", teacherAvatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    id: 9, slug: "nodejs-dasturlash",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=70",
    category: "Backend", badgeBg: "bg-emerald-50", badgeText: "text-emerald-700",
    rating: "4.7", title: "Node.js dasturlash",
    description: "Express.js, MongoDB, REST API va microservices arxitekturasi.",
    duration: "3 oy", lessons: "28 dars", price: "690 000 so'm",
    level: "O'rtacha", teacher: "Sherzod Rahimov", teacherAvatar: "https://i.pravatar.cc/40?img=33",
  },
  {
    id: 10, slug: "html-css-asoslari",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70",
    category: "Frontend", badgeBg: "bg-blue-50", badgeText: "text-blue-700",
    rating: "4.8", title: "HTML & CSS asoslari",
    description: "Zamonaviy HTML5, CSS3, Flexbox, Grid va responsive dizayn asoslari.",
    duration: "1 oy", lessons: "16 dars", price: "390 000 so'm",
    level: "Boshlovchi", teacher: "Akmal Karimov", teacherAvatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 11, slug: "grafik-dizayn",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=70",
    category: "Dizayn", badgeBg: "bg-violet-50", badgeText: "text-violet-700",
    rating: "4.7", title: "Grafik dizayn",
    description: "Adobe Illustrator, Photoshop va branding asoslari professional darajada.",
    duration: "2 oy", lessons: "24 dars", price: "690 000 so'm",
    level: "Boshlovchi", teacher: "Madina Ergasheva", teacherAvatar: "https://i.pravatar.cc/40?img=45",
  },
  {
    id: 12, slug: "typescript-kursi",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=70",
    category: "Frontend", badgeBg: "bg-blue-50", badgeText: "text-blue-700",
    rating: "4.8", title: "TypeScript",
    description: "JavaScript'ning quchli turli versiyasi, dekoratorlar, generics va ilg'or turlari.",
    duration: "2 oy", lessons: "18 dars", price: "590 000 so'm",
    level: "O'rtacha", teacher: "Nodira Yusupova", teacherAvatar: "https://i.pravatar.cc/40?img=47",
  },
];

export const categoryFilters = [
  { name: "Frontend", count: 8 },
  { name: "Backend", count: 6 },
  { name: "Dizayn", count: 5 },
  { name: "Mobil", count: 4 },
  { name: "Data Science", count: 3 },
  { name: "Marketing", count: 4 },
  { name: "DevOps", count: 2 },
];

export const levelFilters = ["Barchasi", "Boshlovchi", "O'rtacha", "Mutaxassis"];
export const durationFilters = ["1–3 oy", "3–6 oy", "6+ oy"];
