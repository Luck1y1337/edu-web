export type BadgeColor = "blue" | "green" | "yellow" | "red" | "purple";

export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  badgeColor: BadgeColor;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  authorName: string;
  authorAvatar: string;
  featured?: boolean;
  featuredLabel?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 0,
    slug: "dasturchilik-karyerasi-2026",
    category: "Karyera",
    badgeColor: "blue",
    date: "15-may, 2026",
    readTime: "8 daqiqalik o'qish",
    title: "2026-yilda dasturchilik karyerasini qanday boshlash kerak?",
    excerpt:
      "Sohaga endi qadam tashlayotganlarga atroflicha qo'llanma. Qaysi yo'nalishni tanlash, qancha vaqt ketadi va birinchi ishga qanday tayyorlanish bo'yicha amaliy tavsiyalar.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    authorName: "Akmal Karimov",
    authorAvatar: "https://i.pravatar.cc/60?img=12",
    featured: true,
    featuredLabel: "TANLANGAN · 2026-yil eng yaxshi maqola",
  },
  {
    id: 1,
    slug: "react-19-yangiliklar",
    category: "Frontend",
    badgeColor: "blue",
    date: "10-may",
    readTime: "5 daqiqa",
    title: "React 19'dagi yangi xususiyatlar",
    excerpt:
      "React 19 muhim yangiliklari: Server Components, Actions va concurrent rendering yaxshilanishlari.",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=70",
    authorName: "Nodira Yusupova",
    authorAvatar: "https://i.pravatar.cc/40?img=47",
  },
  {
    id: 2,
    slug: "ux-ui-xatolar",
    category: "Dizayn",
    badgeColor: "purple",
    date: "8-may",
    readTime: "6 daqiqa",
    title: "UX/UI dizaynda 10 ta keng tarqalgan xato",
    excerpt:
      "Yangi dizaynerlar yo'l qo'yadigan asosiy xatolar va ularni qanday tuzatish kerakligi haqida.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=70",
    authorName: "Madina Ergasheva",
    authorAvatar: "https://i.pravatar.cc/40?img=45",
  },
  {
    id: 3,
    slug: "django-vs-flask",
    category: "Backend",
    badgeColor: "green",
    date: "5-may",
    readTime: "7 daqiqa",
    title: "Django vs Flask: qaysi birini tanlash?",
    excerpt:
      "Ikki ommabop Python framework'ini taqqoslash. Qaysi loyiha uchun qaysi biri mos keladi.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=70",
    authorName: "Sherzod Rahimov",
    authorAvatar: "https://i.pravatar.cc/40?img=33",
  },
  {
    id: 4,
    slug: "flutter-birinchi-ilova",
    category: "Mobil",
    badgeColor: "yellow",
    date: "2-may",
    readTime: "4 daqiqa",
    title: "Flutter bilan birinchi ilovani 1 kunda yaratish",
    excerpt:
      "Boshlovchilar uchun Flutter qo'llanmasi. Sozlash, asoslar va birinchi ilovani yaratish.",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=70",
    authorName: "Otabek Salimov",
    authorAvatar: "https://i.pravatar.cc/40?img=14",
  },
  {
    id: 5,
    slug: "machine-learning-boshlash",
    category: "Data Science",
    badgeColor: "red",
    date: "28-aprel",
    readTime: "9 daqiqa",
    title: "Machine Learning'ga nimadan boshlash kerak?",
    excerpt:
      "ML olamiga kirishni rejalashtirayotganlar uchun yo'l xaritasi va resurslar.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=70",
    authorName: "Sevara Tursunova",
    authorAvatar: "https://i.pravatar.cc/40?img=26",
  },
  {
    id: 6,
    slug: "smm-strategiya",
    category: "Marketing",
    badgeColor: "blue",
    date: "25-aprel",
    readTime: "5 daqiqa",
    title: "2026-yilda SMM strategiyasi: nima o'zgardi?",
    excerpt:
      "Ijtimoiy tarmoqlarda auditoriyani jalb qilishning zamonaviy usullari va trendlar.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=70",
    authorName: "Diloraxon Nazarova",
    authorAvatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    id: 7,
    slug: "docker-5-usul",
    category: "DevOps",
    badgeColor: "blue",
    date: "20-aprel",
    readTime: "6 daqiqa",
    title: "Docker bilan ishlashning 5 ta amaliy usuli",
    excerpt:
      "Konteynerlashtirish asoslari va real loyihalarda Docker'dan samarali foydalanish.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=70",
    authorName: "Jasur Mahmudov",
    authorAvatar: "https://i.pravatar.cc/40?img=68",
  },
  {
    id: 8,
    slug: "css-grid-vs-flexbox",
    category: "Frontend",
    badgeColor: "blue",
    date: "15-aprel",
    readTime: "5 daqiqa",
    title: "CSS Grid yoki Flexbox: qaysi biridan foydalanish?",
    excerpt:
      "Ikki kuchli CSS layout tizimini taqqoslash va har birini qachon qo'llash haqida.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=70",
    authorName: "Akmal Karimov",
    authorAvatar: "https://i.pravatar.cc/40?img=12",
  },
];

export const blogCategories = [
  { name: "Frontend", count: 12 },
  { name: "Backend", count: 8 },
  { name: "Dizayn", count: 7 },
  { name: "Mobil", count: 5 },
  { name: "Data Science", count: 4 },
  { name: "Marketing", count: 3 },
  { name: "DevOps", count: 2 },
];

export const badgeStyles: Record<BadgeColor, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700" },
  yellow: { bg: "bg-amber-50", text: "text-amber-700" },
  red: { bg: "bg-red-50", text: "text-red-700" },
  purple: { bg: "bg-violet-50", text: "text-violet-700" },
};
