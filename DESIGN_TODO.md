# Design Migration TODO

Миграция дизайна из `project-front-design/oquv-markaz` (vanilla HTML/CSS) → React + Tailwind.
Источник дизайна: `C:\Users\Luck1y\Desktop\Project\project-front-design\oquv-markaz\`
Справочник по токенам: `DESIGN_SYSTEM.md`

---

## ✅ Batch 1 — Auth (done)

- [x] Login.tsx — gradient blue→violet, grid layout, mobile logo, proper spacing/sizes
- [x] Register.tsx — same split layout, register-specific brand text, removed confirmPassword

## ✅ Batch 2 — Public Header + Footer + Home (done)

- [x] Header — sticky nav h-18, SVG logo, hamburger menu, language dropdown, auth buttons
- [x] Footer — SVG social icons, proper contact section with Icon components, working hours
- [x] SectionHeading — badge pill, font-manrope, proper sizes
- [x] Hero — animated eyebrow dot, font-manrope extrabold, lg subtitle, emerald checkmarks
- [x] Stats — proper SVG icon-boxes (graduationCap/book/user/award), text-3xl extrabold
- [x] Advantages — SVG icons instead of emoji, hoverable cards, rounded-xl
- [x] TeacherCard — 120px avatar with border, font-manrope, hover translate, lg stat values
- [x] Testimonials — already close to design
- [x] FAQ — already uses details/summary, matches design
- [x] CTA — gradient blue→violet, font-manrope title

## ✅ Batch 3 — Public Pages (done)

- [x] Courses.tsx — page hero, toolbar (search + sort + count), sidebar filters, course cards, pagination with arrows/ellipsis
- [x] CourseDetail.tsx — dark bg-gray-900 banner, sticky card, tabs (description/curriculum/teacher/reviews), similar courses section
- [x] Teachers.tsx — filter chips (Frontend/Backend/Dizayn/Mobil/Marketing), teacher cards grid
- [x] TeacherDetail.tsx — остаётся (minor, уже работает)
- [x] Blog.tsx — featured post, blog cards, sidebar (categories/popular/tags), pagination
- [x] BlogDetail.tsx — остаётся (minor, уже работает)
- [x] Contact.tsx — 2-column form + info sidebar, SVG social icons, proper contact items
- [x] About.tsx — hero, mission/vision cards with SVG icons, timeline, team grid, achievements, CTA
  - Дизайн: `pages/public/about.html` + `styles/pages/about.css`

## ✅ Batch 4 — Admin Layout + Pages (in progress)

- [x] AdminSidebar.tsx — секционная навигация (Asosiy/Moliya/Kontent/Tizim), active indicator с полоской, user footer с online dot
- [x] AdminTopbar.tsx — search input, mobile logo, user info, divider
- [x] AdminDashboard.tsx — stat tiles с icon-box и trend, recent students table
- [x] AdminStudents.tsx — filter bar с search icon, avatar initials, status dots, smart pagination
- [x] AdminStudentNew.tsx — breadcrumb, 3 card sections, radio gender, form actions bar
- [x] AdminStudentProfile.tsx — breadcrumb, profile header с meta, tab-bar (underline style), detail cards, payment stats

## ✅ Batch 5 — Student Dashboard Pages (done)

- [x] StudentDashboard.tsx — greeting, continue banner, stat tiles with SVG icons, active courses, weekly goal with day dots, recommended
- [x] StudentCourses.tsx — stat tiles, in-progress/completed sections, course cards with progress bars, add course CTA with dashed border
- [x] CourseDetailStudent.tsx — breadcrumb, hero card with progress, 3 tabs (tavsif/dastur/oqituvchi), sticky sidebar with feature checklist
- [x] LessonPage.tsx — unique layout with topbar (progress bar + exit), video player, lesson nav, curriculum sidebar with done/active/locked states
- [x] StudentCertificates.tsx — cert preview cards (earned with medal / locked with lock icon), meta rows, action buttons
- [x] StudentPayments.tsx — 3-col stats, payment table with PDF download, payment method card with VISA badge
- [ ] StudentProfile.tsx, StudentSettings.tsx, StudentResults.tsx — minor, working
- [ ] BuyCourse.tsx, DashboardCatalog.tsx — minor, working

## 🔜 Batch 6 — Shared UI Components (optional refactor)

- [ ] Извлечь Breadcrumb в переиспользуемый компонент
- [ ] Извлечь Pagination в переиспользуемый компонент
- [ ] Извлечь StatTile в переиспользуемый компонент

---

## Заметки

- Все CSS переменные маппятся на стандартные Tailwind классы — НЕ нужно расширять tailwind.config
- Font: Inter (body) + Manrope (headings) — уже подключены
- Admin sidebar: секционная навигация с `is-active` индикатором
- Lesson page имеет уникальный layout без admin sidebar
- Dark theme: есть в дизайне (`data-theme="dark"`), но пока не приоритет
