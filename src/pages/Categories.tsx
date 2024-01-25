import { useEffect } from "react";
import { Centerlist } from "../components/Layout/";
import { CategoryCard } from "../components/ecom-ui/";
import { CategoryCardType } from "../components/ecom-ui/Category/CategoryCard";
import { getCategories } from "../store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Categories = () => {
  const { categories, error, loading } = useAppSelector(
    (state) => state.categories
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <Centerlist
        loading={loading}
        error={error}
        data={categories}
        renderFun={(record) => (
          <CategoryCard key={record.id} {...(record as CategoryCardType)} />
        )}
      />
    </>
  );
};

export default Categories;
