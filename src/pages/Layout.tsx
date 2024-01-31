import { Outlet } from "react-router";
import { NavbarDefault } from "../Layout/Navbar/Navbar";
import "../i18n/config";

const Layout = () => {
  return (
    <div>
      <NavbarDefault />

      <div className="py-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
