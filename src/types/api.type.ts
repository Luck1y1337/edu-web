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

/* ───────── Auth / User ───────── */

export type UserRole = "super_admin" | "admin" | "instructor" | "student";
export type UserStatus = "active" | "inactive" | "banned";

export interface CurrentUserDto {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatarUrl?: string | null;
  emailVerifiedAt?: string | null;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthResponseDto {
  user: CurrentUserDto;
  tokens: AuthTokensDto;
}

export interface RegisterDto {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: "male" | "female";
}

export interface LoginDto {
  identifier: string;
  password: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface SessionDto {
  id: string;
  device?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  createdAt: string;
  current?: boolean;
}

/* ───────── Public ───────── */

export interface PublicStatsDto {
  students: number;
  teachers: number;
  courses: number;
  graduates: number;
  certificates?: number;
  instructors?: number;
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

export type PublicInstructorDto = PublicTeacherDto;

export interface PublicTestimonialDto {
  id: string;
  rating: number;
  comment: string;
  createdAt?: string;
  student?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string | null;
  } | null;
  course?: {
    name?: string;
    slug?: string;
  } | null;
}

/* ───────── Blog ───────── */

export interface BlogCategoryDto {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface BlogPostListItemDto {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  category?: BlogCategoryDto | null;
  publishedAt?: string | null;
  readMinutes?: number;
  isFeatured?: boolean;
  author?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string | null;
  } | null;
}

export interface BlogCommentDto {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface BlogPostDetailDto extends BlogPostListItemDto {
  content: string;
  comments?: BlogCommentDto[];
}

export interface CreateBlogCommentDto {
  authorName: string;
  authorEmail?: string;
  content: string;
}

/* ───────── Contact ───────── */

export interface ContactFormDto {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/* ───────── Student ───────── */

export type EnrollmentStatus = "active" | "completed" | "cancelled" | "pending";

export interface LessonProgressDto {
  lessonId: string;
  status: "not_started" | "in_progress" | "completed";
  watchedSeconds?: number;
  completedAt?: string | null;
}

export interface EnrollmentLessonDto {
  id: string;
  title: string;
  order?: number;
  durationMinutes?: number;
  videoUrl?: string | null;
  content?: string | null;
  isFree?: boolean;
  progress?: LessonProgressDto | null;
}

export interface EnrollmentModuleDto {
  id: string;
  title: string;
  order?: number;
  lessons: EnrollmentLessonDto[];
}

export interface StudentEnrollmentListItemDto {
  id: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt?: string | null;
  progressPercent: number;
  course: {
    id: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    category?: string;
    durationMonths?: number;
    lessonsCount?: number;
  };
}

export interface StudentEnrollmentDetailDto extends StudentEnrollmentListItemDto {
  course: StudentEnrollmentListItemDto["course"] & {
    description?: string;
    longDescription?: string;
  };
  modules: EnrollmentModuleDto[];
}

export interface CheckoutDto {
  courseId: string;
  paymentMethod: "card" | "click" | "payme" | "cash";
  promoCode?: string;
}

export interface CheckoutResponseDto {
  enrollmentId: string;
  paymentId?: string;
  status: EnrollmentStatus;
}

/* ───────── Certificates ───────── */

export interface CertificateDto {
  id: string;
  serialNumber: string;
  issuedAt: string;
  revokedAt?: string | null;
  pdfUrl?: string | null;
  course: {
    id: string;
    name: string;
    slug: string;
  };
}

/* ───────── Reviews ───────── */

export interface CreateReviewDto {
  courseId: string;
  rating: number;
  comment: string;
}

export interface StudentReviewDto {
  id: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  course?: {
    name: string;
    slug: string;
  };
}

/* ───────── Admin · Students ───────── */

export type AdminStudentStatus = "active" | "inactive" | "graduated";

export interface AdminStudentListItemDto {
  id: string;
  status: AdminStudentStatus;
  enrolledAt?: string | null;
  address?: string | null;
  birthDate?: string | null;
  gender?: "male" | "female" | null;
  enrollmentsCount?: number;
  totalPaid?: number;
  user: {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    avatarUrl?: string | null;
    status: UserStatus;
    createdAt?: string;
  };
}

export interface AdminStudentDetailDto extends AdminStudentListItemDto {
  enrollments?: StudentEnrollmentListItemDto[];
  totalPaidAmount?: number;
}

export interface CreateAdminStudentDto {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: "male" | "female";
  address?: string;
  enrolledAt?: string;
  status?: AdminStudentStatus;
}

export interface UpdateAdminStudentDto {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
  gender?: "male" | "female";
  address?: string;
  enrolledAt?: string;
  status?: AdminStudentStatus;
  userStatus?: UserStatus;
}

/* ───────── Admin · Payments (used on profile page) ───────── */

export type AdminPaymentStatus = "pending" | "paid" | "partial" | "refunded" | "cancelled";
export type AdminPaymentMethod = "card" | "click" | "payme" | "cash";

export interface AdminPaymentListItemDto {
  id: string;
  amount: number;
  status: AdminPaymentStatus;
  method: AdminPaymentMethod;
  paidAt?: string | null;
  createdAt: string;
  course?: {
    id: string;
    name: string;
    slug?: string;
  } | null;
  student?: {
    id: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

/* ───────── Admin · Instructors ───────── */

export type AdminInstructorStatus = "active" | "inactive";

export interface InstructorSocialLinksDto {
  github?: string;
  linkedin?: string;
  telegram?: string;
}

export interface AdminInstructorListItemDto {
  id: string;
  specialty: string;
  experience?: number;
  bio?: string | null;
  status: AdminInstructorStatus;
  rating?: number | string | null;
  socialLinks?: InstructorSocialLinksDto | null;
  coursesCount?: number;
  studentsCount?: number;
  user: {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    avatarUrl?: string | null;
    status: UserStatus;
    createdAt?: string;
  };
}

export interface AdminInstructorDetailDto extends AdminInstructorListItemDto {}

export interface CreateInstructorDto {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: "male" | "female";
  address?: string;
  specialty: string;
  experience?: number;
  bio?: string;
  socialLinks?: InstructorSocialLinksDto;
  status?: AdminInstructorStatus;
}

export interface UpdateInstructorDto {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
  gender?: "male" | "female";
  address?: string;
  specialty?: string;
  experience?: number;
  bio?: string;
  socialLinks?: InstructorSocialLinksDto;
  status?: AdminInstructorStatus;
  userStatus?: UserStatus;
}

/* ───────── Admin · Courses ───────── */

export type AdminCourseStatus = "published" | "draft" | "archived";

export interface CreateCourseLessonDto {
  title: string;
  durationMinutes: number;
  order: number;
  videoUrl?: string;
  content?: string;
  isPreview?: boolean;
}

export interface CreateCourseModuleDto {
  title: string;
  order: number;
  lessons?: CreateCourseLessonDto[];
}

export interface AdminCourseListItemDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  oldPrice?: number | null;
  durationMonths: number;
  lessonsCount: number;
  imageUrl?: string | null;
  isFeatured?: boolean;
  status: AdminCourseStatus;
  studentsCount?: number;
  instructor?: {
    id: string;
    firstName?: string;
    lastName?: string;
  } | null;
  createdAt?: string;
}

export interface AdminCourseDetailDto extends AdminCourseListItemDto {
  longDescription?: string;
  previewVideoUrl?: string | null;
  instructorId?: string | null;
  modules?: {
    id: string;
    title: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      order: number;
      durationMinutes: number;
      videoUrl?: string | null;
      content?: string | null;
      isPreview?: boolean;
    }[];
  }[];
}

export interface CreateCourseDto {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  level?: "beginner" | "intermediate" | "advanced";
  price: number;
  oldPrice?: number;
  durationMonths: number;
  lessonsCount?: number;
  imageUrl?: string;
  previewVideoUrl?: string;
  instructorId?: string;
  isFeatured?: boolean;
  status?: AdminCourseStatus;
  modules?: CreateCourseModuleDto[];
}

export interface UpdateCourseDto {
  name?: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  price?: number;
  oldPrice?: number;
  durationMonths?: number;
  lessonsCount?: number;
  imageUrl?: string;
  previewVideoUrl?: string;
  instructorId?: string;
  isFeatured?: boolean;
  status?: AdminCourseStatus;
  modules?: CreateCourseModuleDto[];
}
