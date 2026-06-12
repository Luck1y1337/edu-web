import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
