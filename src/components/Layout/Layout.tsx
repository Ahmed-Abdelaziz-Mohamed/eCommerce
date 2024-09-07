import { FC } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6 py-6">
        <Outlet />
      </div>
      <div className="mt-56">
        <Footer />
      </div>
    </>
  );
};
export default Layout;
