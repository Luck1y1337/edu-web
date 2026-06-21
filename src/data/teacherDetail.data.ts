export interface TeacherDetailData {
  id: string;
  name: string;
  role: string;
  roleLabel: string;
  photo: string;
  bio: string[];
  shortBio: string;
  stats: { value: string; label: string }[];
  skills: { name: string; highlight: boolean }[];
  experience: {
    period: string;
    role: string;
    company: string;
    description: string;
    current?: boolean;
  }[];
  certificates: { name: string; issuer: string; year: string }[];
  schedule: { day: string; time: string }[];
  courses: number;
  students: number;
  rating: string;
  reviewCount: number;
}

export const teacherDetails: Record<string, TeacherDetailData> = {
  "akmal-karimov": {
    id: "akmal-karimov",
    name: "Akmal Karimov",
    role: "JavaScript Lead",
    roleLabel: "JavaScript Lead",
    photo: "https://i.pravatar.cc/300?img=12",
    shortBio:
      "8 yillik frontend tajriba. EPAM Systems va Uzcard kompaniyalarida ishlagan, hozir O'quv Markazda JavaScript yo'nalishini boshqaradi. AWS sertifikatlangan dasturchi.",
    bio: [
      "Akmal Karimov — frontend dasturlash bo'yicha 8 yillik amaliy tajribaga ega mutaxassis. Karyerasini 2018-yilda EPAM Systems kompaniyasida boshlagan, keyinchalik Uzcard'da to'lov tizimlari uchun yirik frontend ilovalarni ishlab chiqqan.",
      "2022-yildan beri O'quv Markazda JavaScript yo'nalishini boshqaradi. Uning darslari amaliyotga asoslangan: har bir mavzu real loyiha misolida tushuntiriladi. Bitiruvchilarining 78%i kurs tugagach 3 oy ichida ishga joylashgan.",
    ],
    stats: [
      { value: "12", label: "Kurs" },
      { value: "540+", label: "Talaba" },
      { value: "4.9", label: "Reyting" },
      { value: "8 yil", label: "Tajriba" },
    ],
    skills: [
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "React", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "Git", highlight: false },
      { name: "Webpack / Vite", highlight: false },
      { name: "Testing (Jest)", highlight: false },
    ],
    experience: [
      {
        period: "2022 — hozir",
        role: "JavaScript Lead",
        company: "O'quv Markaz, Toshkent",
        description:
          "JavaScript yo'nalishi rahbari. 12 ta kurs muallifi, o'quv dasturlarini ishlab chiqish va yangi o'qituvchilarni tayyorlash.",
        current: true,
      },
      {
        period: "2020 — 2022",
        role: "Senior Frontend Developer",
        company: "Uzcard, Toshkent",
        description:
          "To'lov tizimlari uchun web ilovalar. React + TypeScript stack, 1 mln+ foydalanuvchili mahsulotlar.",
      },
      {
        period: "2018 — 2020",
        role: "Frontend Developer",
        company: "EPAM Systems",
        description:
          "Xalqaro fintech loyihalarida frontend ishlab chiqish, kod sifati bo'yicha mentorlik.",
      },
    ],
    certificates: [
      { name: "AWS Certified Developer", issuer: "Amazon", year: "2024" },
      { name: "Meta Frontend Developer", issuer: "Coursera", year: "2023" },
      { name: "Pedagogika asoslari", issuer: "April", year: "2023" },
    ],
    schedule: [
      { day: "Du / Chor / Ju", time: "08:00 — 20:00" },
      { day: "Sesh / Pay", time: "14:00 — 15:00" },
      { day: "Shanba", time: "12:00 — 12:00" },
    ],
    courses: 12,
    students: 540,
    rating: "4.9",
    reviewCount: 186,
  },
  "madina-ergasheva": {
    id: "madina-ergasheva",
    name: "Madina Ergasheva",
    role: "UX/UI dizayner",
    roleLabel: "UX/UI Lead",
    photo: "https://i.pravatar.cc/300?img=45",
    shortBio:
      "7 yillik tajriba. Yandex va Behance'da chop etilgan loyihalar muallifi. Figma va Adobe XD eksperti.",
    bio: [
      "Madina Ergasheva — UX/UI dizayn bo'yicha 7 yillik tajribaga ega mutaxassis. Karyerasini 2017-yilda Toshkentdagi startaplarda boshlagan.",
      "Hozirda O'quv Markazda dizayn yo'nalishini boshqaradi. Uning 8 kursi 320+ talabani kasbga yo'naltirdi.",
    ],
    stats: [
      { value: "8", label: "Kurs" },
      { value: "320+", label: "Talaba" },
      { value: "4.9", label: "Reyting" },
      { value: "7 yil", label: "Tajriba" },
    ],
    skills: [
      { name: "Figma", highlight: true },
      { name: "Adobe XD", highlight: true },
      { name: "Illustrator", highlight: true },
      { name: "Photoshop", highlight: false },
      { name: "Prototyping", highlight: false },
      { name: "User Research", highlight: false },
    ],
    experience: [
      {
        period: "2021 — hozir",
        role: "UX/UI Lead",
        company: "O'quv Markaz, Toshkent",
        description: "UX/UI yo'nalishi rahbari. 8 ta kurs muallifi.",
        current: true,
      },
      {
        period: "2017 — 2021",
        role: "UI Designer",
        company: "Yandex, Toshkent",
        description: "Mahsulot dizayni, foydalanuvchi tadqiqoti va prototiplash.",
      },
    ],
    certificates: [
      { name: "Google UX Design", issuer: "Coursera", year: "2023" },
      { name: "Figma Advanced", issuer: "Figma Inc.", year: "2022" },
    ],
    schedule: [
      { day: "Du / Chor", time: "10:00 — 18:00" },
      { day: "Juma", time: "10:00 — 14:00" },
    ],
    courses: 8,
    students: 320,
    rating: "4.9",
    reviewCount: 142,
  },
  "sherzod-rahimov": {
    id: "sherzod-rahimov",
    name: "Sherzod Rahimov",
    role: "Python / Django Senior",
    roleLabel: "Python Lead",
    photo: "https://i.pravatar.cc/300?img=33",
    shortBio:
      "Backend dasturchi sifatida 10 yillik tajriba. AWS sertifikatlangan. Django va FastAPI eksperti.",
    bio: [
      "Sherzod Rahimov — backend dasturlash bo'yicha 10 yillik tajribaga ega mutaxassis.",
      "Hozirda O'quv Markazda Python yo'nalishini boshqaradi. 15 ta kurs muallifi.",
    ],
    stats: [
      { value: "15", label: "Kurs" },
      { value: "680+", label: "Talaba" },
      { value: "4.8", label: "Reyting" },
      { value: "10 yil", label: "Tajriba" },
    ],
    skills: [
      { name: "Python", highlight: true },
      { name: "Django", highlight: true },
      { name: "FastAPI", highlight: true },
      { name: "PostgreSQL", highlight: false },
      { name: "Docker", highlight: false },
      { name: "AWS", highlight: false },
    ],
    experience: [
      {
        period: "2020 — hozir",
        role: "Python Lead",
        company: "O'quv Markaz, Toshkent",
        description: "Python/Django yo'nalishi rahbari. 15 ta kurs muallifi.",
        current: true,
      },
      {
        period: "2014 — 2020",
        role: "Senior Backend Developer",
        company: "Texnopark, Toshkent",
        description: "Yirik loyihalarda backend arxitekturasi va API ishlab chiqish.",
      },
    ],
    certificates: [
      { name: "AWS Solutions Architect", issuer: "Amazon", year: "2023" },
      { name: "Python Professional", issuer: "JetBrains", year: "2022" },
    ],
    schedule: [
      { day: "Du / Sesh / Chor", time: "09:00 — 18:00" },
      { day: "Juma", time: "09:00 — 13:00" },
    ],
    courses: 15,
    students: 680,
    rating: "4.8",
    reviewCount: 203,
  },
};

export const allTeachers = Object.values(teacherDetails);

export const getTeacherDetail = (id: string): TeacherDetailData | null => {
  return teacherDetails[id] ?? null;
};

export const getOtherTeachers = (id: string) => {
  return allTeachers.filter((t) => t.id !== id).slice(0, 3);
};
