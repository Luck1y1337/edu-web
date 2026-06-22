import type { Course as HomeCourse, Stat, Teacher } from "../types/home.type";
import type { Course } from "../data/courses.data";
import type { CourseDetailData } from "../data/courseDetail.data";
import type { TeacherDetailData } from "../data/teacherDetail.data";
import type { PublicCourseDto, PublicStatsDto, PublicTeacherDto } from "../types/api.type";

const levelLabels: Record<PublicCourseDto["level"], Course["level"]> = {
  beginner: "Boshlovchi",
  intermediate: "O'rtacha",
  advanced: "Mutaxassis",
};

const badgeByCategory: Record<string, { badgeBg: string; badgeText: string }> = {
  frontend: { badgeBg: "bg-blue-50", badgeText: "text-blue-700" },
  backend: { badgeBg: "bg-emerald-50", badgeText: "text-emerald-700" },
  design: { badgeBg: "bg-violet-50", badgeText: "text-violet-700" },
  dizayn: { badgeBg: "bg-violet-50", badgeText: "text-violet-700" },
  mobile: { badgeBg: "bg-amber-50", badgeText: "text-amber-700" },
  mobil: { badgeBg: "bg-amber-50", badgeText: "text-amber-700" },
  marketing: { badgeBg: "bg-orange-50", badgeText: "text-orange-700" },
  devops: { badgeBg: "bg-slate-100", badgeText: "text-slate-700" },
};

const defaultCourseImage =
  "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=70";
const defaultTeacherPhoto = "https://i.pravatar.cc/150?img=12";

export const formatPrice = (price?: number | null) => {
  if (!price) return "Bepul";
  return `${new Intl.NumberFormat("uz-UZ").format(price)} so'm`;
};

const normalizeCategory = (category: string) =>
  category ? category.charAt(0).toUpperCase() + category.slice(1) : "Kurs";

const getTeacherName = (course: PublicCourseDto) => {
  const user = course.teacher?.user;
  const firstName = user?.firstName || course.teacher?.firstName;
  const lastName = user?.lastName || course.teacher?.lastName;
  return [firstName, lastName].filter(Boolean).join(" ") || "O'qituvchi";
};

export const mapApiCourseToCourse = (course: PublicCourseDto, index: number): Course => {
  const categoryKey = course.category?.toLowerCase() || "frontend";
  const badge = badgeByCategory[categoryKey] || badgeByCategory.frontend;

  return {
    id: index + 1,
    slug: course.slug,
    image: course.imageUrl || defaultCourseImage,
    category: normalizeCategory(course.category),
    badgeBg: badge.badgeBg,
    badgeText: badge.badgeText,
    rating: String(course.rating || "4.8"),
    title: course.name,
    description: course.description,
    duration: `${course.durationMonths} oy`,
    lessons: `${course.lessonsCount || 0} dars`,
    price: formatPrice(course.price),
    level: levelLabels[course.level] || "Boshlovchi",
    teacher: getTeacherName(course),
    teacherAvatar: course.teacher?.user?.avatarUrl || defaultTeacherPhoto,
  };
};

export const mapApiCourseToHomeCourse = (course: PublicCourseDto): HomeCourse => ({
  image: course.imageUrl || defaultCourseImage,
  category: normalizeCategory(course.category),
  rating: String(course.rating || "4.8"),
  reviews: "0",
  title: course.name,
  desc: course.description,
  teacher: getTeacherName(course),
  price: formatPrice(course.price),
});

export const mapApiCourseToDetail = (course: PublicCourseDto, index = 0): CourseDetailData => {
  const mapped = mapApiCourseToCourse(course, index);
  const curriculum = course.modules?.map((module) => ({
    title: module.title,
    lessons: (module.lessons || []).map((lesson) => ({
      title: lesson.title,
      duration: lesson.durationMinutes ? `${lesson.durationMinutes} daqiqa` : "Dars",
    })),
  }));

  return {
    ...mapped,
    oldPrice: formatPrice(course.oldPrice),
    reviewCount: "0",
    studentCount: "0",
    language: "O'zbek tilida",
    format: "Online / offline",
    certAvailable: true,
    features: [
      mapped.lessons,
      `${course.durationMonths} oy`,
      "Sertifikat",
      "Mentor bilan aloqa",
      "Bo'lib to'lash mumkin",
    ],
    whatYouLearn: [[course.description], [course.longDescription || course.description]],
    forWhom: ["Yangi kasb o'rganmoqchi bo'lganlar uchun", "Amaliy loyiha bilan o'qishni xohlaganlar uchun"],
    requiredSkills: ["O'rganishga qiziqish", "Kompyuter savodxonligi"],
    curriculum: curriculum?.length ? curriculum : [{ title: course.name, lessons: [] }],
    teacherBio: `${getTeacherName(course)} ushbu kurs bo'yicha mentorlik qiladi.`,
  };
};

export const mapApiTeacherToTeacher = (teacher: PublicTeacherDto): Teacher => ({
  photo: teacher.avatarUrl || defaultTeacherPhoto,
  name: `${teacher.firstName} ${teacher.lastName}`,
  role: teacher.specialty,
  desc: teacher.bio || `${teacher.specialty} bo'yicha tajribali o'qituvchi.`,
  courses: "0",
  students: "0",
  rating: String(teacher.rating || "4.8"),
  id: teacher.id,
});

export const mapApiTeacherToDetail = (teacher: PublicTeacherDto): TeacherDetailData => ({
  id: teacher.id,
  name: `${teacher.firstName} ${teacher.lastName}`,
  role: teacher.specialty,
  roleLabel: teacher.specialty,
  photo: teacher.avatarUrl || defaultTeacherPhoto,
  shortBio: teacher.bio || `${teacher.specialty} bo'yicha tajribali o'qituvchi.`,
  bio: [teacher.bio || `${teacher.specialty} bo'yicha tajribali o'qituvchi.`],
  stats: [
    { value: "0", label: "Kurs" },
    { value: "0", label: "Talaba" },
    { value: String(teacher.rating || "4.8"), label: "Reyting" },
    { value: `${teacher.experience || 0} yil`, label: "Tajriba" },
  ],
  skills: [{ name: teacher.specialty, highlight: true }],
  experience: [
    {
      period: "Hozir",
      role: teacher.specialty,
      company: "O'quv Markaz",
      description: teacher.bio || `${teacher.specialty} yo'nalishida dars beradi.`,
      current: true,
    },
  ],
  certificates: [],
  schedule: [],
  courses: 0,
  students: 0,
  rating: String(teacher.rating || "4.8"),
  reviewCount: 0,
});

export const mapApiStats = (stats: PublicStatsDto, fallback: Stat[]): Stat[] =>
  fallback.map((stat) => {
    if (stat.label.includes("Bitiruvchilar")) {
      return { ...stat, value: `${stats.graduates || stats.students}+` };
    }
    if (stat.label.includes("Kurslar")) {
      return { ...stat, value: `${stats.courses}+` };
    }
    if (stat.label.includes("o'qituvchi")) {
      return { ...stat, value: `${stats.teachers}+` };
    }
    return stat;
  });
