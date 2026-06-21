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
const StudentDashboard = React.lazy(() => import("../pages/StudentDashboard"));
const Teachers = React.lazy(() => import("../pages/Teachers"));
const Home = React.lazy(() => import("../pages/Home"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

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
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "/teachers",
        element: withSuspense(Teachers),
      },
      {
        path: "/contact",
        element: withSuspense(Contact),
      },
      {
        path: "*",
        element: withSuspense(NotFound),
      },
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
          {
            index: true,
            element: withSuspense(StudentDashboard),
          },
        ],
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
]);
export default routes;
