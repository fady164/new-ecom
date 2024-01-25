import { useEffect } from "react";
import { useParams } from "react-router";
import { Centerlist } from "../components/Layout/";
import { ProductCard } from "../components/ecom-ui/";
import { ProductType } from "../components/ecom-ui/Product/ProductCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProducts } from "../store/products/prodcutsSlice";

const Products = () => {
  const { prefix } = useParams();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts(prefix));
  }, []);

  return (
    <Centerlist
      loading={loading}
      error={error}
      data={products}
      renderFun={(record) => (
        <ProductCard key={record.id} {...(record as ProductType)} />
      )}
    />
  );
};

export default Products;
