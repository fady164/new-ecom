import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initrialState";
import { getMemoizedNumItems, getTotalPrice } from "./selectors";
import getCartItems from "./thunk/getCartItems";
import newOrder from "./thunk/newOrder";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, max } = action.payload;

      if (state.cartItemData[id]) {
        state.cartItemData[id] !== max ? state.cartItemData[id]++ : null;
      } else {
        state.cartItemData[id] = 1;
      }
    },

    removeFromCart(state, action) {
      delete state.cartItemData[action.payload];
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateItemQuantity(state, { payload: { id, quantity } }) {
      state.cartItemData[id] = quantity;
    },
  },
  extraReducers: {
    [getCartItems.pending.type]: (state) => {
      state.loading = true;
    },
    [getCartItems.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    [getCartItems.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [newOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [newOrder.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = null;
      state.cartItemData = {};
      state.items = [];
    },
    [newOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default cartSlice.reducer;
export { getCartItems, newOrder };

export const { addToCart, removeFromCart, updateItemQuantity } =
  cartSlice.actions;

export { getMemoizedNumItems, getTotalPrice };
