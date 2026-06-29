import type { Course } from "./courses.data";
import { allCourses } from "./courses.data";

export interface CourseDetailData extends Course {
  longDescription?: string;
  oldPrice: string;
  reviewCount: string;
  studentCount: string;
  language: string;
  format: string;
  certAvailable: boolean;
  features: string[];
  whatYouLearn: string[][];
  forWhom: string[];
  requiredSkills: string[];
  curriculum: { title: string; lessons: { title: string; duration: string }[] }[];
  teacherBio: string;
}

export const courseDetails: Record<string, CourseDetailData> = {
  "javascript-dasturlash": {
    ...allCourses[0],
    oldPrice: "690 000 so'm",
    reviewCount: "312",
    studentCount: "540",
    language: "O'zbek tilida",
    format: "100% online",
    certAvailable: true,
    features: [
      "24 ta video dars",
      "5 ta amaliy loyiha",
      "Sertifikat",
      "Mentor bilan aloqa",
      "Bo'lib to'lash mumkin",
    ],
    whatYouLearn: [
      ["JavaScript asoslari va sintaksisi", "ES6+: arrow, destructuring, spread"],
      ["DOM va sahifa bilan ishlash", "Asinxronlik va Promise"],
      ["Fetch API va REST", "Git va GitHub bilan ishlash"],
      ["OOP printsiplari", "Test yozish (Jest)"],
    ],
    forWhom: [
      "JavaScript bilan tanish bo'lmagan boshlovchilar uchun",
      "Karyerasini o'zgartirmoqchi bo'lganlar uchun",
      "Frontend yoki fullstack dasturchi bo'lishni xohlaganlar uchun",
      "Yangi mahorat o'rganishga qiziqqan har kim uchun",
    ],
    requiredSkills: ["HTML asoslari", "CSS asoslari", "Mantiqiy fikrlash"],
    curriculum: [
      {
        title: "Kirish va asoslar",
        lessons: [
          { title: "JavaScript nima va nima uchun kerak?", duration: "12:30" },
          { title: "O'zgaruvchilar: var, let, const", duration: "18:45" },
          { title: "Ma'lumot turlari", duration: "22:10" },
          { title: "Operatorlar va shartlar", duration: "25:00" },
        ],
      },
      {
        title: "Funksiyalar va OOP",
        lessons: [
          { title: "Funksiyalar va arrow functions", duration: "20:15" },
          { title: "Scope va closure", duration: "28:30" },
          { title: "Prototiplar va klasslar", duration: "35:00" },
          { title: "Modullar (import/export)", duration: "18:20" },
        ],
      },
      {
        title: "Asinxron JavaScript",
        lessons: [
          { title: "Callback funksiyalar", duration: "15:40" },
          { title: "Promise va zanjir", duration: "24:10" },
          { title: "Async/Await", duration: "22:55" },
          { title: "Fetch API va REST API", duration: "30:00" },
        ],
      },
    ],
    teacherBio:
      "Akmal Karimov — Frontend yo'nalishida 8 yillik tajribaga ega dasturchi. EPAM va Uzcard kompaniyalarida Senior Frontend Developer sifatida ishlagan. 12 ta kurs muallifi, 540+ talabani muvaffaqiyatli o'qitgan.",
  },
  "reactjs-asoslari": {
    ...allCourses[1],
    oldPrice: "1 100 000 so'm",
    reviewCount: "245",
    studentCount: "320",
    language: "O'zbek tilida",
    format: "100% online",
    certAvailable: true,
    features: [
      "32 ta video dars",
      "6 ta amaliy loyiha",
      "Sertifikat",
      "Mentor bilan aloqa",
      "Bo'lib to'lash mumkin",
    ],
    whatYouLearn: [
      ["React komponentlari", "Props va State"],
      ["React Hooks (useState, useEffect)", "Context API"],
      ["React Router v6", "Redux Toolkit"],
      ["API bilan ishlash", "Deploy qilish"],
    ],
    forWhom: [
      "JavaScript bilgan dasturchilar uchun",
      "Frontend ko'nikmalarini kengaytirmoqchi bo'lganlar uchun",
      "SPA ilovalar yaratishni o'rganmoqchi bo'lganlar uchun",
      "React bilan ishlashni xohlaganlar uchun",
    ],
    requiredSkills: ["JavaScript asoslari", "HTML/CSS", "ES6+"],
    curriculum: [
      {
        title: "React asoslari",
        lessons: [
          { title: "React nima va nima uchun?", duration: "14:20" },
          { title: "JSX sintaksisi", duration: "20:00" },
          { title: "Komponentlar va Props", duration: "25:30" },
          { title: "State va useState", duration: "28:45" },
        ],
      },
      {
        title: "Hooks va Context",
        lessons: [
          { title: "useEffect Hook", duration: "32:10" },
          { title: "useRef va useCallback", duration: "24:30" },
          { title: "Custom Hooks", duration: "22:15" },
          { title: "Context API", duration: "28:00" },
        ],
      },
    ],
    teacherBio:
      "Nodira Yusupova — 5 yillik React tajribasiga ega dasturchi. Bir nechta yirik fintech mahsulotlarini yaratgan. React va Next.js bo'yicha 6 ta kurs muallifi.",
  },
};

// fallback to first course if slug not found
export const getCourseDetail = (slug: string): CourseDetailData => {
  return courseDetails[slug] ?? { ...allCourses[0], ...courseDetails["javascript-dasturlash"] };
};

export const getRelatedCourses = (slug: string, category: string) => {
  return allCourses.filter((c) => c.slug !== slug && c.category === category).slice(0, 4);
};
