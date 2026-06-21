import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "../routes/routes";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ToastContainer />
    </QueryClientProvider>
  );
};
export default Providers;
