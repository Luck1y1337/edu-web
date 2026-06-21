# 🤖 AGENT GUIDE — O''quv Markaz Frontend

> Этот документ написан для любого ИИ-агента, который продолжает работу над проектом.
> Здесь описано: **что мы делаем**, **как мы делаем**, **что уже готово**, и **что нужно сделать дальше**.

---

## 📌 Суть проекта

**O''quv Markaz** — это образовательная платформа (EdTech) на узбекском языке.
Сайт — публичная часть платформы, включающая:
- Главную страницу
- Страницы курсов, преподавателей, блога
- Личный кабинет студента (dashboard)
- Регистрацию и вход

**Стек:** React + TypeScript + TailwindCSS (через Vite)
**Репозиторий:** `https://github.com/Luck1y1337/erp-frontend`
**Папка проекта:** `C:\Users\Luck1y\Desktop\Project\frontend`

---

## 🧠 Стратегия разработки

### Откуда берётся дизайн?
Дизайн сделан в **Figma**. Пользователь копирует CSS-код из Figma (через Dev Mode → Copy CSS) и вставляет его в чат. Агент читает CSS, извлекает:
- Цвета, отступы, размеры шрифтов
- Структуру блоков (flex, grid)
- Текстовое содержимое (реальные тексты на узбекском языке)
- Логику компонентов

Затем агент **самостоятельно строит** React-компоненты с TailwindCSS-классами, максимально приближенные к дизайну.

### Принцип "Figma CSS → React"

```
Figma Dev Mode
     ↓ копируем CSS
Пользователь вставляет в чат
     ↓
Агент анализирует структуру
     ↓
Создаёт .tsx компоненты + data файлы
     ↓
Проверяет build (yarn build)
     ↓
git push → GitHub
```

### Порядок работы над страницей
1. Пользователь присылает CSS из Figma + скриншот (опционально)
2. Агент анализирует структуру и создаёт файлы
3. Запускает `yarn run build` для проверки TypeScript ошибок
4. Исправляет все ошибки (особенно `TS6133` - unused variables)
5. Пушит: `git add . && git commit -m "feat: ..." && git push`

---

## 📁 Структура проекта

```
frontend/
├── src/
│   ├── components/
│   │   ├── home/               ← компоненты главной страницы
│   │   │   ├── Header.tsx      ← шапка (navLinks)
│   │   │   ├── Footer.tsx      ← подвал (footerPages, footerCourses)
│   │   │   ├── Hero.tsx        ← герой блок
│   │   │   ├── Courses.tsx     ← секция курсов
│   │   │   ├── Teachers.tsx    ← секция учителей
│   │   │   ├── Faq.tsx         ← FAQ аккордеон
│   │   │   └── Cta.tsx         ← призыв к действию
│   │   ├── courses/            ← компоненты страницы /courses
│   │   │   ├── CoursesHero.tsx
│   │   │   ├── CoursesFilter.tsx  ← sidebar фильтр
│   │   │   ├── CourseCard.tsx
│   │   │   └── CoursesGrid.tsx    ← поиск + сортировка + пагинация
│   │   ├── courseDetail/       ← компоненты /courses/:slug
│   │   │   ├── CourseBanner.tsx   ← gradient hero + price card
│   │   │   ├── CourseTabs.tsx     ← 4 вкладки
│   │   │   ├── CourseSidebar.tsx
│   │   │   └── CourseRelated.tsx
│   │   ├── teacherDetail/      ← компоненты /teachers/:id
│   │   │   ├── TeacherHero.tsx
│   │   │   ├── TeacherTabs.tsx    ← 3 вкладки
│   │   │   ├── TeacherSidebar.tsx
│   │   │   └── OtherTeachers.tsx
│   │   ├── layouts/
│   │   │   ├── RootLayout.tsx  ← Header + Outlet + Footer
│   │   │   └── DashboardLayout.tsx ← sidebar для /dashboard
│   │   └── ui/
│   │       ├── Icon.tsx        ← централизованные SVG иконки
│   │       ├── SectionHeading.tsx
│   │       ├── PageHero.tsx    ← стандартный hero для внутренних страниц
│   │       └── TeacherCard.tsx
│   ├── data/                   ← статические данные (вместо API)
│   │   ├── home.data.ts        ← navLinks, footerPages, courses, teachers
│   │   ├── courses.data.ts     ← allCourses (12 курсов с полными данными)
│   │   ├── courseDetail.data.ts ← детальные данные курсов + getCourseDetail()
│   │   ├── teacherDetail.data.ts ← 3 преподавателя + getTeacherDetail()
│   │   └── blog.data.ts        ← статьи блога
│   ├── pages/                  ← страницы (маршруты)
│   ├── routes/
│   │   └── routes.tsx          ← все маршруты React Router
│   ├── types/
│   │   └── home.type.ts        ← TypeScript типы
│   └── main.tsx
└── AGENT_GUIDE.md              ← этот файл
```

---

## ✅ Статус страниц

