# 🤖 AGENT GUIDE — O'quv Markaz Frontend

> Этот документ написан для любого ИИ-агента, который продолжает работу над проектом.
> Здесь описано: **что мы делаем**, **как мы делаем**, **что уже готово**, и **что нужно сделать дальше**.

---

## 📌 Суть проекта

**O'quv Markaz** — это образовательная платформа (EdTech) на узбекском языке.
Сайт — публичная часть платформы, включающая:
- Главную страницу
- Страницы курсов, преподавателей, блога
- Личный кабинет студента (dashboard)
- Регистрацию и вход

**Стек:** React 19 + TypeScript + TailwindCSS v4 (через Vite 8)
**Репозиторий:** `https://github.com/Luck1y1337/edu-web`
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
Проверяет build (yarn build или npm run build)
     ↓
git push → GitHub
```

### Порядок работы над страницей
1. Пользователь присылает CSS из Figma + скриншот (опционально)
2. Агент анализирует структуру и создаёт файлы
3. Запускает `npm run build` для проверки TypeScript ошибок
4. Исправляет все ошибки (особенно `TS6133` - unused variables)
5. Пушит: `git add . && git commit -m "feat: ..." && git push`

---

## 📁 Структура проекта

```
frontend/
├── src/
│   ├── components/
│   │   ├── home/               ← компоненты главной страницы
│   │   ├── courses/            ← компоненты страницы /courses
│   │   ├── courseDetail/       ← компоненты /courses/:slug
│   │   ├── teacherDetail/      ← компоненты /teachers/:id
│   │   ├── layouts/
│   │   │   ├── RootLayout.tsx  ← Header + Outlet + Footer
│   │   │   └── DashboardLayout.tsx ← sidebar для /dashboard
│   │   └── ui/
│   │       ├── Icon.tsx        ← централизованные SVG иконки
│   │       └── ...
│   ├── config/                 ← конфигурация (axios, endpoints)
│   ├── data/                   ← статические fallback-данные
│   ├── hooks/
│   │   └── api/                ← хуки React Query для работы с API
│   ├── pages/                  ← страницы (маршруты)
│   ├── providers/              ← провайдеры (QueryClientProvider и т.д.)
│   ├── routes/
│   │   └── routes.tsx          ← все маршруты React Router
│   ├── services/               ← API методы и mappers
│   ├── store/
│   │   └── user.store.ts       ← Zustand глобальный стейт
│   ├── types/                  ← TypeScript типы
│   ├── utils/                  ← утилиты
│   └── main.tsx
└── AGENT_GUIDE.md              ← этот файл
```

---

## ✅ Статус страниц

Все запланированные страницы успешно завершены.

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
| `/pricing` | Pricing Page | ✅ Готова |
| `/faq` | FAQ Page | ✅ Готова |
| `/dashboard` | Student Dashboard | ✅ Готова |
| `/dashboard/courses` | Student Courses | ✅ Готова |
| `/dashboard/courses/:id` | Course Detail Student | ✅ Готова |
| `/dashboard/lesson/:id` | Lesson Page | ✅ Готова |
| `/dashboard/results` | Student Results | ✅ Готова |
| `/dashboard/certificates` | Student Certificates | ✅ Готова |
| `/dashboard/profile` | Student Profile | ✅ Готова |
| `/dashboard/payments` | Student Payments | ✅ Готова |
| `/dashboard/settings` | Student Settings | ✅ Готова |
| `/dashboard/buy-course` | Buy Course | ✅ Готова |
| `/dashboard/catalog` | Dashboard Catalog | ✅ Готова |

> **Итого:** 24 готово, 0 нужно сделать

---

## 🔌 API и Стейт-менеджмент (Как это работает)

Проект использует современную и отказоустойчивую архитектуру для работы с данными:

- **API Клиент:** Настроен в `src/config/axios.ts` (использует Axios). Автоматически подхватывает токен из `localStorage` и прикрепляет его к запросам.
- **Хуки (React Query):** Вся работа с API инкапсулирована в кастомных хуках (папка `src/hooks/api/`), что обеспечивает кэширование, удобные состояния загрузки (`isLoading`, `isPending`) и автоматические перезапросы.
- **Умные Мапперы (Fallback Logic):** В `src/services/api.ts` и `src/services/mappers.ts` реализована продвинутая логика — если реальный бэкенд недоступен или выдает ошибку (например, 404), приложение **автоматически подхватывает статические данные** из папки `src/data/`. Это гарантирует, что интерфейс всегда рендерится красиво и без падений, даже если API еще не готово.
- **Глобальный Стейт (Zustand):** Файл `src/store/user.store.ts` отвечает за:
  - Авторизацию (`user`, `isAuthenticated`, функции `setUser`, `logout`).
  - Управление глобальными UI-элементами (например, модальное окно выхода `isLogoutModalOpen` управляется отсюда, что позволяет вызывать его из любой части Layout или Sidebar).

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

---

## 💡 Важные детали

- **RootLayout** — Header + Footer для всех публичных страниц.
- **DashboardLayout** — Sidebar + Topbar для `/dashboard/*`.
- **PageHero** — переиспользуемый hero для внутренних страниц (Blog, Courses, Teachers и т.д.).
- Всегда использовать `Link` или `NavLink` из `react-router-dom` вместо обычных `<a href>`.
- Изображения-заглушки берутся с `https://images.unsplash.com/` или `https://i.pravatar.cc/`.

---

*Последнее обновление: 22 июня 2026 г.*
