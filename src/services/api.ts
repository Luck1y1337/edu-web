import axios from "../config/axios";
import Endpoints from "../config/endpoints";
import type {
  AdminPaymentListItemDto,
  AdminStudentDetailDto,
  AdminStudentListItemDto,
  ApiResponse,
  AuthResponseDto,
  BlogCategoryDto,
  BlogPostDetailDto,
  BlogPostListItemDto,
  CertificateDto,
  ChangePasswordDto,
  CheckoutDto,
  CheckoutResponseDto,
  ContactFormDto,
  CreateAdminStudentDto,
  CreateBlogCommentDto,
  CreateReviewDto,
  CurrentUserDto,
  LoginDto,
  PaginatedResponse,
  PublicCourseDto,
  PublicInstructorDto,
  PublicStatsDto,
  PublicTeacherDto,
  PublicTestimonialDto,
  RegisterDto,
  ResetPasswordDto,
  SessionDto,
  StudentEnrollmentDetailDto,
  StudentEnrollmentListItemDto,
  StudentReviewDto,
  UpdateAdminStudentDto,
} from "../types/api.type";

export const unwrapApiData = <T>(response: { data: ApiResponse<T> | T }) => {
  const payload = response.data;
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
};

/* ───────── Auth ───────── */

export const authApi = {
  register: async (body: RegisterDto) => {
    const response = await axios.post<ApiResponse<AuthResponseDto>>(Endpoints.auth.register, body);
    return unwrapApiData<AuthResponseDto>(response);
  },
  login: async (body: LoginDto) => {
    const response = await axios.post<ApiResponse<AuthResponseDto>>(Endpoints.auth.login, body);
    return unwrapApiData<AuthResponseDto>(response);
  },
  logout: async () => {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(Endpoints.auth.logout);
    return unwrapApiData<{ success: boolean }>(response);
  },
  me: async () => {
    const response = await axios.get<ApiResponse<CurrentUserDto>>(Endpoints.auth.me);
    return unwrapApiData<CurrentUserDto>(response);
  },
  forgotPassword: async (email: string) => {
    const response = await axios.post<ApiResponse<{ sent: boolean }>>(
      Endpoints.auth.forgotPassword,
      { email }
    );
    return unwrapApiData<{ sent: boolean }>(response);
  },
  resetPassword: async (body: ResetPasswordDto) => {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(
      Endpoints.auth.resetPassword,
      body
    );
    return unwrapApiData<{ success: boolean }>(response);
  },
  verifyEmail: async (token: string) => {
    const response = await axios.post<ApiResponse<{ verified: boolean }>>(
      Endpoints.auth.verifyEmail,
      { token }
    );
    return unwrapApiData<{ verified: boolean }>(response);
  },
};

/* ───────── User ───────── */

export const userApi = {
  changePassword: async (body: ChangePasswordDto) => {
    const response = await axios.patch<ApiResponse<{ success: boolean }>>(
      Endpoints.user.changePassword,
      body
    );
    return unwrapApiData<{ success: boolean }>(response);
  },
  getSessions: async () => {
    const response = await axios.get<ApiResponse<SessionDto[]>>(Endpoints.user.sessions);
    return unwrapApiData<SessionDto[]>(response);
  },
  revokeSession: async (id: string) => {
    const response = await axios.delete<ApiResponse<{ success: boolean }>>(
      Endpoints.user.session(id)
    );
    return unwrapApiData<{ success: boolean }>(response);
  },
};

/* ───────── Public ───────── */

export const publicApi = {
  getStats: async () => {
    const response = await axios.get<ApiResponse<PublicStatsDto>>(Endpoints.public.stats);
    return unwrapApiData<PublicStatsDto>(response);
  },
  getCourses: async (params?: Record<string, unknown>) => {
    const response = await axios.get<ApiResponse<PaginatedResponse<PublicCourseDto>>>(
      Endpoints.public.courses,
      { params }
    );
    return unwrapApiData<PaginatedResponse<PublicCourseDto>>(response);
  },
  getCourse: async (slug: string) => {
    const response = await axios.get<ApiResponse<PublicCourseDto>>(Endpoints.public.course(slug));
    return unwrapApiData<PublicCourseDto>(response);
  },
  getInstructors: async (params?: Record<string, unknown>) => {
    const response = await axios.get<ApiResponse<PaginatedResponse<PublicInstructorDto>>>(
      Endpoints.public.instructors,
      { params }
    );
    return unwrapApiData<PaginatedResponse<PublicInstructorDto>>(response);
  },
  getInstructor: async (id: string) => {
    const response = await axios.get<ApiResponse<PublicInstructorDto>>(
      Endpoints.public.instructor(id)
    );
    return unwrapApiData<PublicInstructorDto>(response);
  },
  // Backward-compat aliases — UI still says "teachers"
  getTeachers: async (params?: Record<string, unknown>) => {
    const response = await axios.get<ApiResponse<PaginatedResponse<PublicTeacherDto>>>(
      Endpoints.public.instructors,
      { params }
    );
    return unwrapApiData<PaginatedResponse<PublicTeacherDto>>(response);
  },
  getTeacher: async (id: string) => {
    const response = await axios.get<ApiResponse<PublicTeacherDto>>(
      Endpoints.public.instructor(id)
    );
    return unwrapApiData<PublicTeacherDto>(response);
  },
  getTestimonials: async () => {
    const response = await axios.get<ApiResponse<PublicTestimonialDto[]>>(
      Endpoints.public.testimonials
    );
    return unwrapApiData<PublicTestimonialDto[]>(response);
  },
  getBlogPosts: async (params?: Record<string, unknown>) => {
    const response = await axios.get<ApiResponse<PaginatedResponse<BlogPostListItemDto>>>(
      Endpoints.public.blog,
      { params }
    );
    return unwrapApiData<PaginatedResponse<BlogPostListItemDto>>(response);
  },
  getBlogCategories: async () => {
    const response = await axios.get<ApiResponse<BlogCategoryDto[]>>(
      Endpoints.public.blogCategories
    );
    return unwrapApiData<BlogCategoryDto[]>(response);
  },
  getBlogPost: async (slug: string) => {
    const response = await axios.get<ApiResponse<BlogPostDetailDto>>(
      Endpoints.public.blogPost(slug)
    );
    return unwrapApiData<BlogPostDetailDto>(response);
  },
  createBlogComment: async (slug: string, body: CreateBlogCommentDto) => {
    const response = await axios.post<ApiResponse<{ pending: boolean }>>(
      Endpoints.public.blogComment(slug),
      body
    );
    return unwrapApiData<{ pending: boolean }>(response);
  },
  sendContact: async (body: ContactFormDto) => {
    const response = await axios.post<ApiResponse<{ sent: boolean }>>(
      Endpoints.public.contact,
      body
    );
    return unwrapApiData<{ sent: boolean }>(response);
  },
};

