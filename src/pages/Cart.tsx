import { useTranslation } from "react-i18next";
import LottieAnimation from "../components/Layout/Lottie/LottieAnimation";
import { CartList } from "../components/ecom-ui/index";
import { useAppSelector } from "../store/hooks";

const Cart = () => {
  const { t } = useTranslation();

  const { cartItemData } = useAppSelector((state) => state.cart);

  if (!Object.values(cartItemData).length)
    return <LottieAnimation type="emptyCart" />;

  return (
    <main className="page">
      <h1>{t("cart.total")}</h1>
      <CartList cartItemData={cartItemData} />
    </main>
  );
};

export default Cart;
