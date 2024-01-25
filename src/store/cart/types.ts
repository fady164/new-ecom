import { ProductType } from "../../components/ecom-ui/Product/ProductCard";

export type CartState = {
  cartItemData: CartItemDataType;
  items: ProductType[];
  error: string | null;
  loading: boolean;
};

export type CartItemDataType = {
  [key: string]: number;
};