| Маршрут | Страница | Статус |
|---------|----------|--------|
| `/` | Main Page | ✅ Готова |
| `/about` | About Page | ✅ Готова |
| `/blog` | Blog Page | ✅ Готова |
| `/blog/:slug` | Blog Detail | ✅ Готова |
| `/contact` | Contact Page | ✅ Готова |
| `/courses` | Courses Page | ✅ Готова |
| `/courses/:slug` | Course Detail | ✅ Готова |
| `/teachers` | Teachers Page | ✅ Готова |
| `/teachers/:id` | Teacher Detail | ✅ Готова |
| `/login` | Login | ✅ Готова |
| `/register` | Register | ✅ Готова |
| `/pricing` | Pricing Page | ❌ Скелет — СЛЕДУЮЩАЯ |
| `/faq` | FAQ Page | ❌ Скелет |
| `/dashboard` | Student Dashboard | ✅ Готова |
| `/dashboard/courses` | Student Courses | ❌ Скелет |
| `/dashboard/courses/:id` | Course Detail Student | ❌ Скелет |
| `/dashboard/lesson/:id` | Lesson Page | ❌ Скелет |
| `/dashboard/results` | Student Results | ❌ Скелет |
| `/dashboard/certificates` | Student Certificates | ❌ Скелет |
| `/dashboard/profile` | Student Profile | ❌ Скелет |
| `/dashboard/payments` | Student Payments | ❌ Скелет |
| `/dashboard/settings` | Student Settings | ❌ Скелет |
| `/dashboard/buy-course` | Buy Course | ❌ Скелет |
| `/dashboard/catalog` | Dashboard Catalog | ❌ Скелет |

> **Итого:** 11 готово, 13 нужно сделать

---

## 🎨 Дизайн-система

### Цвета (из Figma)
| Название | Hex |
|----------|-----|
| Royal Blue (primary) | `#2563EB` |
| Persian Blue (dark) | `#1D4ED8` |
| Violet (accent) | `#6D28D9` |
| Ebony (text-900) | `#111827` |
| Oxford Blue (text-700) | `#374151` |
| River Bed (text-600) | `#4B5563` |
| Pale Sky (text-500) | `#6B7280` |
| Gray Chateau (text-400) | `#9CA3AF` |
| Athens Gray (border) | `#E5E7EB` |
| Zumthor (blue-50) | `#EFF6FF` |
| Mountain Meadow (green) | `#10B981` |
| Green Haze (check) | `#059669` |
| Tahiti Gold (cert icon) | `#D97706` |

### Шрифты
- **Manrope** — заголовки (ExtraBold 800, Bold 700, SemiBold 600)
- **Inter** — текст (Regular 400, Medium 500, SemiBold 600)

### Градиенты страниц
- Course Detail banner: `linear-gradient(114.32deg, #1D4ED8 0%, #6D28D9 100%)`
- Teacher Detail / Blog / Courses hero: `linear-gradient(104.43deg, #EFF6FF 0%, #F5F3FF 100%)`

---

## 🔄 Навигация

### Header navLinks (home.data.ts)
```
/ → Bosh sahifa
/courses → Kurslar
/teachers → O'qituvchilar
/blog → Blog
/contact → Aloqa
```

### Параметры маршрутов
- `/courses/:slug` — из `allCourses[i].slug` в `courses.data.ts`
- `/teachers/:id` — slug из имени: "Akmal Karimov" → "akmal-karimov"
- `/blog/:slug` — из `blog.data.ts`

---

## 📋 Паттерн создания новой страницы

```
1. src/data/pageName.data.ts         ← интерфейсы + статические данные
2. src/components/pageName/
     PageHero.tsx                    ← hero с breadcrumb
     PageContent.tsx                 ← основной контент
     PageSidebar.tsx                 ← sidebar (если есть)
3. src/pages/PageName.tsx            ← сборка компонентов
4. Проверить маршрут в routes.tsx
5. yarn build → исправить ошибки → git push
```

---

## ⚡ Рабочие команды

```bash
yarn run build   # сборка + проверка TypeScript
yarn run dev     # dev-сервер
git add . && git commit -m "feat: ..." && git push
```

---

## 🚨 Частые ошибки TypeScript

| Ошибка | Решение |
|--------|---------|
| `TS6133: 'X' declared but never read` | Удалить неиспользуемую переменную |
| `TS2345: Type mismatch` | Проверить интерфейс в .data.ts |
| `Cannot find module` | Проверить относительный путь импорта |

---

## 💡 Важные детали

- **RootLayout** — Header + Footer для всех публичных страниц
- **DashboardLayout** — sidebar для `/dashboard/*` (ProtectedRoute)
- **PageHero** — переиспользуемый hero для Blog, Courses, Teachers, About, Contact
- **allCourses** в `courses.data.ts` — главный источник данных курсов
- Всегда использовать `Link` из `react-router-dom` вместо `<a href>`
- Данные — в `src/data/*.data.ts`, НЕ в компонентах
- Изображения-заглушки: `https://images.unsplash.com/` или `https://i.pravatar.cc/`

---

*Последнее обновление: 21 июня 2026 г.*
