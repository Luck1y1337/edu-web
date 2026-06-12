import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Teachers from "../pages/Teachers";
import Contact from "../pages/Contact";

const routes = createBrowserRouter([
  {
    path: "/",
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default routes;
