<p align="center">
  <img src="public/favicon.svg" width="80" height="80" alt="O'quv Markaz" />
</p>

<h1 align="center">O'quv Markaz</h1>

<p align="center">
  <strong>Learning Management System — Frontend</strong><br/>
  Full-featured SPA for managing an online education platform.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#route-map">Route Map</a> •
  <a href="#api-integration">API Integration</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#license">License</a>
</p>

---

## Overview

O'quv Markaz is a modern, production-ready frontend for an online education platform. Built with React 19 and TypeScript, it provides a seamless experience across three user roles — **public visitors**, **enrolled students**, and **administrators** — with 45+ fully implemented pages, real-time data from a REST API, and a responsive design system.

## Features

### Public Portal
- **Landing page** with hero section, course catalog preview, instructor showcase, testimonials, and FAQ
- **Course catalog** with filtering by category, level, and price — full-text search and pagination
- **Course detail** pages with curriculum breakdown, instructor profiles, and ARIA-compliant tabs
- **Instructor directory** with specialty filters and detailed profile pages
- **Blog** with featured posts, category sidebar, and commenting
- **Pricing page** with plan comparison
- **Contact form** with validation and submission to backend

### Student Dashboard
- **Personalized dashboard** with continue-learning banner, weekly goals, and progress tracking
- **Enrolled courses** with real progress percentages and completion dates
- **Lesson player** with video playback, responsive curriculum drawer, and lesson navigation
- **Test results** with detailed score breakdowns
- **Certificate management** — claim earned certificates with scoped loading states
- **Payment history** with transaction details
- **Settings** — password change and session management (logout all other sessions)
- **Course catalog** — browse and purchase available courses

### Admin Panel
- **KPI dashboard** with real-time statistics, recent registrations, and CSV export
- **Student management** — CRUD operations, profile pages with enrollment and payment tabs
- **Instructor management** — full CRUD with specialty, experience, and social links
- **Course builder** — create courses with nested modules and lessons
- **Payment management** — status tracking and inline status changes
- **Certificate administration** — issuance tracking and revocation
- **Review moderation** — approve or reject student reviews with star rating display
- **Blog management** — post CRUD with draft/publish workflow
- **Contact messages** — expandable message rows with keyboard-accessible status workflow
- **Platform settings** — admin configuration page
- **Responsive tables** — mobile card view for all admin data tables

### Platform-Wide
- **JWT authentication** with automatic token refresh and role-based routing
- **Accessibility** — ARIA tabs, dialog semantics with focus trap, screen-reader captions on all tables, labeled inputs, keyboard navigation, `prefers-reduced-motion` support
- **Profile dropdown** in header with quick navigation and logout modal
- **Search debounce** (300ms) across all admin list pages
- **Error boundaries** with retry functionality
- **Loading & error states** — skeleton loaders, error blocks with retry on all data-fetching pages
- **Responsive design** — optimized for desktop, tablet, and mobile viewports
- **Animations** — framer-motion with automatic reduced-motion guard

## Tech Stack

| Layer | Technology |
|---|---|
| **UI Framework** | React 19 with React Compiler |
| **Language** | TypeScript 6 (strict mode) |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 (v4 utility syntax) |
| **Routing** | React Router DOM 7 (`createBrowserRouter`) |
| **Server State** | TanStack React Query 5 |
| **Client State** | Zustand with persist middleware |
| **HTTP Client** | Axios with JWT interceptors |
| **Forms** | React Hook Form 7 + Zod validation |
| **Animations** | Framer Motion 12 |
| **Notifications** | React Toastify |

## Architecture

```
src/
├── config/              # Axios instance, API endpoints, query keys
├── types/               # TypeScript interfaces (Swagger-derived DTOs)
├── services/
│   ├── api.ts           # API call functions (auth, public, student, admin)
│   └── mappers.ts       # DTO → UI model transformers
├── store/               # Zustand stores (auth/user state)
├── hooks/
│   ├── api/             # React Query hooks (useAdminStudents, useAdminCourses, etc.)
│   └── useDebounce.ts   # Generic debounce hook
├── components/
│   ├── ui/              # Design system: Button, Input, Icon, Motion, Skeleton, etc.
│   ├── layouts/         # RootLayout, DashboardLayout, AdminLayout
│   ├── auth/            # ProtectedRoute, AdminRoute (role guards)
│   ├── admin/           # AdminSidebar (desktop + mobile drawer), AdminTopbar
│   ├── home/            # Header, Footer, Hero, Stats, FAQ, CTA
│   └── ...              # Domain-specific: courses, blog, dashboard, teachers, contact
├── pages/               # All route pages (lazy-loaded via React.lazy)
├── routes/              # Router configuration (createBrowserRouter)
└── data/                # Static UI data (navigation links, FAQ entries)
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- A running backend API instance

### Installation

```bash
# Clone the repository
git clone https://github.com/Luck1y1337/oquv-markaz-frontend.git
cd oquv-markaz-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and set VITE_BACKEND_URL to your API endpoint

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_BACKEND_URL` | Backend API base URL | `/api/v1` or `http://localhost:3000/api/v1` |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

