import { CartItemDataType } from "../store/cart/types";

const getCartItemsIds = (cartItemsData: CartItemDataType) => {
  return Object.keys(cartItemsData)
    .map((key) => `id=${key}`)
    .join("&");
};

export default getCartItemsIds;
