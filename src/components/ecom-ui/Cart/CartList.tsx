import { MouseEvent, useEffect, useState } from "react";

import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import {
  getCartItems,
  getTotalPrice,
  newOrder,
} from "../../../store/cart/cartSlice";
import { CartItemDataType } from "../../../store/cart/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Loading } from "../../Layout";
import styles from "./Cart.module.css";
import CartCard from "./CartCard";
import CartModal from "./CartModal";

const CartList = ({ cartItemData }: { cartItemData: CartItemDataType }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { items, error, loading } = useAppSelector((state) => state.cart);
  const { success } = useAppSelector((state) => state.auth);
  const total = useAppSelector(getTotalPrice);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const renderCartItems = items.map((product) => (
    <CartCard
      product={product}
      quantity={cartItemData[product.id]}
      key={product.id}
    />
  ));

  const submitOrder = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (success) {
      const orders = items.map((item) => ({
        product: item,
        quantity: cartItemData[item.id],
      }));
      dispatch(newOrder(orders));
    } else {
      handleOpen();
    }
  };

  return (
    <Loading error={error!} loading={loading}>
      <>
        <h1>{t("cart.total")}</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("cart.product")}</th>
              <th>{t("cart.quantity")}</th>
              <th>{t("cart.price")}</th>
              <th>{t("cart.remove")}</th>
            </tr>
          </thead>
          <tbody>{renderCartItems}</tbody>
          <tfoot>
            <tr>
              <td>{t("cart.total")}</td>
              <td></td>
              <td className={styles.total}>${total}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <form>
          <Button onClick={submitOrder} variant="gradient" type="submit">
            {t("cart.checkout")}
          </Button>
        </form>
        <CartModal open={open} handleOpen={handleOpen} />
      </>
    </Loading>
  );
};

export default CartList;
