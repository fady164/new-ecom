import { Card, List, ListItem } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap lg:flex-nowrap lg:gap-5">
        <div className="flex flex-col w-full gap-5 p-2 lg:w-fit">
          <div className="flex justify-center ">
            <img
              className="object-cover object-center w-48 h-48 rounded-full"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="nature image"
            />
          </div>

          <Card className="w-full lg:w-96">
            <List>
              <ListItem>
                <Link
                  to="/profile/info"
                  className="text-decoration-none text-dark"
                >
                  {t("profile.your_info")}
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/profile/editprofile"
                  className="text-decoration-none text-dark"
                >
                  {t("profile.edit_profile")}
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/profile/orders"
                  className="text-decoration-none text-dark"
                >
                  {t("profile.orders")}
                </Link>
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="w-full mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// export default withGuardTest(Profile);
export default Profile;
