import { MouseEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
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

const CartList = ({ cartItemData }: { cartItemData: CartItemDataType }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, error, loading } = useAppSelector((state) => state.cart);
  const { success } = useAppSelector((state) => state.auth);
  const total = useAppSelector(getTotalPrice);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    const orders = items.map((item) => ({
      product: item,
      quantity: cartItemData[item.id],
    }));

    if (success) {
      dispatch(newOrder(orders));
    } else {
      handleShow();
    }
  };

  return (
    <Loading error={error!} loading={loading}>
      <>
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
          <button className={styles.button} type="submit" onClick={submitOrder}>
            {t("cart.checkout")}
          </button>
        </form>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>You must login first</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Loading>
  );
};

export default CartList;
// ------------------------------------------------------
// import { MouseEvent, useEffect, useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
// import { useTranslation } from "react-i18next";
// import {
//   getCartItems,
//   getTotalPrice,
//   newOrder,
// } from "../../../store/cart/cartSlice";
// import { CartItemDataType } from "../../../store/cart/types";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
// import { Loading } from "../../Layout";
// import styles from "./Cart.module.css";
// import CartCard from "./CartCard";

// const CartList = ({ cartItemData }: { cartItemData: CartItemDataType }) => {
//   const { t } = useTranslation();

//   const dispatch = useAppDispatch();
//   const { items, error, loading } = useAppSelector((state) => state.cart);
//   const { success } = useAppSelector((state) => state.auth);
//   const total = useAppSelector(getTotalPrice);

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     dispatch(getCartItems());
//   }, []);

//   const renderCartItems = items.map((product) => (
//     <CartCard
//       product={product}
//       quantity={cartItemData[product.id]}
//       key={product.id}
//     />
//   ));

//   const submitOrder = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     const orders = items.map((item) => ({
//       product: item,
//       quantity: cartItemData[item.id],
//     }));

//     if (success) {
//       dispatch(newOrder(orders));
//     } else {
//       handleShow();
//     }
//   };

//   return (
//     <Loading error={error!} loading={loading}>
//       <>
//         <Table bordered hover responsive="sm" className={styles.table}>
//           <thead>
//             <tr>
//               <th>{t("cart.product")}</th>
//               <th>{t("cart.quantity")}</th>
//               <th>{t("cart.price")}</th>
//               <th>{t("cart.remove")}</th>
//             </tr>
//           </thead>
//           <tbody>{renderCartItems}</tbody>
//           <tfoot>
//             <tr>
//               <td>{t("cart.total")}</td>
//               <td colSpan={3} className={styles.total}>
//                 ${total}
//               </td>
//             </tr>
//           </tfoot>
//         </Table>
//         <form>
//           <button className={styles.button} type="submit" onClick={submitOrder}>
//             {t("cart.checkout")}
//           </button>
//         </form>

//         <Modal show={show} onHide={handleClose} animation={false}>
//           <Modal.Header closeButton>
//             <Modal.Title>Error!</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>You must login first</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//     </Loading>
//   );
// };

// export default CartList;
