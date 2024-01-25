import { Outlet } from "react-router";
import { NavbarDefault } from "../Layout/Navbar/Navbar";
import "../i18n/config";

const Layout = () => {
  return (
    <div>
      <NavbarDefault />
      {/* <Card>
        <App />
      </Card> */}
      <div className="py-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
