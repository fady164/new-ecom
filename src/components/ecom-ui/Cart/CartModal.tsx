import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type Props = {
  open: boolean;
  handleOpen: () => void;
};

export function CartModal({ open, handleOpen }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{t("modal.title")}</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span> {t("modal.cancel")}</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span>{t("nav.login")}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CartModal;
