import type {
  Advantage,
  Course,
  Faq,
  NavLink,
  Stat,
  Teacher,
  Testimonial,
} from "../types/home.type";

export const navLinks: NavLink[] = [
  { label: "Bosh sahifa", path: "/" },
  { label: "Kurslar", path: "/courses" },
  { label: "O'qituvchilar", path: "/teachers" },
  { label: "Blog", path: "/blog" },
  { label: "Aloqa", path: "/contact" },
];

export const heroFeatures: string[] = [
  "Sertifikat",
  "Ish ta'minoti",
  "Bo'lib to'lash",
];

export const stats: Stat[] = [
  { value: "5 000+", label: "Bitiruvchilar", color: "bg-blue-50 text-blue-600" },
  { value: "35+", label: "Kurslar", color: "bg-purple-50 text-purple-600" },
  {
    value: "42",
    label: "Tajribali o'qituvchi",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    value: "94%",
    label: "Ish bilan ta'minlanish",
    color: "bg-orange-50 text-orange-600",
  },
];

export const courses: Course[] = [
  {
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    rating: "4.9",
    reviews: "312",
    title: "JavaScript dasturlash",
    desc: "Noldan boshlab darajagacha bo'lgan to'liq JavaScript kursi. ES6+, DOM, asinxron dasturlash.",
    teacher: "Akmal Karimov",
    price: "490 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    rating: "4.8",
    reviews: "245",
    title: "React.js asoslari",
    desc: "Komponentlar asosida SPA yaratish, Hooks, Router, Context API va Redux bilan ishlash.",
    teacher: "Nodira Yusupova",
    price: "790 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=60",
    category: "Dizayn",
    rating: "4.9",
    reviews: "198",
    title: "UX/UI dizayn",
    desc: "Figma, foydalanuvchi tadqiqoti, wireframe, prototip va portfolio yaratish.",
    teacher: "Madina Ergasheva",
    price: "890 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=60",
    category: "Backend",
    rating: "4.7",
    reviews: "276",
    title: "Python dasturchilik",
    desc: "Asoslar, OOP, Django, REST API va ma'lumotlar bazalari bilan ishlash.",
    teacher: "Sherzod Rahimov",
    price: "790 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=60",
    category: "Mobil",
    rating: "4.8",
    reviews: "167",
    title: "Flutter mobil ilovalar",
    desc: "Dart tilida iOS va Android uchun cross-platform mobil ilovalar yaratish.",
    teacher: "Otabek Salimov",
    price: "990 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60",
    category: "Data Science",
    rating: "4.9",
    reviews: "134",
    title: "Data Science va ML",
    desc: "Pandas, NumPy, vizualizatsiya va Machine Learning asoslari Python tilida.",
    teacher: "Sevara Tursunova",
    price: "1 200 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=60",
    category: "DevOps",
    rating: "4.7",
    reviews: "112",
    title: "DevOps muhandisi",
    desc: "Linux, Docker, Kubernetes, CI/CD pipeline va AWS bulut infratuzilmasi.",
    teacher: "Jasur Mahmudov",
    price: "1 500 000 so'm",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60",
    category: "Marketing",
    rating: "4.6",
    reviews: "203",
    title: "Raqamli marketing",
    desc: "SMM, kontent marketing, Google Ads, SEO va analitika asoslari.",
    teacher: "Dilorom Nazarova",
    price: "690 000 so'm",
  },
];

export const advantages: Advantage[] = [
  {
    icon: "✓",
    color: "bg-blue-50 text-blue-600",
    title: "Tajribali o'qituvchilar",
    desc: "Sohada 5+ yillik amaliy tajribaga ega mutaxassislar darslarni olib boradi.",
  },
  {
    icon: "▦",
    color: "bg-purple-50 text-purple-600",
    title: "Zamonaviy dasturlar",
    desc: "Mehnat bozorida talab qilinadigan eng so'nggi texnologiyalar va metodlar.",
  },
  {
    icon: "✆",
    color: "bg-emerald-50 text-emerald-600",
    title: "Doimiy maslahat",
    desc: "Mentor va o'qituvchilarga istalgan vaqtda murojaat qilish imkoniyati.",
  },
  {
    icon: "🏅",
    color: "bg-orange-50 text-orange-600",
    title: "Sertifikat",
    desc: "Bitirgan har bir talaba davlat tomonidan tan olingan sertifikatga ega bo'ladi.",
  },
  {
    icon: "💻",
    color: "bg-cyan-50 text-cyan-600",
    title: "Amaliy loyihalar",
    desc: "Har bir kursda real biznes muammolarini hal qiluvchi 5+ amaliy loyiha.",
  },
  {
    icon: "💼",
    color: "bg-red-50 text-red-600",
    title: "Ish ta'minoti",
    desc: "100+ kompaniya bilan hamkorlik. Eng yaxshi bitiruvchilarni ishga joylashtiramiz.",
  },
];

