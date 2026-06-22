import axios from "../config/axios";
import Endpoints from "../config/endpoints";
import type {
  ApiResponse,
  PaginatedResponse,
  PublicCourseDto,
  PublicStatsDto,
  PublicTeacherDto,
} from "../types/api.type";

export const unwrapApiData = <T>(response: { data: ApiResponse<T> | T }) => {
  const payload = response.data;
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
};

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
  getTeachers: async (params?: Record<string, unknown>) => {
    const response = await axios.get<ApiResponse<PaginatedResponse<PublicTeacherDto>>>(
      Endpoints.public.teachers,
      { params }
    );
    return unwrapApiData<PaginatedResponse<PublicTeacherDto>>(response);
  },
  getTeacher: async (id: string) => {
    const response = await axios.get<ApiResponse<PublicTeacherDto>>(Endpoints.public.teacher(id));
    return unwrapApiData<PublicTeacherDto>(response);
  },
};
