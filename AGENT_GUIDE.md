# 🤖 AGENT GUIDE — O'quv Markaz Frontend

> Этот документ написан для разработчиков и ИИ-агентов, которые продолжают работу над проектом.
> Здесь подробно описано: **суть проекта**, **глубокая архитектура**, **что уже готово**, и **строгие правила работы**.

---

## 📌 Суть проекта

**O'quv Markaz** — это современная образовательная платформа (EdTech / LMS) на узбекском языке.
Проект включает в себя две крупные подсистемы:
1. **Public (Сайт):** Главная страница, Каталог курсов, Блог, Преподаватели, О нас, Контакты, FAQ, Тарифы.
2. **Dashboard (Личный кабинет студента):** Платформа для обучения, Профиль, Сертификаты, Результаты тестов, Платежи и Настройки.

**Стек:** React 19 + TypeScript + TailwindCSS v4 (через Vite 8)
**Глобальное состояние:** Zustand
**Работа с данными:** React Query + Axios
**Репозиторий:** `https://github.com/Luck1y1337/edu-web`

---

## 🧠 Стратегия разработки

### Откуда берётся дизайн?
Дизайн сделан в **Figma**. Процесс разработки строгий:
Пользователь копирует CSS-код из Figma (через Dev Mode → Copy CSS) и передает его. Мы извлекаем:
- Цвета, отступы, размеры шрифтов
- Структуру блоков (flex, grid)
- Логику компонентов и реальные тексты на узбекском

Затем мы **самостоятельно строим** React-компоненты с TailwindCSS-классами, максимально приближенные к пиксель-перфект дизайну.

### Принцип "Figma CSS → React"

```text
Figma Dev Mode
     ↓ копируем CSS
Анализ структуры и стилей
     ↓
Создание .tsx компонентов + data файлы / API хуки
     ↓
Проверка build (npm run build)
     ↓
Исправление всех TS ошибок
     ↓
git push → GitHub
```

---

## 📂 Глубокая архитектура (Directory Structure)

Код имеет строгую, масштабируемую структуру. Если вы создаете новый файл, он обязан лежать в правильной папке:

```text
frontend/
├── src/
│   ├── components/           # UI компоненты, разбитые по смыслу
│   │   ├── home/             # (Header, Footer, Hero, Faq, Cta)
│   │   ├── dashboard/        # (Sidebar, Topbar, Course Cards)
│   │   ├── layouts/          # (RootLayout для public, DashboardLayout для ЛК)
│   │   └── ui/               # Базовые переиспользуемые элементы (Icon.tsx, PageHero.tsx, TeacherCard.tsx)
│   ├── config/               # Настройки проекта
│   │   ├── axios.ts          # Экземпляр axios с авто-добавлением Bearer токена
│   │   └── endpoints.ts      # Словарь всех API-эндпоинтов
│   ├── data/                 # СТАТИЧЕСКИЕ ДАННЫЕ (Используются как Fallback)
│   │   ├── home.data.ts, courses.data.ts, blog.data.ts и др.
│   ├── hooks/api/            # Кастомные хуки React Query (useUser, useCourses)
│   ├── pages/                # Сами страницы (сборка компонентов воедино)
│   ├── providers/            # Обертки (QueryClientProvider, ToastContainer)
│   ├── routes/               # Единая точка конфигурации всех путей (routes.tsx)
│   ├── services/             # API Клиент и Mappers (логика резервирования данных)
│   ├── store/                # Zustand сторы (user.store.ts)
│   ├── types/                # Строгие TypeScript интерфейсы
│   └── utils/                # Вспомогательные функции
└── AGENT_GUIDE.md            # Этот файл
```

---

## ✅ Статус страниц (Все 24 готовы)

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

## 🔌 API и Умный Fallback-механизм (Data Flow)

Это самая важная техническая особенность проекта. Проект спроектирован так, чтобы работать **даже если бэкенд выключен или выдает ошибки (404/500)**.

