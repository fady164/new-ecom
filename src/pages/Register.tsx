import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { register } from "../store/user/authSlice";

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userToken, loading, success } = useAppSelector((state) => state.auth);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      dispatch(register(values))
        .unwrap()
        .then(() => {
          localStorage.setItem("token", userToken!);
          navigate("/");
        })
        .catch(() => {
          setIsError(true);
        });
    },
  });

  return (
    <div className="flex items-center justify-center w-full mt-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {t("form.signUp")}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {t("form.subTitle")}
        </Typography>
        {isError && <p className="text-red-300">{"Something went wrong!"}</p>}

        <form
          className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-6 mb-1">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              {t("form.username")}
            </Typography>
            <div>
              <Input
                size="lg"
                type="text"
                crossOrigin={"anonymous"}
                placeholder={t("form.username_placeholder")}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={formik.handleChange("username")}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username ? (
                <p className="text-red-300">{formik.errors.username}</p>
              ) : null}
            </div>

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
            {t("form.signUp")}
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            {t("form.haveAcc")}{" "}
            <Link to="/login" className="font-medium text-gray-900">
              {t("form.signIn")}
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Register;
