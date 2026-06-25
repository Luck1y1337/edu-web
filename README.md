<p align="center">
  <img src="public/favicon.svg" width="64" height="64" alt="O'quv Markaz" />
</p>

<h1 align="center">O'quv Markaz — Frontend</h1>

<p align="center">
  <strong>Modern ta'lim platformasi uchun to'liq SPA frontend</strong><br/>
  React 19 · TypeScript · Tailwind CSS · Vite
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" alt="Vite" />
</p>

---

## Haqida

O'quv Markaz — Toshkent shahridagi IT va dizayn ta'lim markazi uchun yaratilgan zamonaviy veb-platforma. Platforma 3 ta asosiy bo'limdan iborat:

- **Ommaviy sahifalar** — Bosh sahifa, Kurslar katalogi, O'qituvchilar, Blog, FAQ, Aloqa
- **Talaba paneli** — Dashboard, Mening kurslarim, Dars ko'rish, Sertifikatlar, To'lovlar
- **Admin panel** — Talabalar, O'qituvchilar, Kurslar CRUD, Kurs builder (modullar + darslar)

## Texnologiyalar

| Kategoriya | Texnologiya |
|---|---|
| **Framework** | React 19 + React Compiler |
| **Til** | TypeScript 6 (strict) |
| **Build** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM 7 (`createBrowserRouter`) |
| **Server state** | TanStack React Query 5 |
| **Client state** | Zustand + persist middleware |
| **HTTP** | Axios (JWT interceptors, auto-refresh) |
| **Formalar** | React Hook Form 7 |
| **Bildirishnomalar** | React Toastify |
| **Shriftlar** | Inter (body) + Manrope (headings) |

## Loyiha tuzilmasi

```
src/
├── config/          # Axios instance, API endpoints map
├── types/           # TypeScript DTO types (Swagger-based)
├── services/        # API call functions + DTO→UI mappers
├── store/           # Zustand auth/user store
├── hooks/api/       # React Query hooks (useAdminStudents, useAdminCourses, etc.)
├── components/
│   ├── ui/          # Shared UI: Button, Input, Icon, SectionHeading, etc.
│   ├── layouts/     # RootLayout, DashboardLayout, AdminLayout
│   ├── auth/        # ProtectedRoute, AdminRoute
│   ├── admin/       # AdminSidebar, AdminTopbar
│   ├── home/        # Header, Footer, Hero, Stats, FAQ, etc.
│   ├── courses/     # CourseCard, CoursesGrid, CoursesFilter
│   ├── dashboard/   # ActiveCourses, WeeklyGoal, ContinueBanner
│   └── ...          # blog, contact, teachers, courseDetail
├── pages/           # All pages (lazy-loaded)
├── routes/          # createBrowserRouter configuration
└── data/            # Static UI data (nav links, FAQ, advantages)
```

## O'rnatish

```bash
# Repozitoriyani klonlash
git clone https://github.com/Luck1y1337/edu-web.git
cd edu-web

# Bog'liqliklarni o'rnatish
npm install

# .env faylini yaratish
echo "VITE_BACKEND_URL=http://your-api-url/api/v1" > .env

# Dev serverni ishga tushurish
npm run dev
```

Brauzerda ochiladi: **http://localhost:5173**

## Skriptlar

| Buyruq | Tavsif |
|---|---|
| `npm run dev` | Development server (HMR) |
| `npm run build` | Production build (`tsc -b && vite build`) |
| `npm run preview` | Production build preview |
| `npm run lint` | ESLint tekshiruvi |

## Sahifalar xaritasi

### Ommaviy sahifalar
| Marshrut | Sahifa |
|---|---|
| `/` | Bosh sahifa (Hero, Kurslar, O'qituvchilar, FAQ) |
| `/courses` | Kurslar katalogi (filter, qidiruv, pagination) |
| `/courses/:slug` | Kurs tafsilotlari (dastur, o'qituvchi, sharhlar) |
| `/teachers` | O'qituvchilar ro'yxati |
| `/teachers/:id` | O'qituvchi profili |
| `/blog` | Blog (featured, kategoriyalar, teglar) |
| `/blog/:slug` | Maqola tafsilotlari |
| `/contact` | Aloqa formasi |
| `/about` | Biz haqimizda |

### Autentifikatsiya
| Marshrut | Sahifa |
|---|---|
| `/login` | Kirish |
| `/register` | Ro'yxatdan o'tish |
| `/forgot-password` | Parolni tiklash |
| `/reset-password` | Yangi parol o'rnatish |
| `/verify-email` | Email tasdiqlash |

### Talaba paneli (`/dashboard`)
| Marshrut | Sahifa |
|---|---|
| `/dashboard` | Dashboard (davom ettirish, statistika, haftalik maqsad) |
| `/dashboard/courses` | Mening kurslarim |
| `/dashboard/courses/:id` | Kurs tafsilotlari (enrolled) |
| `/dashboard/lesson/:id` | Dars ko'rish (video player, navigatsiya) |
| `/dashboard/certificates` | Sertifikatlarim |
| `/dashboard/payments` | To'lovlar tarixi |
| `/dashboard/profile` | Profil |
| `/dashboard/catalog` | Kurslar katalogi |

### Admin panel (`/admin`)
| Marshrut | Sahifa |
|---|---|
| `/admin` | Dashboard (KPI tiles, oxirgi talabalar) |
| `/admin/students` | Talabalar ro'yxati |
| `/admin/students/new` | Yangi talaba qo'shish |
| `/admin/students/:id` | Talaba profili (kurslar, to'lovlar) |
| `/admin/instructors` | O'qituvchilar ro'yxati |
| `/admin/instructors/new` | Yangi o'qituvchi qo'shish |
| `/admin/courses` | Kurslar ro'yxati |
| `/admin/courses/new` | Yangi kurs yaratish (course builder) |

## API integratsiya

Backend bilan ishlash:
- **JWT autentifikatsiya** — access + refresh token flow
- **Automatic token refresh** — 401 da avtomatik yangilash
- **73 ta endpoint** — auth, public, student, admin guruhlari
- **Strict validation** — backend query parametrlarini qattiq tekshiradi

## Litsenziya

MIT

---

<p align="center">
  <sub>Ishlab chiqildi Toshkent, O'zbekiston</sub>
</p>
