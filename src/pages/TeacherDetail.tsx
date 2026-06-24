import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import TeacherHero from "../components/teacherDetail/TeacherHero";
import TeacherTabs from "../components/teacherDetail/TeacherTabs";
import TeacherSidebar from "../components/teacherDetail/TeacherSidebar";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { publicApi } from "../services/api";
import { mapApiTeacherToDetail } from "../services/mappers";

const TeacherDetail = () => {
  const { id } = useParams<{ id: string }>();
  const teacherId = id || "";

  const teacherQuery = useQuery({
    queryKey: ["public", "instructor", teacherId],
    queryFn: () => publicApi.getInstructor(teacherId),
    enabled: Boolean(teacherId),
    retry: false,
  });

  if (!id) return <Navigate to="/teachers" replace />;

  if (teacherQuery.isLoading) return <GlobalSpinner />;
  if (teacherQuery.isError || !teacherQuery.data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">O'qituvchi topilmadi</h2>
        <p className="mt-2 text-sm text-gray-500">
          Profil olib tashlangan yoki manzili noto'g'ri.
        </p>
      </div>
    );
  }

  const teacher = mapApiTeacherToDetail(teacherQuery.data);

  return (
    <>
      <TeacherHero teacher={teacher} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <TeacherTabs teacher={teacher} />
          </div>
          <TeacherSidebar teacher={teacher} />
        </div>
      </div>
    </>
  );
};

export default TeacherDetail;