**Жизненный цикл запроса:**
1. Компонент вызывает кастомный хук: `const { data, isLoading } = useCourses();`
2. Хук делает запрос через `React Query` к функции из `src/services/api.ts`.
3. `api.ts` делает реальный `axios.get(Endpoints.courses.list)`.
4. **ЕСЛИ УСПЕХ (200 OK):** Данные с бэкенда проходят через мапперы (`src/services/mappers.ts`), приводятся к строгим TypeScript типам фронтенда и отдаются компоненту.
5. **ЕСЛИ ОШИБКА БЭКЕНДА:** Блок `catch` перехватывает ошибку, логирует её в консоль и **моментально возвращает статические данные из папки `src/data/`**.

*Зачем это нужно:* Верстка никогда не "падает", и проект всегда готов к демонстрации.
*Ваше правило:* Создавая новые хуки/запросы, **всегда** добавляйте fallback на статические данные.

---

## 🔐 Авторизация и Глобальный Стейт (Zustand)

Файл `src/store/user.store.ts` управляет всей глобальной логикой:
- Хранит данные пользователя (`user`) и статус `isAuthenticated`.
- Содержит методы для входа (`setUser`) и выхода (`logout`).
- **Управление модалками:** В сторе лежит состояние `isLogoutModalOpen`. Это позволяет элегантно вызывать всплывающее окно выхода из ЛЮБОЙ точки приложения (из Sidebar в Dashboard или из мобильного меню), не прокидывая пропсы через 10 слоев компонентов.

---

## 🎨 Дизайн-система

Если вы добавляете новые блоки, они должны выглядеть премиально и вписываться в систему:

### Цвета (из Figma)
| Название | Hex | Tailwind Class |
|----------|-----|----------------|
| Royal Blue (primary)| `#2563EB` | `bg-blue-600` / `text-blue-600` |
| Persian Blue (dark) | `#1D4ED8` | `bg-blue-700` |
| Violet (accent) | `#6D28D9` | `bg-purple-700` |
| Ebony (text-900) | `#111827` | `text-gray-900` |
| Oxford Blue (text-700)| `#374151` | `text-gray-700` |
| River Bed (text-600) | `#4B5563` | `text-gray-600` |
| Pale Sky (text-500) | `#6B7280` | `text-gray-500` |
| Athens Gray (border) | `#E5E7EB` | `border-gray-200` |

### Типографика и Элементы
- **Manrope** (`font-manrope`) — используется для всех крупных заголовков (H1-H4). Дает уверенный, дорогой вид.
- **Inter** (`font-inter` / по умолчанию) — для читаемого текста.
- **Скругления:** Карточки всегда `rounded-xl` или `rounded-2xl`. Никаких угловатых блоков.
- **Тени:** Мягкие, современные тени `shadow-sm` или `shadow-[0px_4px_24px_rgba(0,0,0,0.04)]`.
- **Градиенты:** Используются мягкие фоновые градиенты, например: `linear-gradient(114deg, #1D4ED8 0%, #6D28D9 100%)`.

---

## ⚡ Правила работы (STRICT RULES)

1. **Не ломай работающее.** Если нужно добавить фичу А, не меняйте логику фичи Б.
2. **Маршруты.** Все внутренние переходы делать **ТОЛЬКО** через `<Link to="...">` или `<NavLink>` из `react-router-dom`. Использование `<a>` запрещено, так как оно перезагружает страницу (ломает SPA).
3. **Строгий TypeScript.** Запрещено использовать `any`. Пишите интерфейсы в папке `src/types/`, типизируйте все `props`.
4. **Чистый код.** Убирайте за собой все ошибки линтера, особенно `TS6133: 'X' is declared but its value is never read`.
5. **Адаптивность (Mobile-First).** Любой новый блок ОБЯЗАН корректно масштабироваться на мобильных экранах (`flex-col` на мобилках, `lg:flex-row` на десктопе).

---

*Последнее обновление: 22 июня 2026 г.*
