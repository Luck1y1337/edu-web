import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GlobalError from "../components/ui/GlobalError";
import GlobalSpinner from "../components/ui/GlobalSpinner";

const Login = React.lazy(() => import("../pages/Login"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Register = React.lazy(() => import("../pages/Register"));
const Enrollment = React.lazy(() => import("../pages/Enrollment"));
const StudentDashboard = React.lazy(() => import("../pages/StudentDashboard"));
const Teachers = React.lazy(() => import("../pages/Teachers"));
const Home = React.lazy(() => import("../pages/Home"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

// Scaffolding imports
const About = React.lazy(() => import("../pages/About"));
const Blog = React.lazy(() => import("../pages/Blog"));
const BlogDetail = React.lazy(() => import("../pages/BlogDetail"));
const Courses = React.lazy(() => import("../pages/Courses"));
const CourseDetail = React.lazy(() => import("../pages/CourseDetail"));
const TeacherDetail = React.lazy(() => import("../pages/TeacherDetail"));
const Pricing = React.lazy(() => import("../pages/Pricing"));
const FaqPage = React.lazy(() => import("../pages/FaqPage"));

const StudentCourses = React.lazy(() => import("../pages/StudentCourses"));
const CourseDetailStudent = React.lazy(() => import("../pages/CourseDetailStudent"));
const LessonPage = React.lazy(() => import("../pages/LessonPage"));
const StudentResults = React.lazy(() => import("../pages/StudentResults"));
const StudentCertificates = React.lazy(() => import("../pages/StudentCertificates"));
const StudentProfile = React.lazy(() => import("../pages/StudentProfile"));
const StudentPayments = React.lazy(() => import("../pages/StudentPayments"));
const StudentSettings = React.lazy(() => import("../pages/StudentSettings"));
const BuyCourse = React.lazy(() => import("../pages/BuyCourse"));
const DashboardCatalog = React.lazy(() => import("../pages/DashboardCatalog"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<GlobalSpinner />}>
    <Component />
  </Suspense>
);

const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <GlobalError />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "/about", element: withSuspense(About) },
      { path: "/blog", element: withSuspense(Blog) },
      { path: "/blog/:slug", element: withSuspense(BlogDetail) },
      { path: "/courses", element: withSuspense(Courses) },
      { path: "/courses/:slug", element: withSuspense(CourseDetail) },
      { path: "/teachers", element: withSuspense(Teachers) },
      { path: "/teachers/:id", element: withSuspense(TeacherDetail) },
      { path: "/pricing", element: withSuspense(Pricing) },
      { path: "/faq", element: withSuspense(FaqPage) },
      { path: "/contact", element: withSuspense(Contact) },
      { path: "/enroll", element: withSuspense(Enrollment) },
      { path: "*", element: withSuspense(NotFound) },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <GlobalError />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: withSuspense(StudentDashboard) },
          { path: "courses", element: withSuspense(StudentCourses) },
          { path: "courses/:id", element: withSuspense(CourseDetailStudent) },
          { path: "results", element: withSuspense(StudentResults) },
          { path: "certificates", element: withSuspense(StudentCertificates) },
          { path: "profile", element: withSuspense(StudentProfile) },
          { path: "payments", element: withSuspense(StudentPayments) },
          { path: "settings", element: withSuspense(StudentSettings) },
          { path: "buy-course", element: withSuspense(BuyCourse) },
          { path: "catalog", element: withSuspense(DashboardCatalog) },
        ],
      },
      {
        path: "/dashboard/lesson/:id",
        element: withSuspense(LessonPage),
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(Login),
    errorElement: <GlobalError />,
  },
  {
    path: "/register",
    element: withSuspense(Register),
    errorElement: <GlobalError />,
  },
  {
    path: "/forgot-password",
    element: withSuspense(React.lazy(() => import("../pages/ForgotPassword"))),
    errorElement: <GlobalError />,
  },
  {
    path: "/reset-password",
    element: withSuspense(React.lazy(() => import("../pages/ResetPassword"))),
    errorElement: <GlobalError />,
  },
  {
    path: "/verify-email",
    element: withSuspense(React.lazy(() => import("../pages/VerifyEmail"))),
    errorElement: <GlobalError />,
  },
]);
export default routes;
