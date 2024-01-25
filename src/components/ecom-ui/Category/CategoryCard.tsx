import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./category.module.css";

export type CategoryCardType = {
  id: number;
  title: string;
  prefix: string;
  img: string;
};

const CategoryCard = ({ title, img, prefix }: CategoryCardType) => {
  const { t } = useTranslation();

  const { category, categoryImg, categoryTitle, categoryLink } = styles;
  return (
    <Link to={`${prefix}/products`} className={categoryLink}>
      <div className={category}>
        <div className={categoryImg}>
          <img src={img} />
        </div>
        {/* <h4 className={categoryTitle}>{title}</h4> */}
        <h4 className={categoryTitle}>{t(`categories.${title}`)}</h4>
      </div>
    </Link>
  );
};

export default CategoryCard;
