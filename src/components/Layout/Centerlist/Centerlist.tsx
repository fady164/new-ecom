import { Loading } from "../";
import { CategoryCardType } from "../../ecom-ui/Category/CategoryCard";
import { ProductType } from "../../ecom-ui/Product/ProductCard";

type CenterlistProps = {
  loading?: boolean;
  error?: string | null;
  data: (CategoryCardType | ProductType)[];
  renderFun: (record: CategoryCardType | ProductType) => React.JSX.Element;
};

function Centerlist({ loading, error, data, renderFun }: CenterlistProps) {
  const renderData = data.map((record) => {
    return renderFun(record);
  });

  return (
    <Loading loading={loading!} error={error!}>
      <div className="flex flex-wrap justify-center gap-10 mt-3 lg:gap-5 md:gap-4">
        {renderData}
      </div>
    </Loading>
  );
}

export default Centerlist;