## Route Map

### Public Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, courses, instructors, testimonials, FAQ |
| `/courses` | Course catalog with filters, search, and pagination |
| `/courses/:slug` | Course detail — curriculum, instructor, reviews |
| `/teachers` | Instructor directory with specialty filters |
| `/teachers/:id` | Instructor profile — bio, courses, experience |
| `/blog` | Blog with featured posts and category sidebar |
| `/blog/:slug` | Article detail with comments |
| `/pricing` | Plan comparison and pricing |
| `/faq` | Frequently asked questions with accordion |
| `/contact` | Contact form with info sidebar |
| `/about` | About page — timeline, team, mission |

### Authentication

| Route | Description |
|---|---|
| `/login` | Sign in (supports `?next=` redirect) |
| `/register` | Sign up |
| `/forgot-password` | Password recovery |
| `/reset-password` | Password reset |
| `/verify-email` | Email verification |

### Student Dashboard (`/dashboard`)

| Route | Description |
|---|---|
| `/dashboard` | Overview — continue learning, stats, weekly goal |
| `/dashboard/courses` | Enrolled courses with progress |
| `/dashboard/courses/:id` | Course detail (enrolled view) |
| `/dashboard/lesson/:id` | Lesson player with curriculum drawer |
| `/dashboard/results` | Test results and scores |
| `/dashboard/certificates` | Certificate gallery (earned + locked) |
| `/dashboard/payments` | Payment history |
| `/dashboard/profile` | User profile |
| `/dashboard/settings` | Password change and session management |
| `/dashboard/catalog` | Browse available courses |
| `/dashboard/buy-course` | Course purchase flow |

### Admin Panel (`/admin`)

| Route | Description |
|---|---|
| `/admin` | Dashboard — KPI tiles, recent activity, CSV export |
| `/admin/students` | Student list — search, filter, pagination |
| `/admin/students/new` | Create student |
| `/admin/students/:id` | Student profile — enrollments, payments |
| `/admin/instructors` | Instructor list |
| `/admin/instructors/new` | Create instructor |
| `/admin/instructors/:id` | Instructor profile |
| `/admin/courses` | Course list — status and category filters |
| `/admin/courses/new` | Course builder — modules and lessons |
| `/admin/courses/:id` | Course detail and edit |
| `/admin/payments` | Payment management — status changes |
| `/admin/certificates` | Certificate administration |
| `/admin/reviews` | Review moderation |
| `/admin/blog` | Blog post management |
| `/admin/blog/new` | Create blog post |
| `/admin/contact` | Contact message inbox |
| `/admin/settings` | Platform settings |

## API Integration

The frontend communicates with a NestJS REST API featuring:

- **JWT Authentication** — access + refresh token flow with automatic renewal on 401
- **Role-based Access** — `student`, `instructor`, `admin`, `super_admin`
- **Strict Validation** — backend enforces query parameter whitelist (no unknown params)
- **Paginated Responses** — standardized `{ items, total, page, limit, totalPages }` format

All API calls are centralized in `services/api.ts` with typed request/response interfaces derived from the Swagger specification.

## Deployment

### Vercel (Recommended)

The project includes a `vercel.json` with:
- **API proxy** — rewrites `/api/*` to the backend, solving HTTPS mixed-content issues
- **SPA fallback** — all routes serve `index.html` for client-side routing

```bash
npx vercel --prod
```

Set the `VITE_BACKEND_URL` environment variable to `/api/v1` in your Vercel project settings.

### Static Export

```bash
npm run build
# Serve the dist/ directory with any static file server
# Ensure all routes fallback to index.html
```

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/Luck1y1337"><strong>Luck1y</strong></a>
</p>
