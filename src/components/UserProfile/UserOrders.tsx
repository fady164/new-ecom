import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Chip,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { orderWithQuantity } from "../../store/cart/thunk/newOrder";
import { useAppSelector } from "../../store/hooks";

const UserOrders = () => {
  const { t } = useTranslation();

  const {
    userInfo: { id },
  } = useAppSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  async function getOrders() {
    const { data } = await axios.get(
      `http://localhost:3001/orders?userId=${id}`
    );
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  type Order = {
    id: number;
    userId: number;
    orders: orderWithQuantity[];
  };

  const renderOrders = () => {
    return orders.map((order: Order, index) => {
      let total = 0;

      return (
        <Accordion
          open={open === index + 1}
          icon={<Icon id={index + 1} open={open} />}
          className="px-5 py-3"
        >
          <AccordionHeader onClick={() => handleOpen(index + 1)}>
            {t("profile.order")}: {index + 1}
          </AccordionHeader>
          <AccordionBody>
            <List>
              {order.orders.map(({ product, quantity }) => {
                total += product.price * quantity;
                return (
                  <ListItem key={product.id}>
                    <span>{product.title}</span>
                    <ListItemSuffix>
                      <div className="flex gap-1">
                        <span>{quantity}</span>
                        <span>x</span>
                        <span>{product.price}</span>
                      </div>
                    </ListItemSuffix>
                  </ListItem>
                );
              })}
              <ListItem>
                <ListItemSuffix>
                  <Chip value={`${total} ${t("product_card.currency")}`} />
                </ListItemSuffix>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      );
    });
  };

  return <>{renderOrders()}</>;
};

export default UserOrders;

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
