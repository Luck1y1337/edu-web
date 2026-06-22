import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { getTeacherDetail, getOtherTeachers } from "../data/teacherDetail.data";
import TeacherHero from "../components/teacherDetail/TeacherHero";
import TeacherTabs from "../components/teacherDetail/TeacherTabs";
import TeacherSidebar from "../components/teacherDetail/TeacherSidebar";
import OtherTeachers from "../components/teacherDetail/OtherTeachers";
import { publicApi } from "../services/api";
import { mapApiTeacherToDetail } from "../services/mappers";

const TeacherDetail = () => {
  const { id } = useParams<{ id: string }>();
  const teacherId = id || "";

  const teacherQuery = useQuery({
    queryKey: ["public", "teacher", teacherId],
    queryFn: () => publicApi.getTeacher(teacherId),
    enabled: Boolean(teacherId),
    retry: false,
  });

  if (!id) return <Navigate to="/teachers" replace />;

  const teacher = teacherQuery.data ? mapApiTeacherToDetail(teacherQuery.data) : getTeacherDetail(id);
  if (!teacher) return <Navigate to="/teachers" replace />;

  const others = getOtherTeachers(id);

  return (
    <>
      {/* Hero */}
      <TeacherHero teacher={teacher} />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Tabs */}
          <div className="min-w-0 flex-1">
            <TeacherTabs teacher={teacher} />
          </div>

          {/* Sidebar */}
          <TeacherSidebar teacher={teacher} />
        </div>
      </div>

      {/* Other teachers */}
      <OtherTeachers teachers={others} />
    </>
  );
};

export default TeacherDetail;
