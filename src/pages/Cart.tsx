import LottieAnimation from "../components/Layout/Lottie/LottieAnimation";
import { CartList } from "../components/ecom-ui/index";
import { useAppSelector } from "../store/hooks";

const Cart = () => {
  const { cartItemData } = useAppSelector((state) => state.cart);

  if (!Object.values(cartItemData).length)
    return <LottieAnimation type="emptyCart" />;

  return (
    <main className="flex flex-col gap-5 my-10 page">
      <CartList cartItemData={cartItemData} />
    </main>
  );
};

export default Cart;
