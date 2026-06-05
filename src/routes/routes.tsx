import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../pages/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1></h1>,
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
