# CLAUDE.md — O'quv Markaz Frontend

Контекст для будущих сессий. Читай это первым, прежде чем что-то менять.

## Стек

- **React 19 + Vite + TypeScript**
- **Tailwind CSS** (оставлен, несмотря на `PROJECT.md` — пользователь решил оставить)
- **react-router-dom v7** (`createBrowserRouter`)
- **@tanstack/react-query** — все запросы к API
- **zustand** + `persist` middleware — auth/user state
- **axios** с JWT interceptors (access + refresh)
- **react-hook-form** — формы
- **react-toastify** — нотификации

## API

- **Base URL:** `http://3.90.217.113/api/v1` (env: `VITE_BACKEND_URL`)
- **Swagger:** 73 эндпоинта в 17 группах
- **Strict ValidationPipe** — бэкенд возвращает 400 на любой неизвестный query-параметр
- **Поля сортировки:** `sortBy` + `order` (НЕ `sort`)
- **Логин-поле:** `identifier` (НЕ `emailOrPhone`)
- **Публичные преподаватели:** `/public/instructors` (НЕ `/public/teachers`)
- **Роли:** `super_admin` | `admin` | `instructor` | `student`
- **Маршрутизация по роли:** student → `/dashboard`, admin/super_admin → `/admin`

## Архитектура

```
src/
├── config/
│   ├── endpoints.ts      ← центральная карта URL (auth, user, public, student, admin)
│   └── axios.ts          ← axios + JWT interceptor + refresh-flow
├── types/api.type.ts     ← все DTO из свагера
├── services/
│   ├── api.ts            ← authApi / userApi / publicApi / studentApi / adminApi (+ unwrapApiData)
│   └── mappers.ts        ← API DTO → UI типы (Course, Teacher, BlogPost, Stat, ...)
├── store/user.store.ts   ← zustand, хранит CurrentUserDto целиком
├── hooks/api/            ← все react-query хуки (use<Resource>.ts)
├── components/
│   ├── auth/             ← ProtectedRoute, AdminRoute
│   ├── layouts/          ← RootLayout, DashboardLayout, AdminLayout
│   ├── admin/            ← AdminSidebar, AdminTopbar
│   └── ...
├── pages/                ← все страницы (lazy-loaded в routes.tsx)
└── routes/routes.tsx     ← createBrowserRouter, withSuspense helper
```

## Конвенции

- **Никаких mock-fallback'ов.** Данные только из API. Loading/error/empty состояния — обязательны.
- **Stat'ы на Home** используют template-массив из `home.data.ts` только для лейблов/цветов — реальные значения наливаются через `mapApiStats`. Это НЕ mock.
- **Сохранять стиль кода** — Tailwind classes, существующая структура компонентов (`Input`, `Button`, `Icon` из `components/ui`).
- **Login:** поддерживает `?next=` редирект, админов отправляет на `/admin`, студентов на `/dashboard`.
- **Register:** шлёт только `firstName`/`lastName`/`email`/`phone`/`password`.
- **Токены:** `setItem`/`getItem` для access, `setRefreshToken`/`getRefreshToken` для refresh, `clearTokens` — всё в `utils/localstorage.ts`.

## Карта endpoints

`endpoints.ts` имеет namespace'ы:
- `auth.*` — register, login, logout, me, forgotPassword, resetPassword, verifyEmail
- `user.*` — changePassword, sessions
- `public.*` — stats, testimonials, courses, instructors, blog, blogCategories, blogPost, blogComment, contact
- `student.*` — enrollments, checkout, lessonProgress, certificates, claimCertificate, reviews, myReviews
- `admin.*` — students, instructors, courses, enrollments, payments, certificates, reviews, blog, contact (полный CRUD; динамические `id` через функции)

## Готовое (по фазам)

- **Phase 1** — инфра (axios, store, endpoints, types, RootLayout, auth pages)
- **Phase 2** — публичные страницы (Home, Courses, CourseDetail, Teachers, TeacherDetail, Blog, BlogDetail, Contact)
- **Phase 3** — student dashboard (10 страниц)
- **Phase 4** — чистка мёртвого кода
- **Phase 5a** — admin фундамент: AdminRoute, AdminLayout, AdminSidebar, AdminTopbar, AdminDashboard, AdminStudents (list + delete)
- **Phase 5b** — admin students CRUD: AdminStudentNew (форма), AdminStudentProfile (профиль + табы курсов/платежей + edit)

## Что НЕ имеет API (19 страниц)

groups, schedule, attendance, grades, finance, messages, notifications, reports, admin settings, offline/*, teacher/*, admin-online/revenue.
Стратегия: «coming soon» stub'ы или удаление.

## Известные грабли

- WebFetch авто-апгрейдит HTTP → HTTPS, ломает свагер-fetch → использовать `curl` напрямую.
- Бэкенд **строго** валидирует query, не передавай `undefined` поля — используй спред-паттерн `...(search ? { search } : {})`.
- `user.name` НЕ существует на `CurrentUserDto` — используй `firstName`/`lastName`.
- Refresh-токен в axios catch — без переменной (`catch {}`), чтобы eslint не ругался.

## Учётные данные

Логин/пароль admin'а **неизвестны клиенту** — спросить у того, кто поднимал бэкенд, либо посмотреть seed-файлы / БД напрямую.

## Локальный запуск

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
npm run build   # tsc -b && vite build
```

`.env`:
```
VITE_BACKEND_URL=http://3.90.217.113/api/v1
```