/* ───────── Student ───────── */

export const studentApi = {
  getEnrollments: async () => {
    const response = await axios.get<ApiResponse<StudentEnrollmentListItemDto[]>>(
      Endpoints.student.enrollments
    );
    return unwrapApiData<StudentEnrollmentListItemDto[]>(response);
  },
  getEnrollment: async (courseId: string) => {
    const response = await axios.get<ApiResponse<StudentEnrollmentDetailDto>>(
      Endpoints.student.enrollment(courseId)
    );
    return unwrapApiData<StudentEnrollmentDetailDto>(response);
  },
  checkout: async (body: CheckoutDto) => {
    const response = await axios.post<ApiResponse<CheckoutResponseDto>>(
      Endpoints.student.checkout,
      body
    );
    return unwrapApiData<CheckoutResponseDto>(response);
  },
  markLessonProgress: async (
    lessonId: string,
    body: { status: "in_progress" | "completed"; watchedSeconds?: number }
  ) => {
    const response = await axios.post<ApiResponse<{ success: boolean }>>(
      Endpoints.student.lessonProgress(lessonId),
      body
    );
    return unwrapApiData<{ success: boolean }>(response);
  },
  getCertificates: async () => {
    const response = await axios.get<ApiResponse<CertificateDto[]>>(Endpoints.student.certificates);
    return unwrapApiData<CertificateDto[]>(response);
  },
  claimCertificate: async (courseId: string) => {
    const response = await axios.post<ApiResponse<CertificateDto>>(
      Endpoints.student.claimCertificate(courseId)
    );
    return unwrapApiData<CertificateDto>(response);
  },
  createReview: async (body: CreateReviewDto) => {
    const response = await axios.post<ApiResponse<StudentReviewDto>>(
      Endpoints.student.reviews,
      body
    );
    return unwrapApiData<StudentReviewDto>(response);
  },
  getMyReviews: async () => {
    const response = await axios.get<ApiResponse<StudentReviewDto[]>>(
      Endpoints.student.myReviews
    );
    return unwrapApiData<StudentReviewDto[]>(response);
  },
};

/* ───────── Admin ───────── */

export const adminApi = {
  getStudents: async (params?: Record<string, unknown>) => {
    const response = await axios.get<ApiResponse<PaginatedResponse<AdminStudentListItemDto>>>(
      Endpoints.admin.students,
      { params }
    );
    return unwrapApiData<PaginatedResponse<AdminStudentListItemDto>>(response);
  },
  getStudent: async (id: string) => {
    const response = await axios.get<ApiResponse<AdminStudentDetailDto>>(
      Endpoints.admin.student(id)
    );
    return unwrapApiData<AdminStudentDetailDto>(response);
  },
  createStudent: async (body: CreateAdminStudentDto) => {
    const response = await axios.post<ApiResponse<AdminStudentDetailDto>>(
      Endpoints.admin.students,
      body
    );
    return unwrapApiData<AdminStudentDetailDto>(response);
  },
  updateStudent: async (id: string, body: UpdateAdminStudentDto) => {
    const response = await axios.patch<ApiResponse<AdminStudentDetailDto>>(
      Endpoints.admin.student(id),
      body
    );
    return unwrapApiData<AdminStudentDetailDto>(response);
  },
  deleteStudent: async (id: string) => {
    const response = await axios.delete<ApiResponse<{ success: boolean }>>(
      Endpoints.admin.student(id)
    );
    return unwrapApiData<{ success: boolean }>(response);
  },
  getStudentEnrollments: async (id: string) => {
    const response = await axios.get<ApiResponse<StudentEnrollmentListItemDto[]>>(
      Endpoints.admin.studentEnrollments(id)
    );
    return unwrapApiData<StudentEnrollmentListItemDto[]>(response);
  },
  getStudentPayments: async (id: string) => {
    const response = await axios.get<ApiResponse<{ items: AdminPaymentListItemDto[]; totalPaid: number }>>(
      Endpoints.admin.studentPayments(id)
    );
    return unwrapApiData<{ items: AdminPaymentListItemDto[]; totalPaid: number }>(response);
  },
};
