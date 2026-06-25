# TODO — O'quv Markaz Frontend

Дорожная карта по фазам. Отмечай `[x]` по мере выполнения.

---

## ✅ Phase 1 — Инфраструктура (done)

- [x] axios + JWT interceptor + refresh-flow
- [x] zustand store (CurrentUserDto)
- [x] endpoints.ts, api.type.ts, services/api.ts, services/mappers.ts
- [x] RootLayout, ProtectedRoute, GlobalSpinner, GlobalError
- [x] Login (с `?next=` и admin-redirect), Register, ForgotPassword, ResetPassword, VerifyEmail
- [x] favicon.svg, index.html title + meta

## ✅ Phase 2 — Публичные страницы (done)

- [x] Home, Courses, CourseDetail, Teachers, TeacherDetail, Blog, BlogDetail, Contact

## ✅ Phase 3 — Student Dashboard (done)

- [x] StudentDashboard, StudentCourses, CourseDetailStudent, LessonPage
- [x] StudentCertificates, StudentProfile, StudentPayments, StudentResults
- [x] BuyCourse, DashboardCatalog

## ✅ Phase 4 — Чистка (done)

- [x] Удалены мёртвые data/, старые hooks, неиспользуемые компоненты

## ✅ Phase 5a — Admin фундамент (done)

- [x] AdminRoute (role guard для admin/super_admin)
- [x] AdminLayout + AdminSidebar + AdminTopbar
- [x] AdminDashboard (KPI tiles + recent students)
- [x] AdminStudents (list + search + status filter + pagination + delete)
- [x] adminApi + 7 хуков (useAdminStudents и Co)

---

## ✅ Phase 5b — Admin Students CRUD (done)

- [x] `/admin/students/new` — форма создания (`CreateAdminStudentDto` + react-hook-form)
- [x] `/admin/students/:id` — профиль студента
  - [x] Карточка с данными + аватар (инициалы / avatarUrl)
  - [x] Таб «Kurslar» — `useAdminStudentEnrollments`
  - [x] Таб «To'lovlar» — `useAdminStudentPayments`
  - [x] Кнопка edit → `useUpdateAdminStudent`
- [x] Добавить роуты `/admin/students/new` и `/admin/students/:id` в `routes.tsx`
- [x] Линк «Profil» из AdminStudents уже подготовлен

## 🔜 Phase 6 — Admin Instructors + Courses

- [ ] `AdminInstructors` (list + search + delete)
- [ ] `AdminInstructorNew` / `AdminInstructorEdit`
- [ ] `AdminCourses` (list + filter по статусу publish/draft)
- [ ] `AdminCourseNew` / `AdminCourseEdit`
- [ ] **Course builder** — модули + уроки (create/update/delete/sort)
- [ ] Хуки: `useAdminInstructors`, `useAdminCourses`, `useAdminModules`, `useAdminLessons`
- [ ] Сайдбар: добавить пункты «O'qituvchilar», «Kurslar»

## 🔜 Phase 7 — Admin Payments / Certificates / Reviews

- [ ] `AdminPayments` (list + status filter + accept/refund/receipt)
- [ ] `AdminEnrollments` (list + filter по курсу/студенту)
- [ ] `AdminCertificates` (issue + revoke)
- [ ] `AdminReviews` (модерация: approve/reject/delete)
- [ ] Хуки: `useAdminPayments`, `useAdminEnrollments`, `useAdminCertificates`, `useAdminReviews`

## 🔜 Phase 8 — Admin Blog + Contact + Stubs

- [ ] `AdminBlogPosts` (CRUD), `AdminBlogCategories` (CRUD), `AdminBlogComments` (модерация)
- [ ] `AdminContactMessages` (list + reply/close)
- [ ] «Coming soon» страницы для 19 не-API: groups, schedule, attendance, grades, finance, messages, notifications, reports, admin settings, offline/*, teacher/*, admin-online/revenue
- [ ] Удалить из сайдбара то, что не имеет API и не будет реализовано

---

## 🧹 Технический долг

- [ ] Убрать ◆ placeholder-иконки в AdminDashboard tiles, заменить нормальными `Icon.*`
- [ ] AdminSidebar — выделение активного пункта (`NavLink`)
- [ ] Пагинация в AdminStudents — `<Pagination>` компонент вместо инлайн-кнопок
- [ ] Search debounce (300ms) в AdminStudents — сейчас каждое нажатие → запрос
- [ ] `react-query` devtools только в dev-режиме
- [ ] Глобальный обработчик 403 (показать «Ruxsat yo'q»)
- [ ] Тёмная тема? (опционально, спросить у пользователя)

## 📋 Open questions

- Дефолтный admin для тестирования — где взять? (см. CLAUDE.md «Учётные данные»)
- Какие из 19 «без API» страниц вообще нужны в UI? Возможно часть удалить совсем
- Локализация — пока всё на uz, нужна ли ru/en?
