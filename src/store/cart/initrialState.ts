import { CartState } from "./types";

export const initialState: CartState = {
  cartItemData: {},
  items: [],
  error: null,
  loading: false,
};
