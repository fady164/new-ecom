import {
  removeFromCart,
  updateItemQuantity,
} from "../../../store/cart/cartSlice";
import { useAppDispatch } from "../../../store/hooks";
import { ProductType } from "../Product/ProductCard";

const CartCard = ({
  product,
  quantity,
}: {
  product: ProductType;
  quantity: number;
}) => {
  const dispatch = useAppDispatch();

  return (
    <tr key={product.id}>
      <td>{product.title}</td>
      <td>
        <select
          name="quantity"
          id="quantity"
          onChange={(e) => {
            dispatch(
              updateItemQuantity({
                id: product.id,
                quantity: Number(e.target.value),
              })
            );
          }}
          defaultValue={quantity}
        >
          {Array.from({ length: product.max_quantity }, (_, index) => (
            <option value={index + 1} key={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </td>
      <td>${product.price}</td>
      <td>
        <button
          aria-label="Remove Football Cleats from Shopping Cart"
          onClick={() => {
            dispatch(removeFromCart(product.id));
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default CartCard;
