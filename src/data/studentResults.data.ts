import type { ResultStat, ResultTableRow } from "../types/studentResults.type";

export const resultStats: ResultStat[] = [
  {
    value: "87%",
    label: "O'rtacha natija",
    icon: "barChart",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    value: "11",
    label: "Yechilgan testlar",
    icon: "checkSquare",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    value: "10",
    label: "O'tilgan",
    icon: "check",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    value: "95",
    label: "Eng yuqori ball",
    icon: "star",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export const resultRows: ResultTableRow[] = [
  {
    id: "1",
    title: "Modul 4 testi: Hooklar",
    course: "React.js — zamonaviy frontend",
    date: "17-noyabr, 2025",
    score: "88%",
    status: "O'tdi",
  },
  {
    id: "2",
    title: "Amaliyot: Komponentlar",
    course: "React.js — zamonaviy frontend",
    date: "28-oktabr, 2025",
    score: "95%",
    status: "O'tdi",
  },
  {
    id: "3",
    title: "Funksiyalar va sikllar testi",
    course: "Python asoslari",
    date: "15-oktabr, 2025",
    score: "64%",
    status: "Qayta topshirish mumkin",
  },
  {
    id: "4",
    title: "Yakuniy loyiha: Figma maket",
    course: "UX/UI dizayn asoslari",
    date: "03-oktabr, 2025",
    score: "92%",
    status: "O'tdi",
  },
  {
    id: "5",
    title: "Boshlang'ich test: JS asoslari",
    course: "Python asoslari",
    date: "21-sentabr, 2025",
    score: "78%",
    status: "O'tdi",
  },
];
