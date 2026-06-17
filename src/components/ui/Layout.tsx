import { Outlet } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
