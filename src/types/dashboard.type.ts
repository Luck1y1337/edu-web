import type { Icon } from "../components/ui/Icon";

export type IconName = keyof typeof Icon;

export interface DashboardNavItem {
  label: string;
  icon: IconName;
  path: string;
}

export interface DashboardNavGroup {
  title: string;
  items: DashboardNavItem[];
}

export interface DashboardStat {
  value: string;
  label: string;
  icon: IconName;
  color: string;
  trend?: string;
}

export interface ActiveCourse {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  teacher: string;
  teacherPhoto: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  progressColor: string;
}

export interface RecommendedCourse {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  lessons: number;
  hours: number;
}

export interface WeekDay {
  label: string;
  status: "done" | "today" | "upcoming";
  value?: string;
}

export interface ContinueLearning {
  image: string;
  title: string;
  module: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}
