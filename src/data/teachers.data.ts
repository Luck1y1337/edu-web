import type { Teacher } from "../types/home.type";
import { teachers } from "./home.data";

export const teacherFilters: string[] = [
  "Barchasi",
  "Frontend",
  "Backend",
  "Dizayn",
  "Mobil",
  "Marketing",
];

export const allTeachers: Teacher[] = [
  ...teachers,
  {
    photo: "https://i.pravatar.cc/150?img=31",
    name: "Diloraxon Nazarova",
    role: "Marketing Expert",
    desc: "7 yillik raqamli marketing tajribasi. Google Ads sertifikatli.",
    courses: "3",
    students: "140",
    rating: "4.8",
  },
  {
    photo: "https://i.pravatar.cc/150?img=53",
    name: "Jasur Mahmudov",
    role: "DevOps muhandisi",
    desc: "9 yillik DevOps tajribasi. AWS va Kubernetes mutaxassisi.",
    courses: "4",
    students: "180",
    rating: "4.7",
  },
  {
    photo: "https://i.pravatar.cc/150?img=59",
    name: "Bekzod Salimov",
    role: "Backend Developer",
    desc: "6 yillik Node.js tajribasi. Yirik fintech loyihalarda ishlagan.",
    courses: "5",
    students: "220",
    rating: "4.7",
  },
  {
    photo: "https://i.pravatar.cc/150?img=20",
    name: "Kamola Yusupova",
    role: "Grafik dizayner",
    desc: "8 yillik tajriba. Adobe sertifikatli mutaxassis.",
    courses: "6",
    students: "280",
    rating: "4.9",
  },
  {
    photo: "https://i.pravatar.cc/150?img=68",
    name: "Aziz Inomov",
    role: "Java Developer",
    desc: "7 yillik enterprise Java tajribasi. Spring mutaxassisi.",
    courses: "4",
    students: "190",
    rating: "4.6",
  },
  {
    photo: "https://i.pravatar.cc/150?img=32",
    name: "Gulnora Rasulova",
    role: "Product Designer",
    desc: "6 yillik mahsulot dizayni tajribasi. Tinkoff loyihasida ishlagan.",
    courses: "7",
    students: "250",
    rating: "4.8",
  },
];