export const teachers: Teacher[] = [
  {
    photo: "https://i.pravatar.cc/150?img=12",
    name: "Akmal Karimov",
    role: "JavaScript Lead",
    desc: "Frontend yo'nalishida 8 yillik tajriba. EPAM va Uzcard kompaniyalarida ishlagan.",
    courses: "12",
    students: "540",
    rating: "4.9",
  },
  {
    photo: "https://i.pravatar.cc/150?img=45",
    name: "Madina Ergasheva",
    role: "UX/UI dizayner",
    desc: "7 yillik tajriba. Yandex va Behance'da chop etilgan loyihalar muallifi.",
    courses: "8",
    students: "320",
    rating: "4.9",
  },
  {
    photo: "https://i.pravatar.cc/150?img=33",
    name: "Sherzod Rahimov",
    role: "Python / Django Senior",
    desc: "Backend dasturchi sifatida 10 yillik tajriba. AWS sertifikatlangan.",
    courses: "15",
    students: "680",
    rating: "4.8",
  },
  {
    photo: "https://i.pravatar.cc/150?img=47",
    name: "Nodira Yusupova",
    role: "React Developer",
    desc: "5 yillik React tajribasi. Bir nechta yirik fintech mahsulotlarini yaratgan.",
    courses: "6",
    students: "280",
    rating: "4.8",
  },
  {
    photo: "https://i.pravatar.cc/150?img=26",
    name: "Sevara Tursunova",
    role: "Data Scientist",
    desc: "Mashinaviy o'qganish bo'yicha 6 yillik tajriba. Kaggle Master.",
    courses: "4",
    students: "160",
    rating: "4.7",
  },
  {
    photo: "https://i.pravatar.cc/150?img=14",
    name: "Otabek Salimov",
    role: "Flutter Developer",
    desc: "Mobil ilovalar yaratish bo'yicha 5+ yillik tajriba va 30+ ilova.",
    courses: "5",
    students: "210",
    rating: "4.8",
  },
];

export const testimonials: Testimonial[] = [
  {
    text: "\"JavaScript kursini tugatganidan keyin 2 hafta ichida ishga kirdim. O'qituvchilar har bir savolimga sabr bilan javob berishdi. Tavsiya qilaman!\"",
    photo: "https://i.pravatar.cc/100?img=11",
    name: "Bobur Tojiev",
    role: "Frontend Developer, Uzum",
  },
  {
    text: "\"UX/UI kursi mening hayotimni o'zgartirdi. Hech narsadan boshlaganman, hozir esa xalqaro kompaniyada dizayner bo'lib ishlayman.\"",
    photo: "https://i.pravatar.cc/100?img=44",
    name: "Zilola Ahmedova",
    role: "Product Designer, EPAM",
  },
  {
    text: "\"Python kursi juda yaxshi tashkillashtirilgan. O'qituvchi har bir mavzuni amaliy misol bilan tushuntirdi. Endi backend dasturchi sifatida ishlayman.\"",
    photo: "https://i.pravatar.cc/100?img=15",
    name: "Rustam Olimov",
    role: "Backend Developer, Inha University",
  },
];

export const faqs: Faq[] = [
  {
    question: "O'quv markaziga qanday yozilish mumkin?",
    answer:
      "Saytdagi \"Ro'yxatdan o'tish\" tugmasini bosing yoki ofisimizga keling. Konsultantlarimiz sizga eng mos kursni tanlashda yordam berishadi va to'lov shartlari haqida ma'lumot beradi.",
  },
  {
    question: "Darslar qachon va qayerda bo'lib o'tadi?",
    answer:
      "Darslar haftada 3 kun, ertalabki va kechki guruhlarda olib boriladi. Manzil: Amir Temur ko'chasi 108, Toshkent.",
  },
  {
    question: "To'lov qaysi usullar orqali amalga oshiriladi?",
    answer:
      "Naqd, Payme, Click, Uzum va bank o'tkazmasi orqali to'lash mumkin. Bo'lib to'lash imkoniyati ham mavjud.",
  },
  {
    question: "Sertifikat beriladimi va u tan olinadimi?",
    answer:
      "Ha, kursni muvaffaqiyatli tugatgan har bir talabaga sertifikat beriladi. Sertifikat hamkor kompaniyalar tomonidan tan olinadi.",
  },
  {
    question: "Online va offline kurslar o'rtasidagi farq nimada?",
    answer:
      "Dastur bir xil, faqat format farq qiladi. Online kurslarda darslar yozuvi saqlanib qoladi, offline kurslarda esa jonli muloqot ko'proq.",
  },
  {
    question: "Ishga joylashishda yordam berasizmi?",
    answer:
      "Albatta. 100+ hamkor kompaniyalarimiz bor. Eng yaxshi bitiruvchilarni ishga joylashtiramiz hamda CV va intervyuga tayyorlaymiz.",
  },
];

export const footerPages: NavLink[] = [
  { label: "Bosh sahifa", path: "/" },
  { label: "Kurslar", path: "/courses" },
  { label: "O'qituvchilar", path: "/teachers" },
  { label: "Blog", path: "/blog" },
  { label: "Biz haqimizda", path: "/about" },
  { label: "Aloqa", path: "/contact" },
];

export const footerCourses: NavLink[] = [
  { label: "Frontend", path: "/courses" },
  { label: "Backend", path: "/courses" },
  { label: "UX/UI Dizayn", path: "/courses" },
  { label: "Mobil dasturlash", path: "/courses" },
  { label: "Marketing", path: "/courses" },
];

export const socials: string[] = [
  "Telegram",
  "Instagram",
  "Facebook",
  "YouTube",
];
