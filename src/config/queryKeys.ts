export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  user: {
    sessions: ["user", "sessions"] as const,
  },
  public: {
    stats: ["public", "stats"] as const,
    courses: (filter?: string) => ["public", "courses", filter ?? "all"] as const,
    course: (slug: string) => ["public", "course", slug] as const,
    instructors: (filter?: string) => ["public", "instructors", filter ?? "all"] as const,
    instructor: (id: string) => ["public", "instructor", id] as const,
    testimonials: ["public", "testimonials"] as const,
    blog: (params?: Record<string, unknown>) => ["public", "blog", params] as const,
    blogCategories: ["public", "blog", "categories"] as const,
    blogPost: (slug: string) => ["public", "blog", "post", slug] as const,
  },
  student: {
    enrollments: ["student", "enrollments"] as const,
    enrollment: (courseId: string) => ["student", "enrollment", courseId] as const,
    certificates: ["student", "certificates"] as const,
    reviews: ["student", "reviews"] as const,
  },
  admin: {
    students: (params?: Record<string, unknown>) => ["admin", "students", params] as const,
    student: (id: string) => ["admin", "student", id] as const,
    studentEnrollments: (id: string) => ["admin", "student", id, "enrollments"] as const,
    studentPayments: (id: string) => ["admin", "student", id, "payments"] as const,
    instructors: (params?: Record<string, unknown>) => ["admin", "instructors", params] as const,
    instructor: (id: string) => ["admin", "instructor", id] as const,
    courses: (params?: Record<string, unknown>) => ["admin", "courses", params] as const,
    course: (id: string) => ["admin", "course", id] as const,
    enrollments: (params?: Record<string, unknown>) => ["admin", "enrollments", params] as const,
    payments: (params?: Record<string, unknown>) => ["admin", "payments", params] as const,
    certificates: (params?: Record<string, unknown>) => ["admin", "certificates", params] as const,
    reviews: (params?: Record<string, unknown>) => ["admin", "reviews", params] as const,
    blog: {
      posts: (params?: Record<string, unknown>) => ["admin", "blog", "posts", params] as const,
      comments: (params?: Record<string, unknown>) => ["admin", "blog", "comments", params] as const,
    },
    contact: (params?: Record<string, unknown>) => ["admin", "contact", params] as const,
  },
} as const;
