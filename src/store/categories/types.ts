import { CategoryCardType } from "../../components/ecom-ui/Category/CategoryCard";

export type CategoriesState = {
  categories: CategoryCardType[];
  loading: boolean;
  error: string | null;
};
