import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
