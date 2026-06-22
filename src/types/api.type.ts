export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PublicStatsDto {
  students: number;
  teachers: number;
  courses: number;
  graduates: number;
}

export interface PublicCourseDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  oldPrice?: number | null;
  durationMonths: number;
  lessonsCount: number;
  imageUrl?: string | null;
  isFeatured?: boolean;
  rating?: number | string;
  teacher?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    user?: {
      firstName?: string;
      lastName?: string;
      avatarUrl?: string | null;
    };
  } | null;
  modules?: {
    title: string;
    lessons?: {
      title: string;
      durationMinutes?: number;
      order?: number;
    }[];
  }[];
}

export interface PublicTeacherDto {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatarUrl?: string | null;
  specialty: string;
  experience?: number;
  bio?: string | null;
  rating?: number | string | null;
  socialLinks?: Record<string, string> | null;
}
