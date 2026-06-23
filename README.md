<div align="center">
  <img src="https://raw.githubusercontent.com/Luck1y1337/edu-web/main/frontend/public/vite.svg" alt="Logo" width="80" height="80">

  <h3 align="center">EduWeb — Modern Learning Management System</h3>

  <p align="center">
    A comprehensive, state-of-the-art educational platform designed for online learning, course management, and seamless student-teacher interaction.
    <br />
    <a href="#features"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  </p>
</div>

---

## 📖 Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#architecture--design">Architecture & Design</a></li>
    <li><a href="#authentication--security">Authentication & Security</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

---

## 🌟 About The Project

**EduWeb** is a fully functional, enterprise-grade Learning Management System (LMS) tailored for modern educational centers. It features a stunning, highly responsive user interface built with React and TailwindCSS, backed by a robust API ecosystem.

The platform is designed to provide an exceptional user experience, featuring dynamic micro-animations, skeleton loaders, and a beautifully crafted UI that rival top-tier global educational platforms. 

It handles everything from public course catalogs and blogging to secure authentication, complex session management, and personalized student dashboards containing video lessons, grades, and certificates.

---

## 🛠 Tech Stack

The application leverages a modern, high-performance web development stack:

### Frontend
- **Framework:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Utility-first, responsive, dark/light mode ready)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Lightweight, un-opinionated state management)
- **Data Fetching:** [TanStack React Query v5](https://tanstack.com/query/latest) (Server state synchronization, caching)
- **Routing:** [React Router DOM v6](https://reactrouter.com/) (Client-side routing)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) (Performant, flexible validation)
- **HTTP Client:** [Axios](https://axios-http.com/) (With custom interceptors)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/) (Beautiful toast notifications)

### Backend (Architecture Context)
- **Framework:** NestJS (Node.js)
- **API Spec:** OpenAPI / Swagger
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator

---

## ✨ Key Features

### 1. Comprehensive Authentication System
- **Registration & Login:** Secure access using hashed passwords.
- **Refresh Token Rotation:** Silent background token refreshing using Axios interceptors. No forced logouts.
- **Session Management:** View all active devices logged into your account. Remotely revoke access from unrecognized sessions (e.g., "Log out from Windows Chrome").
- **Password Recovery Flow:** Complete "Forgot Password" → "Email Verification" → "Reset Password" pipeline with stringent password validation (Min 8 chars, 1 Uppercase, 1 Number).

### 2. Public Platform
- **Landing Page:** High-converting hero section, statistics, features, and testimonials.
- **Course Catalog:** Filter by category, difficulty level, and price sorting.
- **Blog & News:** Read articles, announcements, and educational tips.
- **Teacher Profiles:** View instructor bios, experience, and their active courses.
- **Contact & FAQ:** Interactive accordions and contact forms for student inquiries.

### 3. Interactive Student Dashboard
- **My Courses:** Track progress, resume paused video lessons, and view completed courses.
- **Lesson Player:** Custom video/content viewer tailored for undisturbed learning.
- **Grades & Results:** Real-time analytics on test scores, homework, and overall performance.
- **Certificates:** Automatically generated, downloadable PDF certificates upon course completion.
- **Payment History:** Track financial transactions, course purchases, and invoices.

### 4. Advanced User Settings
- **Profile Management:** Update personal information (Name, Email, Phone, Address).
- **Security:** In-app password changing mechanism.
- **Preferences:** Notification toggles, language localization (Uzbek, Russian, English), and Timezone settings.

---

## 🏗 Architecture & Design

### Advanced API Interceptors
The application utilizes an advanced Axios interceptor setup to ensure seamless user experiences. 
Whenever a `401 Unauthorized` error occurs:
1. The original request is paused.
2. A background call to `/auth/refresh` is made using the stored `refreshToken`.
3. If successful, new tokens are saved, and the original request is retried.
4. If failed, the user is gracefully logged out, tokens are cleared, and they are redirected to `/login`.

### Global State & Caching
- **Zustand (`user.store.ts`):** Handles synchronous UI state like `isAuthenticated`, `user` profile data, and `tokens`.
- **React Query:** Manages asynchronous server state. Data is automatically cached, stale-checked, and refetched when the user refocuses the window, ensuring data is always fresh.

### UI / UX Aesthetics
- **Component-Driven:** Everything is broken down into reusable UI components (`Input`, `Button`, `Icon`, `GlobalSpinner`).
- **Icons:** A centralized `Icon.tsx` registry using optimized SVG paths to prevent DOM bloat and ensure zero layout shifts.
- **Responsive:** Mobile-first approach. The dashboard transforms from a side-navigation layout on desktop to a bottom-sheet / hamburger menu on mobile.

---

## 🔐 Authentication & Security

The platform follows modern security standards for SPA (Single Page Applications):

1. **Tokens:** Uses short-lived `accessToken` and long-lived `refreshToken`.
2. **Storage:** Tokens are securely managed in `localStorage` with utility wrappers.
3. **Protected Routes:** `ProtectedRoute.tsx` wrapper ensures that unauthenticated users attempting to access `/dashboard/*` are immediately redirected.
4. **State Hydration:** On application boot, if a token exists but state is empty, `useMe()` hook automatically fetches the user profile to prevent flickering.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Luck1y1337/edu-web.git
   ```

2. **Navigate to the frontend directory:**
   ```sh
   cd edu-web/frontend
   ```

3. **Install NPM packages:**
   ```sh
   npm install
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   ```

---

## 📂 Project Structure

```text
frontend/
├── public/                 # Static assets (images, svgs, favicons)
├── src/
│   ├── components/         # Reusable React components
│   │   ├── auth/           # ProtectedRoute, Auth wrappers
│   │   ├── home/           # Landing page sections (Header, Footer)
│   │   ├── layouts/        # RootLayout, DashboardLayout
│   │   └── ui/             # Buttons, Inputs, Icons, Loaders
│   ├── config/             # App configuration
│   │   ├── axios.ts        # Axios instance & interceptors
│   │   └── endpoints.ts    # Centralized API route dictionary
│   ├── data/               # Mock data & statics (before API integration)
│   ├── hooks/
│   │   └── api/            # React Query hooks (useMe, useLogin, useSessions...)
│   ├── pages/              # Page components mapping to routes
│   ├── routes/             # React Router definitions (routes.tsx)
│   ├── store/              # Zustand state management (user.store.ts)
│   ├── types/              # TypeScript interfaces and types
│   └── utils/              # Helper functions (localstorage.ts, mappers)
├── index.html              # Entry HTML point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

---

## 🔌 API Endpoints

The frontend communicates with a comprehensive backend structure. Here is a brief overview of the mapped endpoints in `endpoints.ts`:

### Authentication (`/api/v1/auth`)
- `POST /login` - Authenticate user and receive tokens.
- `POST /register` - Create a new student account.
- `POST /refresh` - Generate new access tokens.
- `POST /logout` - Invalidate current session.
- `POST /forgot-password` - Initiate password reset.
- `POST /reset-password` - Finalize password reset.
- `GET /me` - Retrieve authenticated user's profile.

### User Settings (`/api/v1/user`)
- `PATCH /password` - Change account password.
- `GET /sessions` - List all active device sessions.
- `DELETE /sessions/:id` - Terminate a specific session remotely.

### Public Data (`/api/v1/public`)
- `GET /courses` - Fetch course catalog.
- `GET /teachers` - Fetch instructor profiles.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <i>Developed with ❤️ for modern education.</i>
</div>
