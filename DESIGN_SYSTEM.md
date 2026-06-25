# Design System — O'quv Markaz

Маппинг из ванильного CSS-дизайна (`project-front-design/oquv-markaz`) в Tailwind CSS.

## Цвета

Все цвета из дизайна **точно совпадают** с дефолтной палитрой Tailwind:

| Дизайн-токен | Tailwind | Использование |
|---|---|---|
| `--color-primary-600` `#2563EB` | `blue-600` | Основной цвет (кнопки, ссылки, акцент) |
| `--color-accent-600` `#7C3AED` | `violet-600` | Вторичный акцент |
| `--color-success` `#10B981` | `emerald-500` | Успех, активный статус |
| `--color-warning` `#F59E0B` | `amber-500` | Предупреждения, ожидание |
| `--color-danger` `#EF4444` | `red-500` | Ошибки, удаление |
| gray scale | `gray-50..900` | Текст, фон, бордеры |

Семантические:
- Фон страницы: `bg-white` (public), `bg-gray-50` (admin/dashboard)
- Бордеры: `border-gray-200` (default), `border-gray-300` (strong)
- Текст: `text-gray-900` (primary), `text-gray-500` (muted), `text-gray-400` (subtle)

## Типографика

| Элемент | Шрифт | Размер | Вес | Tailwind |
|---|---|---|---|---|
| h1 | Manrope | 48px | 800 | `font-manrope text-5xl font-extrabold` |
| h2 | Manrope | 40px | 700 | `font-manrope text-[40px] font-bold` |
| h3 | Manrope | 32px | 700 | `font-manrope text-[32px] font-bold` |
| h4 | Manrope | 24px | 600 | `font-manrope text-2xl font-semibold` |
| h5 | Manrope | 20px | 600 | `font-manrope text-xl font-semibold` |
| h6 | Manrope | 18px | 600 | `font-manrope text-lg font-semibold` |
| body | Inter | 16px | 400 | `text-base font-normal` |
| small | Inter | 14px | 400 | `text-sm` |

Все заголовки: `leading-tight tracking-tight`.

## Border Radius

| Дизайн | Значение | Tailwind |
|---|---|---|
| Кнопки, инпуты | 8px | `rounded-lg` |
| Карточки, дропдауны | 12px | `rounded-xl` |
| Модалки, большие карточки | 16px | `rounded-2xl` |
| Бейджи, аватары | 9999px | `rounded-full` |

## Тени

| Дизайн | Tailwind |
|---|---|
| Карточки по умолчанию | нет тени, только `border` |
| Карточки hover | `shadow-md` |
| Модалки | `shadow-2xl` |
| Focus ring | `ring-3 ring-blue-600/20` |

## Кнопки

| Вариант | Tailwind классы |
|---|---|
| Primary | `bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-5 py-3 text-sm font-semibold` |
| Outline | `border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-5 py-3 text-sm font-semibold` |
| Ghost | `text-gray-600 hover:bg-gray-50 rounded-lg px-5 py-3 text-sm font-semibold` |
| Danger | `bg-red-500 text-white hover:bg-red-600 rounded-lg px-5 py-3 text-sm font-semibold` |
| Success | `bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg px-5 py-3 text-sm font-semibold` |
| sm | `px-4 py-2 text-xs min-h-[32px]` |
| lg | `px-6 py-4 text-base min-h-[48px]` |

## Инпуты

```
border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900
placeholder:text-gray-400
focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none
```

## Бейджи

| Вариант | Tailwind |
|---|---|
| Primary | `bg-blue-50 text-blue-700` |
| Success | `bg-emerald-50 text-emerald-700` |
| Warning | `bg-amber-50 text-amber-700` |
| Danger | `bg-red-50 text-red-700` |
| Neutral | `bg-gray-100 text-gray-600` |
| Все | `rounded-full px-3 py-1 text-xs font-semibold` |
| С точкой | добавить `span` с `w-1.5 h-1.5 rounded-full bg-current` |

## Таблицы

- Header: `bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600`
- Cell padding: header `px-5 py-3`, body `px-5 py-4`
- Rows: `border-b border-gray-200 hover:bg-gray-50`

## Layout размеры

| Элемент | Значение |
|---|---|
| Sidebar width | 260px (`w-[260px]`) |
| Header/Topbar height | 72px |
| Container max-width | 1440px |
| Content padding | `px-6 lg:px-10 py-8` |

## Admin Sidebar структура

```
Секция "Asosiy":
  - Dashboard (home icon)
  - Kurslar (book icon)  
  - O'quvchilar (user icon)

Секция "Moliya":
  - To'lovlar (creditCard icon)

Секция "Kontent":
  - Sertifikatlar (award icon)
  - Sharhlar (star icon)

Секция "Tizim":
  - Sozlamalar (settings icon)
```

Активный пункт: `bg-blue-50 text-blue-600` + левый индикатор `w-1 h-6 bg-blue-600 rounded-full`.

## Student Sidebar

Лого с зелёным иконом (emerald). Секции:
- "Online ta'lim": Dashboard, Mening kurslarim, Kurslar katalogi, Natijalarim, Sertifikatlarim
- "Hisob": Profil, To'lovlar, Sozlamalar

## Ключевые паттерны

### Page Hero (публичные)
Серый фон (`bg-gray-50`), breadcrumb сверху, заголовок + описание.

### Section Header (публичные)
Eyebrow badge + заголовок + описание по центру.

### Course Card
Media (aspect 16:9) → Body (badge + rating, title, description, teacher avatar) → Footer (price + CTA).

### Teacher Card
Avatar (rounded-full) → Name → Role → Bio → Stats row (3 items).

### Stat Tile (admin)
Icon-box (colored) → Trend badge → Value (large number) → Label.

### Filter Bar (admin)
Search input + select dropdowns в одну строку.
