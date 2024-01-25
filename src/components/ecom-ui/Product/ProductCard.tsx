import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CategoryCardType } from "../Category/CategoryCard";

export type ProductType = Omit<CategoryCardType, "prefix"> & {
  price: number;
  cat_prefix: string;
  max_quantity: number;
};

const ProductCard = ({ title, img, id, max_quantity, price }: ProductType) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { cartItemData } = useAppSelector((state) => state.cart);

  const availableQuantity: number = max_quantity - (cartItemData[id] ?? 0);

  return (
    <Card className="w-72">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={img}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium">
            {title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {price} {t("product_card.currency")}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {t("product_card.available_quantity")}: {availableQuantity}{" "}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          disabled={cartItemData[id] === max_quantity}
          onClick={() => {
            dispatch(addToCart({ id: id.toString(), max: max_quantity }));
          }}
          fullWidth={true}
          className="shadow-none bg-blue-gray-900/10 text-blue-gray-900 hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          {t("product_card.add_to_cart")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
