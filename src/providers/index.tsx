import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "../routes/routes";
const queryClient = new QueryClient();
const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />,
    </QueryClientProvider>
  );
};
export default Providers;
