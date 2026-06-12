import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "../routes/routes";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();
const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={routes} />,
    </QueryClientProvider>
  );
};
export default Providers;
