import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditProfile from "../components/UserProfile/EditProfile";
import UserInfo from "../components/UserProfile/UserInfo";
import UserOrders from "../components/UserProfile/UserOrders";
import WithGuard from "../components/utils/WithGuard";
import Cart from "../pages/Cart";
import Categories from "../pages/Categories";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "categories/:prefix/products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "profile",
          element: (
            <WithGuard>
              <Profile />
            </WithGuard>
          ),
          // element: <Profile />,
          children: [
            {
              index: true,
              path: "info",
              element: <UserInfo />,
            },
            {
              path: "editprofile",
              element: <EditProfile />,
            },
            {
              path: "orders",
              element: <UserOrders />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
