import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

const UserInfo = () => {
  const { t } = useTranslation();

  const {
    userInfo: { email, username },
  } = useAppSelector((state) => state.auth);
  return (
    <Card className="w-full">
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {t("profile.your_info")}
        </Typography>
        <div className="flex flex-col flex-wrap w-full lg:flex-row lg:gap-48">
          <div>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {t("form.username")}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              {username}
            </Typography>
          </div>
          <div>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {t("form.email")}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              {email}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserInfo;
