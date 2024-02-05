import {
  Avatar,
  Badge,
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { CartIcon, CloseIcon, OpenIcon } from "../../assets";
import { getMemoizedNumItems } from "../../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/user/authSlice";

import "/node_modules/flag-icons/css/flag-icons.min.css";

export function NavbarDefault() {
  const { t } = useTranslation();

  const numsItems = useAppSelector(getMemoizedNumItems);
  const { success } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="h5" className="font-medium ">
        <Link to="/" className="text-gray-700 no-underline">
          {t("nav.home")}
        </Link>
      </Typography>

      <Typography
        as="div"
        variant="h5"
        color="blue-gray"
        className="font-medium"
      >
        <Link to="/categories" className="text-gray-700 no-underline">
          {t("nav.categories")}
        </Link>
      </Typography>
    </ul>
  );

  let langBtn = isEnglish ? (
    <LangBtn
      lang="ar"
      direction="rtl"
      country="eg"
      setIsEnglish={setIsEnglish}
    />
  ) : (
    <LangBtn
      lang="en"
      direction="ltr"
      country="us"
      setIsEnglish={setIsEnglish}
    />
  );

  const profileList = [
    {
      url: "/profile/info",
      title: t("nav.profile"),
    },
    {
      url: "/profile/editprofile",
      title: t("profile.edit_profile"),
    },
    {
      url: "/profile/orders",
      title: t("profile.order"),
    },
  ];

  const LogBtns = (
    <>
      <Button variant="text" size="sm">
        <Link to="/login" className="w-full text-gray-700 no-underline">
          {t("nav.login")}
        </Link>
      </Button>
      <Button variant="gradient" size="sm">
        <Link to="/register" className="w-full no-underline text-blue-gray-50">
          {t("nav.register")}
        </Link>
      </Button>
    </>
  );

  return (
    <Navbar className="max-w-full px-4 py-2 lg:px-8 ">
      <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
        <Typography as="div" className="hidden mr-4 font-medium lg:block">
          E-Comm
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div
          className={`flex items-center ${
            success ? "justify-between" : "justify-end"
          } w-full lg:w-fit lg:justify-end gap-x-5 `}
        >
          {/* IsLogged In ? */}
          {success ? (
            <div className="">
              <Menu>
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="border border-red-100 cursor-pointer"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </MenuHandler>
                <MenuList>
                  {profileList.map(({ url, title }, index) => (
                    <MenuItem key={index} className="flex items-center gap-2">
                      <Typography variant="paragraph" className="font-medium">
                        <Link to={url} className="">
                          {title}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}

                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem
                    className="flex items-center gap-2 "
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    <Typography variant="small" className="font-medium">
                      {t("nav.logout")}
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <div className="hidden lg:inline-block">{LogBtns}</div>
          )}

          <div className="flex items-center gap-x-3">
            <Badge withBorder color="gray" content={numsItems}>
              <Button variant="outlined" size="sm">
                <Link to={"/cart"} className="no-underline text-blue-gray-50 ">
                  <img
                    src={CartIcon}
                    alt="Custom Icon"
                    className="w-10 h-4 text-gray-800"
                  />
                </Link>
              </Button>
            </Badge>

            <div className="">{langBtn}</div>

            <IconButton
              variant="text"
              className="w-10 h-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <img src={CloseIcon} alt="close Icon" className="w-10 h-6" />
              ) : (
                <img src={OpenIcon} alt="open Icon" className="w-10 h-6" />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <hr className="my-2 border-blue-gray-50" />
          {!success ? (
            <div className="flex items-center gap-5">{LogBtns}</div>
          ) : (
            <Typography
              variant="h5"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="font-medium text-gray-700 "
            >
              {t("nav.logout")}
            </Typography>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

const LangBtn = ({
  lang,
  direction,
  country,
  setIsEnglish,
}: {
  lang: string;
  direction: string;
  country: string;
  setIsEnglish: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string, dir: string) => {
    i18n.changeLanguage(language);
    document.body.dir = dir;
    setIsEnglish((prev) => !prev);
  };

  return (
    <button onClick={() => changeLanguage(lang, direction)}>
      <span className={`fi fi-${country}`}></span>
    </button>
  );
};
