import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { EditProfile, UserInfo, UserOrders } from "../components/UserProfile";
import WithGuard from "../components/utils/WithGuard";
import {
  Cart,
  Categories,
  Home,
  Layout,
  Login,
  Products,
  Profile,
  Register,
} from "../pages";

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
