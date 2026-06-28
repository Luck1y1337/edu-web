import type { Advantage, Faq, NavLink, Stat, Teacher } from "../types/home.type";

export const navLinks: NavLink[] = [
  { label: "Bosh sahifa", path: "/" },
  { label: "Kurslar", path: "/courses" },
  { label: "O'qituvchilar", path: "/teachers" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
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
  { label: "FAQ", path: "/faq" },
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
