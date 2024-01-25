import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import HomeSwiper from "../Layout/Swiper/HomeSwiper";
import { Centerlist } from "../components/Layout";
import { ProductCard } from "../components/ecom-ui";
import { ProductType } from "../components/ecom-ui/Product/ProductCard";

const Home = () => {
  const [randomProducts, setrandomProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function getrandomProducts() {
      const { data } = await axios.get("http://localhost:3001/items?_limit=5");

      setrandomProducts(data);
    }

    getrandomProducts();
  }, []);
  return (
    <div className="gap-5 d-flex flex-column">
      <div className="">
        <HomeSwiper />
      </div>
      <Centerlist
        data={randomProducts}
        renderFun={(record) => (
          <ProductCard key={record.id} {...(record as ProductType)} />
        )}
      />
    </div>
  );
};

export default Home;
