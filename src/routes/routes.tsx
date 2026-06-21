import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GlobalError from "../components/ui/GlobalError";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import Teachers from "../pages/Teachers";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
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
            element: <StudentDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <GlobalError />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <GlobalError />,
  },
]);
export default routes;
