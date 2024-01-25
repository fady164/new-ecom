import { Button, Card, Input, Typography } from "@material-tailwind/react";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/user/authSlice";

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector((state) => state.auth);

  const [isError, setIsError] = useState("");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          setIsError(e?.response?.data);
        });
    },
  });
  return (
    <div className="flex items-center justify-center w-full p-2 mt-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {t("form.signIn")}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {t("form.welcome")}
        </Typography>

        {isError && <p className="text-red-300">{"Something went wrong!"}</p>}

        <form
          className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-6 mb-1">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {t("form.email")}
            </Typography>
            <div>
              <Input
                type="email"
                placeholder={t("form.email_placeholder")}
                onChange={formik.handleChange("email")}
                value={formik.values.email}
                size="lg"
                crossOrigin={"anonymous"}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="text-red-300">{formik.errors.email}</p>
              ) : null}
            </div>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {t("form.password")}
            </Typography>
            <div>
              <Input
                type="password"
                crossOrigin={"anonymous"}
                size="lg"
                placeholder={t("form.password_placeholder")}
                onChange={formik.handleChange("password")}
                value={formik.values.password}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-red-300">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>

          <Button className="mt-6" type="submit" disabled={loading} fullWidth>
            {t("form.signIn")}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
