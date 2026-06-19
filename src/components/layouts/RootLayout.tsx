import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
