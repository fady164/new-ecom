import {
  Alert,
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateUserData } from "../../store/user/authSlice";

const EditProfile = () => {
  const { t } = useTranslation();

  const {
    userInfo: { email, username },
    loading,
    error,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username,
    email,
    password: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserData(formData!));
      setIsUpdated(true);
    } catch (error) {
      setIsUpdated(false);
    }
  };
  return (
    <Card>
      {isUpdated && (
        <Alert key="success" variant="gradient" color="blue">
          Updated Successfully
        </Alert>
      )}
      {error && (
        <Alert key="danger" variant="gradient" color="red">
          Field to update
        </Alert>
      )}
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="">
          {t("profile.edit_profile")}
        </Typography>
        <form className="max-w-screen-lg mt-2 mb-2 " onSubmit={submitHandler}>
          <div className="flex flex-col gap-3 mb-1">
            <Typography variant="h6" color="blue-gray">
              {t("form.username")}
            </Typography>
            <Input
              type="email"
              placeholder={t("form.username_placeholder")}
              value={formData.username}
              name="username"
              onChange={formHandler}
              size="lg"
              crossOrigin={"anonymous"}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray">
              {t("form.email")}
            </Typography>
            <Input
              type="email"
              name="email"
              placeholder={t("form.email_placeholder")}
              value={formData.email}
              onChange={formHandler}
              size="lg"
              crossOrigin={"anonymous"}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="">
              {t("form.password")}
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              size="lg"
              type="password"
              name="password"
              placeholder={t("form.password_placeholder")}
              value={formData.password}
              onChange={formHandler}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6" type="submit" disabled={loading} fullWidth>
            {t("profile.update")}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default EditProfile;
