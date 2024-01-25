import { ProductType } from "../../components/ecom-ui/Product/ProductCard";

type ProductsSliceState = {
  products: ProductType[];
  loading: boolean;
  error: string | null;
};

export default ProductsSliceState;
