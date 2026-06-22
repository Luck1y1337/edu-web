import type { Icon } from "../components/ui/Icon";

export interface ResultStat {
  value: string | number;
  label: string;
  icon: keyof typeof Icon;
  iconBg: string;
  iconColor: string;
}

export interface ResultTableRow {
  id: string;
  title: string;
  course: string;
  date: string;
  score: string;
  status: "O'tdi" | "Qayta topshirish mumkin";
}
