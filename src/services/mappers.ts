import type { Course as HomeCourse, Stat, Teacher, Testimonial } from "../types/home.type";
import type { Course } from "../data/courses.data";
import type { CourseDetailData } from "../data/courseDetail.data";
import type { TeacherDetailData } from "../data/teacherDetail.data";
import type { BlogPost } from "../data/blog.data";
import type {
  BlogPostListItemDto,
  PublicCourseDto,
  PublicStatsDto,
  PublicTeacherDto,
  PublicTestimonialDto,
} from "../types/api.type";

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
    longDescription: course.longDescription || "",
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
    // No structured "learning outcomes" field in the API — leave empty so the
    // section hides instead of echoing the description back as bullet points.
    whatYouLearn: [],
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
  // Real per-instructor aggregates aren't returned by the public API yet —
  // leave blank so the card hides empty metrics instead of showing fake zeros.
  courses: "",
  students: "",
  rating: teacher.rating != null ? String(teacher.rating) : "",
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
      return { ...stat, value: `${stats.teachers || stats.instructors || 0}+` };
    }
    return stat;
  });

/* ───────── Testimonials ───────── */

const formatNumber = (n: number) => new Intl.NumberFormat("uz-UZ").format(n);

export const mapApiTestimonial = (t: PublicTestimonialDto): Testimonial => {
  const firstName = t.student?.firstName || "";
  const lastName = t.student?.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Talaba";
  return {
    text: t.comment,
    photo: t.student?.avatarUrl || defaultTeacherPhoto,
    name: fullName,
    role: t.course?.name || "O'quv markaz talabasi",
  };
};

/* ───────── Blog ───────── */

const blogBadgeByCategory: Record<string, BlogPost["badgeColor"]> = {
  frontend: "blue",
  backend: "green",
  fullstack: "purple",
  design: "purple",
  dizayn: "purple",
  mobile: "yellow",
  mobil: "yellow",
  marketing: "red",
  karyera: "blue",
  devops: "green",
};

const defaultBlogImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80";

const formatBlogDate = (iso?: string | null) => {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
};

export const mapApiBlogPost = (post: BlogPostListItemDto, index = 0): BlogPost => {
  const categoryName = post.category?.name || "Blog";
  const categoryKey = (post.category?.slug || categoryName).toLowerCase();
  const author = post.author;
  const authorName = author
    ? [author.firstName, author.lastName].filter(Boolean).join(" ") || "Muallif"
    : "Muallif";

  return {
    id: index + 1,
    slug: post.slug,
    category: categoryName,
    badgeColor: blogBadgeByCategory[categoryKey] || "blue",
    date: formatBlogDate(post.publishedAt),
    readTime: post.readMinutes ? `${post.readMinutes} daqiqalik o'qish` : "5 daqiqalik o'qish",
    title: post.title,
    excerpt: post.excerpt || "",
    image: post.coverImageUrl || defaultBlogImage,
    authorName,
    authorAvatar: author?.avatarUrl || defaultTeacherPhoto,
    featured: post.isFeatured,
    featuredLabel: post.isFeatured ? "TANLANGAN" : undefined,
  };
};

/* Counts how many published items map to a particular display unit — used in Home counter widget. */
export const formatCount = formatNumber;
